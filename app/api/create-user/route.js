import { inngest } from "../../../inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user} = await req.json();

    if (!process.env.INNGEST_EVENT_KEY) {
        return NextResponse.json({
            result: "User creation completed without background tasks",
            warning: "INNGEST_EVENT_KEY is not configured",
        });
    }

    try {
        const result = await inngest.send({
            name: 'user.create',
            data: {
                user: user
            }
        });
        return NextResponse.json({result: result});
    } catch (inngestError) {
        console.error("Inngest event delivery failed:", inngestError.message);
        return NextResponse.json({result: "User creation completed without background tasks"});
    }
}
