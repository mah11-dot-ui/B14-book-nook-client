import { APIError, createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

let authInstance;

export function getAuth() {
    if (authInstance) {
        return authInstance;
    }

    const mongoUri = process.env.MONGODB_URI?.trim();
    const secret = process.env.BETTER_AUTH_SECRET;
    const baseURL = process.env.BETTER_AUTH_URL;

    if (!mongoUri) {
        throw new Error("MONGODB_URI must be configured before using authentication.");
    }

    if (!/^mongodb(?:\+srv)?:\/\//i.test(mongoUri)) {
        throw new Error(
            "MONGODB_URI must be a MongoDB connection string starting with mongodb:// or mongodb+srv://. Update it in .env.local and restart the Next.js server.",
        );
    }

    try {
        const parsedMongoUri = new URL(mongoUri);
        if (!parsedMongoUri.hostname) {
            throw new Error("Missing MongoDB hostname.");
        }
    } catch {
        throw new Error(
            "MONGODB_URI is malformed. Use a valid mongodb:// or mongodb+srv:// connection string, with special characters in credentials URL-encoded.",
        );
    }

    if (!secret || secret.length < 32) {
        throw new Error("Set BETTER_AUTH_SECRET to a random value of at least 32 characters.");
    }

    if (!baseURL) {
        throw new Error("BETTER_AUTH_URL must be set to this application's origin.");
    }

    const mongoClient = new MongoClient(mongoUri);
    const database = mongoClient.db();
    const googleConfigured =
        Boolean(process.env.GOOGLE_CLIENT_ID) &&
        Boolean(process.env.GOOGLE_CLIENT_SECRET);

    authInstance = betterAuth({
        appName: "BookNook",
        baseURL,
        secret,
        database: mongodbAdapter(database),
        emailAndPassword: {
            enabled: true,
            autoSignIn: false,
            password: {
                minLength: 6,
                maxLength: 128,
            },
        },
        socialProviders: googleConfigured
            ? {
                  google: {
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
              }
            : {},
        hooks: {
            before: createAuthMiddleware(async (context) => {
                if (context.path !== "/sign-up/email") {
                    return;
                }

                const password = context.body?.password;
                if (
                    typeof password !== "string" ||
                    password.length < 6 ||
                    !/[A-Z]/.test(password) ||
                    !/[a-z]/.test(password)
                ) {
                    throw new APIError("BAD_REQUEST", {
                        message:
                            "Password must be at least 6 characters and include an uppercase and a lowercase letter.",
                    });
                }
            }),
        },
    });

    return authInstance;
}
