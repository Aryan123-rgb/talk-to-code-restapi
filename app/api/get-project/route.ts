import { prismaclient } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET PROJECT DETAILS
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

// FETCH ALL USER PROEJCTS
export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated request");
    }
    try {
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