'use client';

import React, { useState } from 'react';
import { FileText, Code, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarkdownRenderer from './MarkDownRenderer';

interface FileContent {
    id: string;
    fileContent: string;
    filePath: string;
}

const RelevantFiles = ({ fileContents }: { fileContents: FileContent[] }) => {
    const [activeTab, setActiveTab] = useState(fileContents[0]?.filePath || '');

    if (fileContents.length === 0) {
        return (
            <div className="bg-[#252526] rounded-lg p-4 mt-6 text-[#e0e0e0] text-sm">
                No relevant files found.
            </div>
        );
    }

    return (
        <div className="bg-[#252526] rounded-lg p-4 mt-6 mb-10">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full h-full flex flex-col"
            >
                <TabsList className="flex w-full overflow-x-auto bg-[#2d2d2d] p-1 h-auto mb-4">
                    {fileContents.map((file) => (
                        <TabsTrigger
                            key={file.id}
                            value={file.id}
                            className={`flex items-center gap-2 py-2 px-3 text-sm whitespace-nowrap ${activeTab === file.filePath
                                ? 'bg-white text-black'
                                : 'text-[#a0a0a0] hover:text-white'
                                }`}
                        >
                            <Code className="w-4 h-4" />
                            <span className="truncate max-w-[150px]">
                                {file.filePath}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex-1 min-h-[200px] max-h-[500px] overflow-y-auto">
                    {fileContents.map((file) => (
                        <TabsContent
                            key={file.id}
                            value={file.id}
                            className="mt-0 h-full"
                        >
                            <div className="bg-[#1e1e1e] p-4 rounded-lg">
                                <div className="mb-2 text-sm text-gray-400 font-mono">
                                    {file.filePath}
                                    <MarkdownRenderer
                                        content={`\`\`\`${file?.filePath.split('.').pop()}\n${file.fileContent}\n\`\`\``}
                                    />
                                </div>
                                <div className="mt-4 h-8"></div> {/* Extra spacing at the bottom */}
                            </div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    );
};

export default RelevantFiles;