import BooksCatalog from "@/components/books/BooksCatalog";

export const metadata = {
    title: "All Books",
};

export default function BooksPage() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                The collection
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">All Books</h1>
            <p className="mt-3 text-muted-foreground">
                Browse the collection and find your next read.
            </p>
            <div className="mt-8">
                <BooksCatalog />
            </div>
        </section>
    );
}
