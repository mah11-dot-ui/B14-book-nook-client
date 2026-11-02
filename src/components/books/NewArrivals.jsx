"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewArrivals = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/book.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load books (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("Book data must be an array");
                }

                setBooks(
                    [...data]
                        .sort((first, second) => second.bookId - first.bookId)
                        .slice(0, 6),
                );
            })
            .catch((fetchError) => {
                console.error("Unable to load new arrivals:", fetchError);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10" aria-labelledby="new-arrivals-heading">
            <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                    Recently added
                </p>
                <h2 id="new-arrivals-heading" className="mt-2 text-3xl font-bold">
                    New Arrivals
                </h2>
            </div>

            {loading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="h-80 animate-pulse rounded-xl bg-muted" />
                    ))}
                </div>
            )}

            {error && (
                <p role="alert" className="py-8 text-center">
                    New arrivals could not be loaded.
                </p>
            )}

            {!loading && !error && books.length === 0 && (
                <p className="py-8 text-center text-muted-foreground">
                    No books are available yet.
                </p>
            )}

            {!loading && !error && books.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {books.map((book) => (
                        <article
                            key={book.bookId}
                            className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="relative h-56 bg-muted">
                                <Image
                                    src={book.image}
                                    alt={`Cover of ${book.bookName}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <p className="text-sm font-medium text-[#7b4a32]">
                                    {book.category}
                                </p>
                                <h3 className="mt-2 line-clamp-1 text-lg font-semibold">
                                    {book.bookName}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    by {book.author}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="font-semibold">Price: {book.price}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {book.rating} / 5 ({book.totalReviews} reviews)
                                    </p>
                                </div>
                                <Link
                                    href={`/borrow/${book.bookId}`}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#290044] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#500071]"
                                >
                                    Borrow
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default NewArrivals;
