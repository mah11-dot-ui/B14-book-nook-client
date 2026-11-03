import PrivatePage from "@/components/auth/PrivatePage";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Add Book | BookNook",
};

export default function AddBookPage() {
    return (
        <PrivatePage
            title="Add Book"
            description="This page is available to signed-in users."
            callbackUrl="/add-book"
        />
    );
}
