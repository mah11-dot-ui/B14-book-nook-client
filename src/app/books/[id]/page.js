import BookDetails from "@/components/books/BookDetails";
import { requireUser } from "@/lib/require-user";

export const metadata = {
    title: "Book Details",
    description: "View book details and borrow from the BookNook collection.",
};

export const dynamic = "force-dynamic";

export default async function BookDetailsPage({ params }) {
    const { id } = await params;
    await requireUser(`/books/${id}`);
    return <BookDetails bookId={id} />;
}
