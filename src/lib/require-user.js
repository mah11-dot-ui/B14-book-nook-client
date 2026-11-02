import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export async function requireUser(callbackUrl) {
    const session = await getAuth().api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }

    return session.user;
}
