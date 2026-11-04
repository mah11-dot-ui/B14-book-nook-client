"use client";

import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,128}$/;

const ProfileSettings = ({ user }) => {
    const { refetch } = authClient.useSession();
    const [name, setName] = useState(user.name ?? "");
    const [image, setImage] = useState(user.image ?? "");
    const [imageLoadError, setImageLoadError] = useState(false);
    const [profileError, setProfileError] = useState("");
    const [profileNotice, setProfileNotice] = useState("");
    const [profileLoading, setProfileLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordNotice, setPasswordNotice] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    async function handleProfileSubmit(event) {
        event.preventDefault();
        setProfileError("");
        setProfileNotice("");

        if (!name.trim()) {
            setProfileError("Name is required.");
            return;
        }

        setProfileLoading(true);
        try {
            const result = await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || null,
            });

            if (result.error) {
                setProfileError(result.error.message || "Unable to update your profile.");
                return;
            }

            await refetch();
            setProfileNotice("Your profile has been updated.");
        } catch (error) {
            setProfileError(error.message || "Unable to update your profile.");
        } finally {
            setProfileLoading(false);
        }
    }

    async function handlePasswordSubmit(event) {
        event.preventDefault();
        setPasswordError("");
        setPasswordNotice("");

        if (!passwordPattern.test(newPassword)) {
            setPasswordError(
                "New password must be at least 6 characters and include an uppercase and a lowercase letter.",
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("The new passwords do not match.");
            return;
        }

        setPasswordLoading(true);
        try {
            const result = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            });

            if (result.error) {
                setPasswordError(result.error.message || "Unable to change your password.");
                return;
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordNotice("Your password has been changed.");
        } catch (error) {
            setPasswordError(error.message || "Unable to change your password.");
        } finally {
            setPasswordLoading(false);
        }
    }

    return (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Your BookNook
            </p>
            <h1 className="mt-2 text-3xl font-bold">My Profile</h1>

            <div className="mt-8 flex items-center gap-5 rounded-2xl border bg-card p-6">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#290044] text-2xl font-semibold text-white">
                    {image && !imageLoadError ? (
                        <Image
                            src={image}
                            alt={`${name || "Your"} profile photo`}
                            width={80}
                            height={80}
                            unoptimized
                            className="size-full object-cover"
                            onError={() => setImageLoadError(true)}
                        />
                    ) : (
                        name.charAt(0).toUpperCase() || "U"
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="truncate text-xl font-semibold">{name}</h2>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{user.email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Email changes will be available after email verification is set up.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleProfileSubmit}
                className="mt-8 space-y-5 rounded-2xl border bg-card p-6"
            >
                <h2 className="text-xl font-semibold">Profile details</h2>
                <div>
                    <label htmlFor="profile-name" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <input
                        id="profile-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="profile-image" className="mb-2 block text-sm font-medium">
                        Photo URL
                    </label>
                    <input
                        id="profile-image"
                        type="url"
                        autoComplete="url"
                        value={image}
                        onChange={(event) => {
                            setImage(event.target.value);
                            setImageLoadError(false);
                        }}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                        Use a publicly accessible direct image URL. A webpage or private
                        cloud-drive link won’t display as a photo.
                    </p>
                    {imageLoadError && (
                        <p role="status" className="mt-2 text-sm text-destructive">
                            This photo could not be loaded. Check the URL and make sure
                            the image is publicly accessible.
                        </p>
                    )}
                </div>
                {profileError && (
                    <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {profileError}
                    </p>
                )}
                {profileNotice && (
                    <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm">
                        {profileNotice}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={profileLoading}
                    className="rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#500071] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {profileLoading ? "Saving..." : "Save profile"}
                </button>
            </form>

            <form
                onSubmit={handlePasswordSubmit}
                className="mt-6 space-y-5 rounded-2xl border bg-card p-6"
            >
                <div>
                    <h2 className="text-xl font-semibold">Change password</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Use your current password to set a new one.
                    </p>
                </div>
                <div>
                    <label htmlFor="current-password" className="mb-2 block text-sm font-medium">
                        Current password
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="new-password" className="mb-2 block text-sm font-medium">
                        New password
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={6}
                        maxLength={128}
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">
                        Confirm new password
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={6}
                        maxLength={128}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    At least 6 characters, with an uppercase and a lowercase letter.
                </p>
                {passwordError && (
                    <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {passwordError}
                    </p>
                )}
                {passwordNotice && (
                    <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm">
                        {passwordNotice}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={passwordLoading}
                    className="rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#500071] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {passwordLoading ? "Changing password..." : "Change password"}
                </button>
            </form>
        </section>
    );
};

export default ProfileSettings;
