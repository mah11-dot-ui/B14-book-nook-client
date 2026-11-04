"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { bookApi } from "@/lib/book-api";
import { useToast } from "@/components/feedback/ToastProvider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const MyBooksManager = () => {
    const toast = useToast();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const [deletingBook, setDeletingBook] = useState(null);
    const [saving, setSaving] = useState(false);

    const loadBooks = useCallback(async () => {
        setLoading(true);
        setLoadError("");
        try {
            const data = await bookApi("/books?mine=true");
            setBooks(data);
        } catch (error) {
            setLoadError(error.message);
            toast(error.message, "error");
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        let active = true;
        bookApi("/books?mine=true")
            .then((data) => {
                if (active) setBooks(data);
            })
            .catch((error) => {
                if (active) {
                    setLoadError(error.message);
                    toast(error.message, "error");
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [toast]);

    async function handleEdit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setSaving(true);
        try {
            await bookApi(`/books/${editingBook.id}`, {
                method: "PATCH",
                body: form,
            });
            toast("Book updated successfully.");
            setEditingBook(null);
            await loadBooks();
        } catch (error) {
            toast(error.message, "error");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!deletingBook) return;
        setSaving(true);
        try {
            await bookApi(`/books/${deletingBook.id}`, { method: "DELETE" });
            setBooks((current) => current.filter((book) => book.id !== deletingBook.id));
            toast("Book deleted successfully.");
            setDeletingBook(null);
        } catch (error) {
            toast(error.message, "error");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <LoadingSpinner label="Loading your books..." />;
    if (loadError) return <p role="alert" className="py-12 text-center text-destructive">{loadError}</p>;

    return (
        <>
            {books.length ? (
                <div className="mt-8 space-y-4">
                    {books.map((book) => (
                        <article key={book.id} className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
                            <div className="relative h-36 overflow-hidden rounded-lg bg-muted sm:h-24">
                                <Image src={book.image} alt={`Cover of ${book.title}`} fill unoptimized sizes="96px" className="object-cover" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[#7b4a32]">{book.category}</p>
                                <h2 className="mt-1 truncate text-lg font-semibold">{book.title}</h2>
                                <p className="text-sm text-muted-foreground">by {book.author}</p>
                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{book.description}</p>
                            </div>
                            <div className="flex gap-2 sm:flex-col">
                                <button type="button" onClick={() => setEditingBook(book)} className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted sm:flex-none">Edit</button>
                                <button type="button" onClick={() => setDeletingBook(book)} className="flex-1 rounded-lg border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 sm:flex-none">Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
                    <p className="text-muted-foreground">You haven’t added any books yet.</p>
                    <Link href="/add-book" className="mt-4 inline-block font-semibold text-[#7b4a32] hover:underline">Add your first book</Link>
                </div>
            )}

            {editingBook && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
                    <section role="dialog" aria-modal="true" aria-labelledby="edit-book-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card p-6 text-card-foreground shadow-xl">
                        <h2 id="edit-book-title" className="text-xl font-bold">Edit Book</h2>
                        <form onSubmit={handleEdit} className="mt-5 space-y-4">
                            <div>
                                <label htmlFor="edit-title" className="mb-2 block text-sm font-medium">Book Title</label>
                                <input id="edit-title" name="title" defaultValue={editingBook.title} required maxLength={160} className="w-full rounded-lg border bg-background px-3 py-2.5" />
                            </div>
                            <div>
                                <label htmlFor="edit-author" className="mb-2 block text-sm font-medium">Author Name</label>
                                <input id="edit-author" name="author" defaultValue={editingBook.author} required maxLength={120} className="w-full rounded-lg border bg-background px-3 py-2.5" />
                            </div>
                            <div>
                                <label htmlFor="edit-category" className="mb-2 block text-sm font-medium">Category</label>
                                <select id="edit-category" name="category" defaultValue={editingBook.category} required className="w-full rounded-lg border bg-background px-3 py-2.5">
                                    {categories.map((category) => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="edit-image" className="mb-2 block text-sm font-medium">Replace book image (optional)</label>
                                <input id="edit-image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="file-input w-full" />
                            </div>
                            <div>
                                <label htmlFor="edit-description" className="mb-2 block text-sm font-medium">Short Description</label>
                                <textarea id="edit-description" name="description" defaultValue={editingBook.description} required maxLength={2000} rows={4} className="w-full rounded-lg border bg-background px-3 py-2.5" />
                            </div>
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button type="button" onClick={() => setEditingBook(null)} className="rounded-lg border px-4 py-2.5">Cancel</button>
                                <button type="submit" disabled={saving} className="rounded-lg bg-[#290044] px-4 py-2.5 font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}

            {deletingBook && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
                    <section role="alertdialog" aria-modal="true" aria-labelledby="delete-book-title" className="w-full max-w-md rounded-2xl bg-card p-6 text-card-foreground shadow-xl">
                        <h2 id="delete-book-title" className="text-xl font-bold">Delete this book?</h2>
                        <p className="mt-2 text-sm text-muted-foreground">“{deletingBook.title}” will be permanently removed.</p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button" onClick={() => setDeletingBook(null)} className="rounded-lg border px-4 py-2.5">Cancel</button>
                            <button type="button" onClick={handleDelete} disabled={saving} className="rounded-lg bg-destructive px-4 py-2.5 font-semibold text-white disabled:opacity-60">{saving ? "Deleting..." : "Delete book"}</button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default MyBooksManager;
