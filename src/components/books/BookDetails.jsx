"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bookApi } from "@/lib/book-api";
import { useToast } from "@/components/feedback/ToastProvider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const BookDetails = ({ bookId }) => {
    const toast = useToast();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [returnDate, setReturnDate] = useState(() => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        return dueDate.toISOString().slice(0, 10);
    });
    const [minimumReturnDate] = useState(() => {
        const minimumDate = new Date();
        minimumDate.setDate(minimumDate.getDate() + 1);
        return minimumDate.toISOString().slice(0, 10);
    });
    const [borrowing, setBorrowing] = useState(false);

    useEffect(() => {
        let active = true;
        bookApi(`/books/${encodeURIComponent(bookId)}`)
            .then((data) => {
                if (active) setBook(data);
            })
            .catch((loadError) => {
                if (active) {
                    setError(loadError.message);
                    toast(loadError.message, "error");
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [bookId, toast]);

    async function handleBorrow(event) {
        event.preventDefault();
        setBorrowing(true);
        try {
            await bookApi("/borrows", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookId, returnDate }),
            });
            toast("Book borrowed successfully.");
            setModalOpen(false);
        } catch (borrowError) {
            toast(borrowError.message, "error");
        } finally {
            setBorrowing(false);
        }
    }

    if (loading) return <LoadingSpinner label="Loading book details..." />;
    if (error) {
        return (
            <section className="mx-auto max-w-4xl px-6 py-16 text-center">
                <p role="alert" className="text-destructive">{error}</p>
                <Link href="/books" className="mt-5 inline-block text-[#7b4a32] underline">
                    Back to books
                </Link>
            </section>
        );
    }
    if (!book) return null;

    return (
        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_1.2fr] md:items-start">
                <div className="relative min-h-80 overflow-hidden rounded-2xl bg-muted sm:min-h-[28rem]">
                    <Image
                        src={book.image}
                        alt={`Cover of ${book.title}`}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                    />
                </div>
                <div className="py-2">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                        {book.category}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{book.title}</h1>
                    <p className="mt-3 text-lg text-muted-foreground">by {book.author}</p>
                    <p className="mt-7 whitespace-pre-wrap leading-7">{book.description}</p>
                    <div className="mt-8 rounded-xl border bg-card p-5 text-sm">
                        <p className="font-semibold">Added by {book.addedBy?.name || "BookNook"}</p>
                        <p className="mt-1 text-muted-foreground">{book.addedBy?.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="mt-7 w-full rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#500071] sm:w-auto"
                    >
                        Borrow This Book
                    </button>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="borrow-title"
                        className="w-full max-w-md rounded-2xl bg-card p-6 text-card-foreground shadow-xl"
                    >
                        <h2 id="borrow-title" className="text-xl font-bold">Borrow this book</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {book.title} will be added to your borrowed books.
                        </p>
                        <form onSubmit={handleBorrow} className="mt-6 space-y-5">
                            <div>
                                <label htmlFor="return-date" className="mb-2 block text-sm font-medium">
                                    Return date
                                </label>
                                <input
                                    id="return-date"
                                    type="date"
                                    min={minimumReturnDate}
                                    required
                                    value={returnDate}
                                    onChange={(event) => setReturnDate(event.target.value)}
                                    className="w-full rounded-lg border bg-background px-3 py-2.5"
                                />
                            </div>
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="rounded-lg border px-4 py-2.5 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={borrowing}
                                    className="rounded-lg bg-[#290044] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
                                >
                                    {borrowing ? "Borrowing..." : "Confirm borrow"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </section>
    );
};

export default BookDetails;
