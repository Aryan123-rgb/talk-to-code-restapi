import { prismaclient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getUserProjectSchema = z.object({
    userId: z.string()
})

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    if (!projectId) {
        return NextResponse.json({
            message: "Unexpected error occured"
        }, {
            status: 500
        })
    }
    try {
        const project = await prismaclient.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                responses: {
                    include: {
                        fileContent: true
                    }
                }
            },
        })
        return NextResponse.json(project);
    } catch (e) {
        console.log("Error occured while getting project details", e);
        return NextResponse.json({
            message: "Unexpected error occured"
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = getUserProjectSchema.parse(await req.json());
        const userId = data.userId;

        const projects = await prismaclient.projects.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(projects);

    } catch (e) {
        console.log("Error fetching projects for user", e);
        return NextResponse.json({
            message: "Error fetching projects for user"
        }, {
            status: 500
        })
    }
}