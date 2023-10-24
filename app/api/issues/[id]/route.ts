import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });

    try {
        
        const issue = await prisma.issue.findFirst({ where: { id: Number(params?.id) } });
        return NextResponse.json(issue, { status: 200 });
    } catch (error) {
        console.log(id);
        return NextResponse.json({ error: "Error fetching issue" }, { status: 500 });
    }
}