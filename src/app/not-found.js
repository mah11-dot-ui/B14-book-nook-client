import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">404 · Page not found</p>
            <h1 className="mt-3 text-4xl font-bold">This page is off the shelf</h1>
            <p className="mt-4 text-muted-foreground">The page you’re looking for doesn’t exist or may have moved.</p>
            <Link href="/" className="mt-7 rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white hover:bg-[#500071]">
                Back to Home
            </Link>
        </main>
    );
}
