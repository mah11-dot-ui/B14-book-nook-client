import { redirect } from "next/navigation";

export default function AllBooksRedirect() {
    redirect("/books");
}
