import { db } from "./db";
import { auth } from "@clerk/nextjs/server";


export const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    try{
        
        const profile = await db.profile.findUnique({
            where: {
                userId
        }
       })
        return profile
        throw new Error('error')
    }catch(error) {
        console.log(error)
        return null
    }

   
    
}