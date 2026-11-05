"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,128}$/;

const getSocialAuthError = (errorCode) => {
    if (errorCode === "invalid_code") {
        return "Google sign-up could not be completed. Check the Google OAuth redirect URI and try again.";
    }
    if (errorCode) {
        return "Google sign-up could not be completed. Please try again.";
    }
    return "";
};

const RegisterForm = ({ authError }) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(() => getSocialAuthError(authError));
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!passwordPattern.test(password)) {
            setError(
                "Password must be at least 6 characters and include an uppercase and a lowercase letter.",
            );
            return;
        }

        setLoading(true);
        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
                image: image.trim(),
            });

            if (result.error) {
                setError(result.error.message || "Unable to create your account.");
                return;
            }

            router.replace("/login?registered=1");
        } catch (registerError) {
            setError(registerError.message || "Unable to create your account.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleRegister() {
        setError("");
        setLoading(true);
        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}/`,
                errorCallbackURL: `${window.location.origin}/register`,
            });
            if (result.error) {
                setError(result.error.message || "Google sign-in is unavailable.");
            }
        } catch (registerError) {
            setError(registerError.message || "Google sign-in is unavailable.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full rounded-2xl border bg-card p-7 shadow-sm sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Join our reading nook
            </p>
            <h1 className="mt-2 text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Sign up to find your next favorite book.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                    <label htmlFor="register-name" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <input
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="register-email" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="register-image" className="mb-2 block text-sm font-medium">
                        Photo URL
                    </label>
                    <input
                        id="register-image"
                        type="url"
                        autoComplete="url"
                        required
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="register-password" className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="register-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={6}
                        maxLength={128}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        aria-describedby="password-requirements"
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p id="password-requirements" className="mt-2 text-xs text-muted-foreground">
                        At least 6 characters, with an uppercase and a lowercase letter.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#290044] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#500071] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                OR
                <span className="h-px flex-1 bg-border" />
            </div>
            <button
                type="button"
                disabled={loading}
                onClick={handleGoogleRegister}
                className="w-full rounded-lg border px-4 py-3 font-medium transition-colors hover:bg-muted disabled:opacity-60"
            >
                Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-[#7b4a32] hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
