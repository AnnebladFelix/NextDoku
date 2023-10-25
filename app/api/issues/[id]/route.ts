import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../../validationSchemas";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    try {
        const updatedIssue = await prisma.issue.update({
            where: { id: Number(id) },
            data: { title: body.title, description: body.description }
        });

        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating the issue.' }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    
    try {
        const issue = await prisma.issue.findFirst({ where: { id: Number(params?.id) } });
        return NextResponse.json(issue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching issue" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    
    try {
        const issue = await prisma.issue.delete({
            where: { id: Number(params?.id)}, 
        });
        return NextResponse.json({ issue, }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching issue" }, { status: 500 });
    }
}