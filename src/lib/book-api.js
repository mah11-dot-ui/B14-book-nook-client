export async function bookApi(path, options = {}) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(new URL(path.replace(/^\//, ""), `${apiBaseUrl}/`), {
        credentials: "include",
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
