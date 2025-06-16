import { prismaclient } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const syncUser = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const email = user.emailAddresses[0]?.emailAddress;
    const name = user.fullName || "Unnamed";

    if (!email) {
        return notFound();
    }

    await prismaclient.user.upsert({
        where: {
            email,
        },
        update: {
            name,
        },
        create: {
            id: userId,
            email,
            name,
        },
    });

    return redirect("/dashboard");
};

export default syncUser;
