"use client";

import Link from "next/link";
import { useState } from "react";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { authClient } from "@/lib/auth-client";

const getSocialAuthError = (errorCode) => {
    if (errorCode === "invalid_code") {
        return "Google sign-in could not be completed. Check the Google OAuth redirect URI and try again.";
    }
    if (errorCode) {
        return "Google sign-in could not be completed. Please try again.";
    }
    return "";
};

const LoginForm = ({ callbackUrl, registered, authError }) => {
    const redirectPath = getSafeRedirectPath(callbackUrl);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(() => getSocialAuthError(authError));
    const [notice, setNotice] = useState(
        registered ? "Account created. Log in to continue." : "",
    );
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setNotice("");
        setLoading(true);

        try {
            const result = await authClient.signIn.email({
                email,
                password,
                callbackURL: `${window.location.origin}${redirectPath}`,
            });

            if (result.error) {
                setError(result.error.message || "Unable to log in. Check your details.");
                return;
            }

            window.location.replace(redirectPath);
        } catch (loginError) {
            setError(loginError.message || "Unable to log in. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleLogin() {
        setError("");
        setLoading(true);

        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}${redirectPath}`,
                errorCallbackURL: `${window.location.origin}/login?callbackUrl=${encodeURIComponent(redirectPath)}`,
            });

            if (result.error) {
                setError(result.error.message || "Google sign-in is unavailable.");
            }
        } catch (loginError) {
            setError(loginError.message || "Google sign-in is unavailable.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full rounded-2xl border bg-card p-7 shadow-sm sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold">Log in to BookNook</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Sign in to continue to your books.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                    <label htmlFor="login-email" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="login-password" className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setNotice("Password reset is not enabled for this application.")
                        }
                        className="mt-2 text-sm text-[#7b4a32] hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>

                {notice && (
                    <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm">
                        {notice}
                    </p>
                )}
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
                    {loading ? "Logging in..." : "Log in"}
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
                onClick={handleGoogleLogin}
                className="w-full rounded-lg border px-4 py-3 font-medium transition-colors hover:bg-muted disabled:opacity-60"
            >
                Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                New to BookNook?{" "}
                <Link href="/register" className="font-semibold text-[#7b4a32] hover:underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
