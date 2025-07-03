import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { prismaclient } from './db';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!
const embedding_model = "text-embedding-004"

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: GOOGLE_API_KEY,
    model: embedding_model,
    taskType: TaskType.RETRIEVAL_DOCUMENT,
});

type FileWithContent = {
    path: string;
    content: string;
};

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const response_model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite"
})

export async function createDocumentFromFiles(files: FileWithContent[]) {
    const docs: Document[] = [];

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })

    for (const file of files) {
        const chunk = await splitter.createDocuments([file.content], [
            {
                metadata: {
                    source: file.path
                }
            }
        ])
        docs.push(...chunk)
    }

    return generateEmbeddingsFromDocument(docs);
}

async function generateEmbeddingsFromDocument(docs: Document[]) {
    const pageContentArray: string[] = docs.map(doc => doc.pageContent);

    const vectors = await embeddings.embedDocuments(pageContentArray)

    return docs.map((doc, i) => ({
        content: doc.pageContent,
        metadata: doc.metadata,
        vector: vectors[i],
    }))
}

export async function storeEmbeddingToDb(data: {
    content: string;
    metadata: any;
    vector: number[];
}[], projectId: string) {

    const values: string[] = [];
    const params: any[] = [];

    data.forEach((item, index) => {
        const vectorStr = `[${item.vector.join(",")}]`;
        const offset = index * 4;

        values.push(`($${offset + 1}, $${offset + 2}::jsonb, $${offset + 3}::vector, $${offset + 4})`);

        params.push(item.content);
        params.push(item.metadata);
        params.push(vectorStr);
        params.push(projectId);
    })

    const query = `
        INSERT INTO embeddings (content, metadata, embedding, "projectId")
        VALUES ${values.join(", ")}
    `

    await prismaclient.$executeRawUnsafe(query, ...params);

    console.log("Insertion complete");
}


export async function generateEmbeddingsFromText(query: string) {
    const vector = await embeddings.embedQuery(query);
    return vector;
}

export async function retrieveEmbeddings(embedding: number[], projectId: string) {
    // retrieve the embeddings so we can get start getting some response
    const vectorStr = `[${embedding.join(",")}]`;

    const results = await prismaclient.$queryRawUnsafe(`
      SELECT id, content, metadata, "projectId"
      FROM embeddings
      WHERE "projectId" = $1
      ORDER BY embedding <#> $2::vector
      LIMIT $3
    `, projectId, vectorStr, 10);

    return results;
}

export async function answerQuery(userQuery: string, projectId: string) {
    const text_embedding = await generateEmbeddingsFromText(userQuery);
    const relevant_embeddings = await retrieveEmbeddings(text_embedding, projectId) as any[];

    const context = relevant_embeddings.map(r => r.content).join("\n\n");

    const prompt = `
    You are a highly knowledgeable and helpful AI assistant. 
    Answer the user's question based on the provided context in a detailed and structured manner.
    
    If the answer involves any technical concepts or implementations, 
    include relevant code snippets or examples to support your explanation.
    
    If the context does not contain enough information to answer the question accurately, say so clearly without making assumptions.
    
    Context:
    ${context}
    
    User Question: ${userQuery}
    
    Answer:
    `;


    const result = await response_model.generateContent(prompt);
    const response = result.response;
    const answer = response.text();

    return { answer, relevant_embeddings };
}


