'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

export default function AddProjectForm() {
    const [projectName, setProjectName] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!projectName.trim() || !githubUrl.trim()) {
            showToast("Fill project name and github url", 'info');
            return;
        }
        setLoading(true);
        try {
            if (!isPrivate) {
                const res = await axios.post(`/api/add-project`, {
                    projectName: projectName,
                    url: githubUrl
                })
                const projectId = res.data.project.id;
                router.push(`/project/${projectId}`);
            }
        } catch (error) {
            console.log("Error occured while creating a project", error);
        }
        setLoading(false);
    }

    return (
        <div className="container mx-auto py-8">
            <Card className="bg-[#252526] border-[#3c3c3c] max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-[#e0e0e0] text-2xl">Add New Project</CardTitle>
                    <CardDescription className="text-[#b5b5b5]">
                        Add a new project to start analyzing your codebase
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="projectName" className="text-[#e0e0e0]">
                                    Project Name
                                </Label>
                                <Input
                                    name="projectName"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="Enter project name"
                                    className="bg-[#1e1e1e] border-[#3c3c3c] text-[#e0e0e0] placeholder-[#858585] focus-visible:ring-[#0e639c] focus:border-[#0e639c]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="githubUrl" className="text-[#e0e0e0]">
                                    GitHub Repository URL
                                </Label>
                                <Input
                                    name="githubUrl"
                                    id="githubUrl"
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    className="bg-[#1e1e1e] border-[#3c3c3c] text-[#e0e0e0] placeholder-[#858585] focus-visible:ring-[#0e639c] focus:border-[#0e639c]"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox
                                    name="isPrivate"
                                    id="isPrivate"
                                    checked={isPrivate}
                                    onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
                                    className="border-[#3c3c3c] data-[state=checked]:bg-[#0e639c]"
                                />
                                <label
                                    htmlFor="isPrivate"
                                    className="text-sm font-medium leading-none text-[#e0e0e0] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    This is a private repository
                                </label>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label htmlFor="accessToken" className="text-[#e0e0e0]">
                                    GitHub Access Token (for private repos only)
                                </Label>
                                <Input
                                    name="accessToken"
                                    id="accessToken"
                                    type="password"
                                    value={accessToken}
                                    onChange={(e) => setAccessToken(e.target.value)}
                                    placeholder="Enter your GitHub access token"
                                    className="bg-[#1e1e1e] border-[#3c3c3c] text-[#e0e0e0] placeholder-[#858585] focus-visible:ring-[#0e639c] focus:border-[#0e639c]"
                                />
                                <p className="text-xs text-[#858585] mt-1">
                                    Your token is only used to clone the repository and won't be stored.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-[#3c3c3c] text-[#9cdcfe] bg-[#1e1e1e] hover:bg-[#2a2d2e] hover:text-[#ffffff] transition-colors cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="bg-[#0e639c] hover:bg-[#1177bb] text-white transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:ring-2 focus:ring-[#0e639c] focus:ring-opacity-50 cursor-pointer flex items-center justify-center gap-2 px-6 py-2 rounded-md shadow-sm"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Adding Project...</span>
                                    </>
                                ) : (
                                    <span>Add Project</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}