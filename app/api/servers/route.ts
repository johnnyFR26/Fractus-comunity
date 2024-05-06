import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        let {name, imageUrl} = await req.json();

        //adicionando hardcoded para teste
        imageUrl = 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZk9TQjNyUlBqeERhdXR0WHdJZ0ZheW9YeFYiLCJyaWQiOiJ1c2VyXzJmUHJOS0Y2NXFmcEZaaGpIc3p4RDNoV0JhQSJ9'

        const profile = await currentProfile();

        const server = await db.server.create({
            // @ts-ignore
            data: {
                // @ts-ignore
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        // @ts-ignore
                        {name: "general", profileId: profile.id, }
                    ]
                },
                members: {
                    create: [
                        // @ts-ignore
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }

        })
        return NextResponse.json(server)
        
    } catch (error) {
        console.log("[SERVERS_POST]", error)
        return new Response("Error", { status: 500 })
    }

}