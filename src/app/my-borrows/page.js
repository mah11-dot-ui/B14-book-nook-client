import MyBorrowsList from "@/components/books/MyBorrowsList";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Borrows",
};

export default function MyBorrowsPage() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">Your reading shelf</p>
            <h1 className="mt-2 text-3xl font-bold">My Borrows</h1>
            <p className="mt-3 text-muted-foreground">Track and return books you’ve borrowed.</p>
            <MyBorrowsList />
        </section>
    );
}
