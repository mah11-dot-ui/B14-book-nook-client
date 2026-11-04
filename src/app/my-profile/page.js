import ProfileSettings from "@/components/auth/ProfileSettings";
import { requireUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Profile | BookNook",
};

export default async function MyProfilePage() {
    const user = await requireUser("/my-profile");

    return <ProfileSettings user={user} />;
}
