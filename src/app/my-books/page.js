import PrivatePage from "@/components/auth/PrivatePage";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Books | BookNook",
};

export default function MyBooksPage() {
    return (
        <PrivatePage
            title="My Books"
            description="Your personal book collection."
            callbackUrl="/my-books"
        />
    );
}
