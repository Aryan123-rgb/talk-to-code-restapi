import { answerQuery } from "@/lib/ai";
import { prismaclient } from "@/lib/db";
import { getFileDetails } from "@/lib/git";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getResponseSchema = z.object({
    question: z.string(),
    projectId: z.string(),
})

export async function POST(req: NextRequest) {
    try {
        const data = getResponseSchema.parse(await req.json());
        const question = data.question;
        const projectId = data.projectId;

        const project = await prismaclient.projects.findUnique({
            where: {
                id: projectId
            }
        });

        const githubUrl = project?.githubUrl;

        const res = await answerQuery(question, projectId);

        const relevant_embeddings = res.relevant_embeddings;
        const response = res?.answer;
        const fileFrequencyMap: Record<string, number> = {};

        for (const r of relevant_embeddings) {
            const path = r.metadata.metadata.source;
            fileFrequencyMap[path] = (fileFrequencyMap[path] || 0) + 1;
        }

        const relevant_entries = Object.entries(fileFrequencyMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        const relevant_filepaths = relevant_entries.map((r) => r[0]);

        const fileContents = await getFileDetails(relevant_filepaths, githubUrl!);

        const t = await prismaclient.response.create({
            data: {
                question: data.question,
                answer: response,
                projectId: data.projectId,
                fileContent: {
                    create: fileContents.map((fc) => ({
                        filePath: fc.filePath,
                        fileContent: fc.fileContent
                    }))
                }
            }
        })

        return NextResponse.json({
            answer: response,
            fileContent: fileContents,
            question: question
        });
    } catch (e) {
        console.log("Error occured while getting response", e);
        return NextResponse.json({
            message: "Error occured while getting response"
        }, {
            status: 500
        });
    }
}