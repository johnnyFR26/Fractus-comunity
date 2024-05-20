import InitialModal from "@/components/modals/initial-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const setUpPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`servers/${server.id}`);
    } else {
        return (
        <div className="h-full flex-col mb-6">
            <UserButton  />
            <ModeToggle />
            <InitialModal />
        </div>);
    }
    
}
export default setUpPage;
