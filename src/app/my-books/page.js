import MyBooksManager from "@/components/books/MyBooksManager";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Books",
};

export default function MyBooksPage() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">Your collection</p>
                    <h1 className="mt-2 text-3xl font-bold">My Books</h1>
                    <p className="mt-3 text-muted-foreground">Manage the books you’ve added.</p>
                </div>
                <Link href="/add-book" className="inline-flex justify-center rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white hover:bg-[#500071]">Add Book</Link>
            </div>
            <MyBooksManager />
        </section>
    );
}
