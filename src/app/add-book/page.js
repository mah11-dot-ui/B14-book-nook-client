import AddBookForm from "@/components/books/AddBookForm";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Add Book",
};

export default function AddBookPage() {
    return (
        <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">Contribute to the collection</p>
            <h1 className="mt-2 text-3xl font-bold">Add a Book</h1>
            <p className="mt-3 text-muted-foreground">Share a book with the BookNook community.</p>
            <AddBookForm />
        </section>
    );
}
