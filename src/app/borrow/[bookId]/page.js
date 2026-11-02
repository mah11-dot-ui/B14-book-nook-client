import Link from "next/link";
import { notFound } from "next/navigation";
import books from "../../../../public/book.json";
import { requireUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export default async function BorrowPage({ params }) {
    const { bookId } = await params;
    const book = books.find((item) => item.bookId === Number(bookId));

    if (!book) {
        notFound();
    }

    const user = await requireUser(`/borrow/${book.bookId}`);

    return (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Borrowing
            </p>
            <h1 className="mt-2 text-3xl font-bold">{book.bookName}</h1>
            <p className="mt-3 text-muted-foreground">by {book.author}</p>
            <p className="mt-6 rounded-xl border bg-card p-5 leading-7">
                You’re signed in as {user.name}. You can now continue with this book.
            </p>
            <Link
                href="/"
                className="mt-6 inline-flex rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#500071]"
            >
                Return to BookNook
            </Link>
        </section>
    );
}
