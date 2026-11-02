import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: "Create an account | BookNook",
};

export default function RegisterPage() {
    return (
        <section className="mx-auto flex min-h-[65vh] max-w-lg items-center px-6 py-12">
            <RegisterForm />
        </section>
    );
}
