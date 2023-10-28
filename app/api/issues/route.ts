import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Received Data:", body); // Log the received data for debugging
        const validation = createIssueSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 });

        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        });

        console.log("Inserted Issue:", newIssue); // Log the inserted data for debugging
        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const issues = await prisma.issue.findMany();
        return NextResponse.json(issues, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error fetching issues" }, { status: 500 });
    }
}

