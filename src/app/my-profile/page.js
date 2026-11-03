import Image from "next/image";
import { requireUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Profile | BookNook",
};

export default async function MyProfilePage() {
    const user = await requireUser("/my-profile");

    return (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Your BookNook
            </p>
            <h1 className="mt-2 text-3xl font-bold">My Profile</h1>
            <div className="mt-8 flex items-center gap-5 rounded-2xl border bg-card p-6">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#290044] text-2xl font-semibold text-white">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={`${user.name}'s profile photo`}
                            width={80}
                            height={80}
                            unoptimized
                            className="size-full object-cover"
                        />
                    ) : (
                        user.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="truncate text-xl font-semibold">{user.name}</h2>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </div>
        </section>
    );
}
