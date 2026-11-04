"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { bookApi } from "@/lib/book-api";
import { useToast } from "@/components/feedback/ToastProvider";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const AddBookForm = () => {
    const router = useRouter();
    const toast = useToast();
    const { data: session } = authClient.useSession();
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        setSubmitting(true);

        try {
            await bookApi("/books", { method: "POST", body: form });
            toast("Book added successfully.");
            router.push("/my-books");
        } catch (error) {
            toast(error.message, "error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border bg-card p-6 sm:p-8">
            <div>
                <label htmlFor="book-title" className="mb-2 block text-sm font-medium">Book Title</label>
                <input id="book-title" name="title" required maxLength={160} className="w-full rounded-lg border bg-background px-3 py-2.5" />
            </div>
            <div>
                <label htmlFor="book-author" className="mb-2 block text-sm font-medium">Author Name</label>
                <input id="book-author" name="author" required maxLength={120} className="w-full rounded-lg border bg-background px-3 py-2.5" />
            </div>
            <div>
                <label htmlFor="book-category" className="mb-2 block text-sm font-medium">Category</label>
                <select id="book-category" name="category" required defaultValue="" className="w-full rounded-lg border bg-background px-3 py-2.5">
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="book-image" className="mb-2 block text-sm font-medium">Book Image</label>
                <input id="book-image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required className="file-input w-full" />
                <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WEBP, or GIF; maximum 5 MB. Images are uploaded to ImgBB.</p>
            </div>
            <div>
                <label htmlFor="book-description" className="mb-2 block text-sm font-medium">Short Description</label>
                <textarea id="book-description" name="description" required maxLength={2000} rows={5} className="w-full rounded-lg border bg-background px-3 py-2.5" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="added-by-name" className="mb-2 block text-sm font-medium">User Name</label>
                    <input id="added-by-name" value={session?.user?.name ?? ""} readOnly className="w-full rounded-lg border bg-muted px-3 py-2.5" />
                </div>
                <div>
                    <label htmlFor="added-by-email" className="mb-2 block text-sm font-medium">User Email</label>
                    <input id="added-by-email" type="email" value={session?.user?.email ?? ""} readOnly className="w-full rounded-lg border bg-muted px-3 py-2.5" />
                </div>
            </div>
            <button type="submit" disabled={submitting || !session?.user} className="w-full rounded-lg bg-[#290044] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#500071] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {submitting ? "Adding book..." : "Add Book"}
            </button>
        </form>
    );
};

export default AddBookForm;
