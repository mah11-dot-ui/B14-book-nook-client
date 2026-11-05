import { NextResponse } from "next/server";

const jsonError = (message, status) =>
    NextResponse.json({ message }, { status });

function isSupportedRoute(method, path) {
    if (path.length === 1 && path[0] === "books") {
        return ["GET", "POST"].includes(method);
    }
    if (path.length === 2 && path[0] === "books" && /^[a-f\d]{24}$/i.test(path[1])) {
        return ["GET", "PATCH", "DELETE"].includes(method);
    }
    if (path.length === 1 && path[0] === "borrows") {
        return ["GET", "POST"].includes(method);
    }
    return (
        path.length === 2 &&
        path[0] === "borrows" &&
        /^[a-f\d]{24}$/i.test(path[1]) &&
        method === "DELETE"
    );
}

async function proxyBookApi(request, context) {
    const apiBaseUrl = process.env.BOOK_API_URL?.trim()
        || "https://book-nook-server-pied.vercel.app";

    const { path } = await context.params;
    const method = request.method.toUpperCase();
    if (!isSupportedRoute(method, path)) {
        return jsonError("API route not found.", 404);
    }

    let targetUrl;
    try {
        targetUrl = new URL(
            `${path.map((segment) => encodeURIComponent(segment)).join("/")}${new URL(request.url).search}`,
            `${apiBaseUrl.replace(/\/+$/, "")}/`,
        );
        if (!["http:", "https:"].includes(targetUrl.protocol)) {
            return jsonError("BOOK_API_URL must use HTTP or HTTPS.", 500);
        }
    } catch {
        return jsonError("BOOK_API_URL is not a valid URL.", 500);
    }

    const headers = new Headers({ Accept: "application/json" });
    const cookie = request.headers.get("cookie");
    const contentType = request.headers.get("content-type");
    if (cookie) headers.set("cookie", cookie);
    if (contentType) headers.set("content-type", contentType);
    if (process.env.BETTER_AUTH_URL) {
        headers.set("origin", new URL(process.env.BETTER_AUTH_URL).origin);
    }

    try {
        const upstream = await fetch(targetUrl, {
            method,
            headers,
            body: ["GET", "HEAD"].includes(method) ? undefined : await request.arrayBuffer(),
            cache: "no-store",
            signal: AbortSignal.timeout(25_000),
        });
        const responseHeaders = new Headers();
        const upstreamContentType = upstream.headers.get("content-type");
        if (upstreamContentType) responseHeaders.set("content-type", upstreamContentType);
        responseHeaders.set("cache-control", "no-store");

        return new Response(
            upstream.status === 204 ? null : upstream.body,
            { status: upstream.status, headers: responseHeaders },
        );
    } catch (error) {
        if (error.name === "TimeoutError" || error.name === "AbortError") {
            return jsonError("The book API did not respond in time.", 504);
        }
        return jsonError("The book API could not be reached.", 502);
    }
}

export const GET = proxyBookApi;
export const POST = proxyBookApi;
export const PATCH = proxyBookApi;
export const DELETE = proxyBookApi;
