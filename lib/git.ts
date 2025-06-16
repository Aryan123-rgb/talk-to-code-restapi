import axios from 'axios'
import pLimit from 'p-limit';

const AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN!

type FileEntry = {
    path: string;
    url: string;
};

type FileWithContent = {
    path: string;
    content: string;
};

const NOT_ALLOWED_EXTENSIONS = ['.ico', '.sql', 'package-lock.json', '.svg', '.toml'];

function isExtensionDisallowed(path: string): boolean {
    return NOT_ALLOWED_EXTENSIONS.some(ext => path.endsWith(ext));
}

export async function fetchRepoFileContents(treeApiUrl: string) {
    const fileList: FileEntry[] = [];
    const fileContents: FileWithContent[] = [];

    console.log("treeApiUrl", treeApiUrl);

    const treeResponse = await axios.get(treeApiUrl, {
        headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
    });

    const treeItems = treeResponse.data.tree;

    for (const item of treeItems) {
        if (item.type === 'blob' && !isExtensionDisallowed(item.path)) {
            fileList.push({
                path: item.path,
                url: item.url
            });
        }
    }

    // Rate limiting -> Making only 5 calls concurrently
    const limit = pLimit(5);
    await Promise.all(fileList.map(file =>
        limit(async () => {
            const blobResponse = await axios.get(file.url, {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                }
            });

            fileContents.push({
                path: file.path,
                content: Buffer.from(blobResponse.data.content, 'base64').toString('utf-8')
            });
        })
    ));

    return fileContents;
}


export async function getFileDetails(filePaths: string[], rootUrl: string) {
    const [_, owner, repo] = new URL(rootUrl).pathname.split('/');

    const fileContents: {
        fileContent: string; filePath
        : string
    }[] = [];

    const repoName = repo.split('.')[0];

    await Promise.all(
        filePaths.map(async (filePath) => {
            const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                }
            });

            fileContents.push({
                fileContent: Buffer.from(response.data.content, 'base64').toString('utf-8'),
                filePath: filePath
            });
        })
    );

    return fileContents;
}
