export function getSafeRedirectPath(path, fallback = "/") {
    if (
        typeof path !== "string" ||
        !path.startsWith("/") ||
        path.startsWith("//") ||
        path.includes("\\")
    ) {
        return fallback;
    }

    try {
        const url = new URL(path, "http://localhost");
        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return fallback;
    }
}
