import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Search } from "lucide-react";

const categories = [
    { name: "Classic Fiction", description: "Timeless stories worth revisiting" },
    { name: "Self Development", description: "Ideas for learning and growth" },
    { name: "Finance", description: "Fresh perspectives on money" },
    { name: "Adventure Fiction", description: "Stories that take you somewhere new" },
    { name: "Business", description: "Big ideas for work and leadership" },
    { name: "Fantasy", description: "A little magic for your reading list" },
];

const readingSteps = [
    {
        number: "01",
        title: "Browse the collection",
        description: "Explore new arrivals and discover books across a range of categories.",
        Icon: Compass,
    },
    {
        number: "02",
        title: "Find the right fit",
        description: "Check each book’s author, description, reader rating, and other details.",
        Icon: Search,
    },
    {
        number: "03",
        title: "Settle into a good read",
        description: "Choose a title that matches your curiosity and enjoy your next chapter.",
        Icon: BookOpen,
    },
];

const HomeHighlights = () => (
    <>
        <section
            className="bg-[#faf7f1] py-14 transition-colors sm:py-16 dark:bg-[#1c1714]"
            aria-labelledby="categories-heading"
        >
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32] dark:text-[#d7a47d]">
                    Find your kind of story
                </p>
                <h2 id="categories-heading" className="mt-2 text-3xl font-bold">
                    Explore by Category
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                    From timeless fiction to fresh ideas, there’s something for every
                    kind of reader.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <li
                            key={category.name}
                            className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {category.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        <section
            className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-16"
            aria-labelledby="reading-guide-heading"
        >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32] dark:text-[#d7a47d]">
                Your next chapter starts here
            </p>
            <h2 id="reading-guide-heading" className="mt-2 text-3xl font-bold">
                A Simple Way to Find Your Next Read
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {readingSteps.map(({ number, title, description, Icon }) => (
                    <article key={number} className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#7b4a32] dark:text-[#d7a47d]">
                                {number}
                            </span>
                            <Icon aria-hidden="true" className="size-5 text-[#7b4a32] dark:text-[#d7a47d]" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </article>
                ))}
            </div>
            <Link
                href="/books"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-[#7b4a32] hover:underline dark:text-[#d7a47d]"
            >
                Browse all books
                <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
        </section>
    </>
);

export default HomeHighlights;
