"use client";

import { useEffect, useState } from "react";
import { bookApi } from "@/lib/book-api";
import BookCard from "@/components/books/BookCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/feedback/ToastProvider";

const BooksCatalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const toast = useToast();

    useEffect(() => {
        let active = true;
        bookApi("/books")
            .then((data) => {
                if (active) setBooks(data);
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
    }, [toast]);

    if (loading) return <LoadingSpinner label="Loading books..." />;
    if (error) return <p role="alert" className="py-16 text-center text-destructive">{error}</p>;

    return books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
            ))}
        </div>
    ) : (
        <p className="py-16 text-center text-muted-foreground">
            No books have been added yet.
        </p>
    );
};

export default BooksCatalog;
