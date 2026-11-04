"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { bookApi } from "@/lib/book-api";
import { useToast } from "@/components/feedback/ToastProvider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

const MyBorrowsList = () => {
    const toast = useToast();
    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [returningId, setReturningId] = useState("");

    const loadBorrows = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            setBorrows(await bookApi("/borrows"));
        } catch (loadError) {
            setError(loadError.message);
            toast(loadError.message, "error");
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        let active = true;
        bookApi("/borrows")
            .then((data) => {
                if (active) setBorrows(data);
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

    async function returnBook(borrow) {
        setReturningId(borrow.id);
        try {
            await bookApi(`/borrows/${borrow.id}`, { method: "DELETE" });
            setBorrows((current) => current.filter((entry) => entry.id !== borrow.id));
            toast("Book returned successfully.");
        } catch (returnError) {
            toast(returnError.message, "error");
        } finally {
            setReturningId("");
        }
    }

    if (loading) return <LoadingSpinner label="Loading your borrowed books..." />;
    if (error) return <p role="alert" className="py-12 text-center text-destructive">{error}</p>;
    if (!borrows.length) {
        return <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-muted-foreground">You don’t have any borrowed books yet.</p>;
    }

    return (
        <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-muted/70">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Book</th>
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Borrow Date</th>
                        <th className="px-4 py-3 font-semibold">Return Date</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {borrows.map((borrow) => (
                        <tr key={borrow.id} className="border-t">
                            <td className="px-4 py-3">
                                <div className="relative size-14 overflow-hidden rounded-md bg-muted">
                                    <Image src={borrow.bookImage} alt={`Cover of ${borrow.bookTitle}`} fill unoptimized sizes="56px" className="object-cover" />
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium">{borrow.bookTitle}</td>
                            <td className="px-4 py-3">{formatDate(borrow.borrowedAt)}</td>
                            <td className="px-4 py-3">{formatDate(borrow.returnDate)}</td>
                            <td className="px-4 py-3">
                                <button
                                    type="button"
                                    disabled={returningId === borrow.id}
                                    onClick={() => returnBook(borrow)}
                                    className="rounded-lg border border-[#7b4a32]/30 px-3 py-2 font-medium text-[#7b4a32] hover:bg-[#7b4a32]/10 disabled:opacity-60"
                                >
                                    {returningId === borrow.id ? "Returning..." : "Return Book"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBorrowsList;
