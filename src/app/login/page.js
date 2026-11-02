import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: "Log in | BookNook",
};

export default async function LoginPage({ searchParams }) {
    const params = await searchParams;

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-lg items-center px-6 py-12">
            <LoginForm
                callbackUrl={params?.callbackUrl}
                registered={params?.registered === "1"}
            />
        </section>
    );
}
