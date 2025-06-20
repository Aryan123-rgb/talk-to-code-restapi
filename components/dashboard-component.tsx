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
import { Github, Clock, Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Projects {
    id: string;
    projectName: string;
    githubUrl: string;
    language: string;
    stars: string;
}

const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
        TypeScript: "bg-[#4ec9b0]",
        JavaScript: "bg-[#f7dc6f]",
        Python: "bg-[#8bc34a]",
        Java: "bg-[#ff9800]",
        Go: "bg-[#03A9F4]",
    };
    return colors[language] || "bg-[#858585]";
};

export default function DashboardComponent() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [projects, setProjects] = useState<Projects[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserProjects = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('/api/get-project', {
                userId: user?.id
            })
            console.log(res.data);
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
                        <CardTitle className="text-[#e0e0e0]">Recent Projects</CardTitle>
                        <CardDescription className="text-[#858585]">
                            Your recently analyzed repositories
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projects.length == 0 ? (
                                <div className="flex justify-center items-center py-12">
                                    <Loader2 className="h-8 w-8 text-[#0e639c] animate-spin" />
                                    <span className="ml-2 text-[#e0e0e0]">Loading projects...</span>
                                </div>
                            ) : projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 bg-[#2a2d2e] rounded-lg border border-[#3c3c3c] hover:bg-[#33373a] transition-all duration-200 group"
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
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3 text-[#858585]" />
                                                    <span className="text-[#858585] text-xs">
                                                        {/* {project.lastAnalyzed} */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Button
                                            onClick={() => router.push(`/project/${project.id}`)}
                                            variant="outline"
                                            size="sm"
                                            className="border-[#3c3c3c] text-[#9cdcfe] bg-[#1e1e1e] hover:bg-[#2a2d2e] hover:text-[#ffffff] transition-colors cursor-pointer"
                                        >
                                            Open Chat
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
