"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import "./Navbar.css";

const privateLinks = [
    { href: "/add-book", label: "Add Book" },
    { href: "/my-books", label: "My Books" },
    { href: "/my-borrows", label: "My Borrows" },
];

const Navbar = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [failedPhotoUrl, setFailedPhotoUrl] = useState("");

    async function handleSignOut() {
        const { error } = await authClient.signOut();
        if (error) {
            console.error("Unable to log out:", error);
            return;
        }
        router.refresh();
    }

    const NavItems = (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/books">All Books</Link></li>
            {user &&
                privateLinks.map(({ href, label }) => (
                    <li key={href}><Link href={href}>{label}</Link></li>
                ))}
        </>
    );

    return (
        <div className="relative z-10 bg-base-100 shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
            <div className="navbar mx-auto max-w-6xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {NavItems}
                        </ul>
                    </div>
                    <Link
                        href="/"
                        className="bg-linear-to-r from-[#290044]/70 to-[rgb(80,0,113)]/60 bg-clip-text text-2xl font-bold text-transparent"
                    >
                        BookNook
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{NavItems}</ul>
                </div>

                <div className="navbar-end gap-2">
                    <ThemeToggle />
                    {user ? (
                        <details className="dropdown dropdown-end">
                            <summary
                                className="btn btn-ghost btn-circle avatar list-none"
                                aria-label="Open account menu"
                            >
                                <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#290044] font-semibold text-white">
                                    {user.image && user.image !== failedPhotoUrl ? (
                                        <Image
                                            src={user.image}
                                            alt=""
                                            width={40}
                                            height={40}
                                            unoptimized
                                            className="size-full object-cover"
                                            onError={() => setFailedPhotoUrl(user.image)}
                                        />
                                    ) : (
                                        user.name?.charAt(0)?.toUpperCase() || "U"
                                    )}
                                </span>
                            </summary>
                            <ul className="menu dropdown-content z-50 mt-3 w-56 rounded-box border bg-base-100 p-2 text-base-content shadow-lg">
                                <li className="menu-title px-4 py-2">
                                    <span className="truncate">{user.name}</span>
                                </li>
                                <li>
                                    <Link href="/my-profile">My Profile</Link>
                                </li>
                                <li>
                                    <button type="button" onClick={handleSignOut}>
                                        <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path d="M10 17l5-5-5-5M15 12H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </details>
                    ) : (
                        <>
                            <Link href="/login" className="button" aria-label="Log in">
                                <svg className="svgIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path d="M10 17l5-5-5-5M15 12H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                                Log in
                            </Link>
                            <Link href="/register" className="button" aria-label="Register">
                                <svg className="svgIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10-3v6m-3-3h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
