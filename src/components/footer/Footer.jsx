import Link from "next/link";
import { Mail } from "lucide-react";

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/", label: "IG" },
    { name: "Facebook", href: "https://www.facebook.com/", label: "f" },
];

const Footer = () => (
    <footer className="mt-auto bg-[#24152e] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-3">
            <div>
                <Link
                    href="/"
                    className="inline-block bg-linear-to-r from-[#f3d9a3] to-[#e9b86e] bg-clip-text text-2xl font-bold text-transparent"
                >
                    BookNook
                </Link>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                    A cozy corner for curious readers to discover their next favorite
                    book.
                </p>
            </div>

            <div>
                <h2 className="font-semibold">Get in touch</h2>
                <a
                    href="mailto:hello@booknook.com"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                    <Mail aria-hidden="true" className="size-4" />
                    hello@booknook.com
                </a>
            </div>

            <div>
                <h2 className="font-semibold">Follow along</h2>
                <ul className="mt-4 flex gap-3">
                    {socialLinks.map(({ name, href, label }) => (
                        <li key={name}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={name}
                                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                            >
                                <span aria-hidden="true" className="font-semibold">
                                    {label}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="border-t border-white/15">
            <p className="mx-auto max-w-6xl px-6 py-5 text-center text-sm text-white/60 sm:px-10">
                © {new Date().getFullYear()} BookNook. All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
