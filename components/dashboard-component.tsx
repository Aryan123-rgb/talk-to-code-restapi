'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Clock, Star, Loader2, FolderOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { showToast } from "@/lib/toast";

interface Projects {
    id: string;
    projectName: string;
    githubUrl: string;
    language: string;
    stars: number;
}
const colors = {
    TypeScript: "bg-[#4ec9b0]",
    JavaScript: "bg-[#f7dc6f]",
    Python: "bg-[#8bc34a]",
    Java: "bg-[#ff9800]",
    Go: "bg-[#03A9F4]",
};

type Language = keyof typeof colors;

const getLanguageColor = (language: string) => {
    return colors[language as Language] || "bg-gray-400";
};

export default function DashboardComponent() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [projects, setProjects] = useState<Projects[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [githubUrl, setGithubUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCreatingProject, setIsCreatingProject] = useState(false);

    const fetchUserProjects = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('/api/get-project');
            setProjects(res.data);
        } catch (e) {
            console.log("Error fetching user projects", e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (isLoaded && isSignedIn && user.id) {
            fetchUserProjects();
        }
    }, [isLoaded, isSignedIn]);


    const handleCreateProject = async () => {
        if (!githubUrl.trim()) {
            showToast("Fill github url", 'info');
            return;
        }
        setIsCreatingProject(true);
        try {
            const res = await axios.post(`/api/add-project`, {
                url: githubUrl
            })
            const projectId = res.data.project.id;
            showToast("Project created successfully", 'success');
            router.push(`/project/${projectId}`);
        } catch (error) {
            console.log("Error occured while creating a project", error);
            showToast('Something went wrong', 'error');
        }
        setIsCreatingProject(false);
    }


    return (
        <>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-[#252526] border-[#3c3c3c]">
                        <CardHeader>
                            <CardTitle className="text-[#e0e0e0] text-lg font-medium">
                                Total Projects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-[#e0e0e0] mb-1">12</div>
                            <p className="text-lg text-[#858585]">+2 from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#252526] border-[#3c3c3c]">
                        <CardHeader>
                            <CardTitle className="text-[#e0e0e0] text-lg font-medium">
                                Questions Asked
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-[#e0e0e0] mb-1">248</div>
                            <p className="text-lg text-[#858585]">+18% from last week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#252526] border-[#3c3c3c]">
                        <CardHeader>
                            <CardTitle className="text-[#e0e0e0] text-lg font-medium">
                                Code Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-[#e0e0e0] mb-1">1.2M</div>
                            <p className="text-lg text-[#858585]">Lines analyzed</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#252526] border-[#3c3c3c]">
                        <CardHeader>
                            <CardTitle className="text-[#e0e0e0] text-lg font-medium">
                                Active Sessions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-[#e0e0e0] mb-1">3</div>
                            <p className="text-lg text-[#858585]">Currently running</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Projects */}
                <Card className="bg-[#252526] border-[#3c3c3c]">
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <CardTitle className="text-[#e0e0e0] text-xl font-semibold">Recent Projects</CardTitle>
                                <CardDescription className="text-[#858585] text-sm">
                                    Your recently analyzed repositories
                                </CardDescription>
                            </div>
                            <Button 
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-[#0e639c] hover:bg-[#1177bb] h-9 cursor-pointer"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <Loader2 className="h-8 w-8 text-[#0e639c] animate-spin" />
                                    <span className="ml-2 text-[#e0e0e0]">Loading projects...</span>
                                </div>
                            ) : projects.length == 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-lg border-2 border-dashed border-[#3c3c3c] bg-[#252526] my-4">
                                    <FolderOpen className="w-12 h-12 text-[#858585] mb-4" />
                                    <h3 className="text-lg font-medium text-[#e0e0e0] mb-2">No projects yet</h3>
                                    <p className="text-[#b5b5b5] mb-6 max-w-md">
                                        Get started by creating a new project to organize your code and collaborate with others.
                                    </p>
                                    <button
                                        onClick={() => setIsDialogOpen(true)}
                                        className="cursor-pointer px-6 py-2 bg-[#0e639c] text-white rounded-md hover:bg-[#1177bb] transition-colors flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Project
                                    </button>
                                </div>
                            ) : projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 bg-[#2a2d2e] rounded-lg border border-[#3c3c3c] hover:bg-[#33373a] transition-all duration-200 group cursor-pointer"
                                    onClick={() => router.push(`/project/${project.id}`)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-[#0e639c] rounded-lg flex items-center justify-center">
                                            <Github className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#e0e0e0] font-medium group-hover:text-[#4ec9b0] transition-colors">
                                                {project.projectName}
                                            </h3>
                                            <p className="text-[#b5b5b5] text-sm">
                                                Chat Application
                                            </p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <div className="flex items-center space-x-1">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${getLanguageColor(
                                                            project.language
                                                        )}`}
                                                    ></div>
                                                    <span className="text-[#858585] text-xs">
                                                        {project.language || "Typescript"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3 text-[#858585]" />
                                                    <span className="text-[#858585] text-xs">
                                                        {project.stars || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-[#252526] border-[#3c3c3c] text-[#e0e0e0]">
                    <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription className="text-[#858585]">
                            Enter the GitHub repository URL to analyze
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="githubUrl" className="text-right">
                                GitHub URL
                            </Label>
                            <Input
                                id="githubUrl"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                placeholder="https://github.com/username/repo"
                                className="col-span-3 bg-[#2a2d2e] border-[#3c3c3c] text-[#e0e0e0]"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={handleCreateProject}
                            disabled={isCreatingProject}
                            className="bg-[#0e639c] hover:bg-[#1177bb] flex items-center gap-2"
                        >
                            {isCreatingProject ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                "Analyze Repository"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
