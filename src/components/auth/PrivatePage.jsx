import { requireUser } from "@/lib/require-user";

const PrivatePage = async ({ title, description, callbackUrl }) => {
    const user = await requireUser(callbackUrl);

    return (
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7b4a32]">
                Your BookNook
            </p>
            <h1 className="mt-2 text-3xl font-bold">{title}</h1>
            <p className="mt-3 text-muted-foreground">{description}</p>
            <p className="mt-6 rounded-xl border bg-card p-5 text-sm">
                Signed in as {user.name} ({user.email})
            </p>
        </section>
    );
};

export default PrivatePage;
