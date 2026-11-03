import PrivatePage from "@/components/auth/PrivatePage";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Borrows | BookNook",
};

export default function MyBorrowsPage() {
    return (
        <PrivatePage
            title="My Borrows"
            description="Your borrowed books will be listed here."
            callbackUrl="/my-borrows"
        />
    );
}
