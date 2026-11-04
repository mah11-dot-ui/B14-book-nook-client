import { NextResponse, type NextRequest } from "next/server";

const sessionCookieNames = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth-session_token",
    "__Secure-better-auth-session_token",
];

export function proxy(request: NextRequest) {
    const hasSessionCookie = sessionCookieNames.some((name) =>
        request.cookies.has(name),
    );

    if (hasSessionCookie) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
        "callbackUrl",
        `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/add-book/:path*",
        "/my-books/:path*",
        "/my-borrows/:path*",
        "/my-profile/:path*",
        "/books/:id",
    ],
};
