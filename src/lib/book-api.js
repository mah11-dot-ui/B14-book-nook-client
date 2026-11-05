export async function bookApi(path, options = {}) {
    const apiPath = path.startsWith("/") ? path : `/${path}`;
    const response = await fetch(`/api/book-api${apiPath}`, {
        credentials: "same-origin",
        ...options,
    });

    if (response.status === 204) {
        return null;
    }

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
        throw new Error(result.error || result.message || "The request could not be completed.");
    }

    return result;
}
