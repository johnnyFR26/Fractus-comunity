import { db } from "./db";
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs/server";


export const currentProfile = async () => {
    const { userId} = auth();
    if (!userId) {
        return null;
    }
    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })
    if (!profile) {
        return null;
    }
    return profile
}