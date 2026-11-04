"use client";

import { useEffect } from "react";

const ThemeToggle = () => {
    useEffect(() => {
        const savedTheme = localStorage.getItem("booknook-theme");
        applyTheme(savedTheme === "dark" ? "dark" : "light");
    }, []);

    function toggleTheme() {
        const nextTheme =
            document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("booknook-theme", nextTheme);
        applyTheme(nextTheme);
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle light and dark theme"
            title="Toggle light and dark theme"
        >
            <svg viewBox="0 0 24 24" className="size-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
            </svg>
            <svg viewBox="0 0 24 24" className="hidden size-5 dark:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
        </button>
    );
};

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
}

export default ThemeToggle;
