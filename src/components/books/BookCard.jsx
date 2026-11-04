"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BookCard = ({ book, index = 0 }) => (
    <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
        className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
        <div className="relative h-56 bg-muted">
            <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
            />
        </div>
        <div className="p-5">
            <p className="text-sm font-medium text-[#7b4a32]">{book.category}</p>
            <h2 className="mt-2 line-clamp-1 text-lg font-semibold">{book.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
            <Link
                href={`/books/${book.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#290044] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#500071]"
            >
                View Details
            </Link>
        </div>
    </motion.article>
);

export default BookCard;
