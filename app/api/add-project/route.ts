import { createDocumentFromFiles, storeEmbeddingToDb } from "@/lib/ai";
import { prismaclient } from "@/lib/db";
import { fetchRepoFileContents, getRepoDetails } from "@/lib/git";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

const createProjectSchema = z.object({
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const data = createProjectSchema.parse(await req.json());
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 401
            })
        };

        const projectId = uuidv4();

        const fullUrl = data.url;
        const [_, owner, repo] = new URL(fullUrl).pathname.split('/');

        const repoName = repo.split('.')[0];

        const giturl = `https://api.github.com/repos/${owner}/${repoName}/git/trees/main?recursive=1`;

        const repoContents = await fetchRepoFileContents(giturl);
        const embeddings = await createDocumentFromFiles(repoContents);
        await storeEmbeddingToDb(embeddings, projectId);
        const repoDetails = await getRepoDetails(fullUrl);

        const project = await prismaclient.projects.create({
            data: {
                id: projectId,
                userId: userId,
                projectName: repoDetails.repoName,
                githubUrl: data.url,
                language: repoDetails.language,
                stars: repoDetails.stars
            }
        })

        return NextResponse.json({ project });
    } catch (e) {
        console.log("Error occured while creating project", e);
        return NextResponse.json("Error occured while creating project")
    }
}