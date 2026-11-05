import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: "Create an account | BookNook",
};

export default async function RegisterPage({ searchParams }) {
    const params = await searchParams;

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-lg items-center px-6 py-12">
            <RegisterForm authError={params?.error} />
        </section>
    );
}
