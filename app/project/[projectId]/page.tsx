'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    Send,
    Github,
    Star,
    Clock,
    MessageSquare,
    User,
    Bot,
    X,
    Loader2
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose
} from "@/components/ui/sheet"
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Or any other theme
import MarkdownRenderer from '@/components/MarkDownRenderer';
import RelevantFiles from '@/components/RelevantFiles';
import { showToast } from '@/lib/toast';

interface FileContent {
    id: string;
    fileContent: string;
    filePath: string;
}

interface Message {
    id: string;
    question: string;
    answer: string;
    projectId: string;
    fileContentId: string;
    createdAt: Date;
    updatedAt: Date;
    fileContent: FileContent[]
}

interface Project {
    id: string;
    projectName: string;
    description: string;
    language: string;
    stars: number;
    lastAnalyzed: string;
    githubUrl: string;
}

const colors = {
    'TypeScript': 'bg-[#0e639c]',
    'JavaScript': 'bg-[#f7dc6f]',
    'Python': 'bg-[#4ec9b0]',
    'Java': 'bg-[#c53030]',
    'Go': 'bg-[#00bcd4]'
}

export default function ProjectChat() {
    const params = useParams();
    const projectId = params.projectId;
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>();
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [project, setProject] = useState<Project>();
    const [isSending, setIsSending] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState<Message>();

    const fetchProjectDetails = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/get-project?projectId=${projectId}`);
            setProject(res.data);
            setMessages(res.data.responses);
            console.log(res.data);
        } catch (e) {
            console.log("Error fetching project details", e);
        }
        setIsLoading(false);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        scrollToBottom();
        fetchProjectDetails();
    }, []);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) {
            return;
        }
        setIsSending(true);
        setInputValue('');
        try {
            const res = await axios.post('/api/get-response', {
                question: inputValue,
                projectId: projectId,
            });
            console.log("res", res.data);
            setSelectedMessage(res.data);
            setIsSheetOpen(true);
        } catch (e) {
            console.log("Error sending message", e);
        }
        setIsSending(false);
    };

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };



    const handleQuestionClick = (id: string) => {
        const message = messages?.find(m => m.id === id);
        if (message) {
            setSelectedMessage(message);
            setIsSheetOpen(true)
        }
    }

    const color = colors[project?.language as keyof typeof colors] || 'bg-[#6c6c6c]';

    return (
        <div className="min-h-screen bg-[#1e1e1e] relative">
            {/* Full-screen loading overlay */}
            {(isLoading || !project) && (
                <div className="fixed inset-0 bg-[#1e1e1e] bg-opacity-90 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-[#0e639c] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-[#e0e0e0] text-lg">Loading project...</p>
                    </div>
                </div>
            )}

            {/* Main content */}
            <header className="bg-[#252526] border-b border-[#3c3c3c] p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push('/dashboard')}
                            className="border-[#3c3c3c] text-[#9cdcfe] hover:bg-[#2a2d2e] bg-[#2a2d2e] cursor-pointer hover:text-[#ffffff] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#0e639c] rounded-lg flex items-center justify-center">
                                <a href={project?.githubUrl} target='_blank'><Github className="w-5 h-5 text-white" /></a>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#e0e0e0]">{project?.projectName}</h1>
                                <div className="flex items-center space-x-3 text-sm text-[#b5b5b5]">
                                    <div className="flex items-center space-x-1">
                                        <div className={`w-2 h-2 rounded-full ${color}`}></div>
                                        <span>{project?.language || "Typescript"}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3" />
                                        <span>{project?.stars || 0}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        {/* <span>{project?.lastAnalyzed}</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex h-[calc(100vh-120px)]">
                {/* Messages Area */}
                <div className="flex-1 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {(!messages || messages.length === 0) ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#0e639c] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">Start a Conversation</h3>
                                    <p className="text-[#b5b5b5] mb-6 max-w-md mx-auto">
                                        Ask me anything about this codebase. I can help with setup, architecture, implementation details, and more.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {[
                                            "How do I set up this project?",
                                            "What's the project architecture?",
                                            "How to contribute to this repo?",
                                            "Explain the main components"
                                        ].map((suggestion, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setInputValue(suggestion)}
                                                className="border-[#3c3c3c] text-[#9cdcfe] hover:bg-[#2a2d2e] bg-[#2a2d2e] cursor-pointer hover:text-[#ffffff] transition-colors"
                                            >
                                                {suggestion}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <div key={message.id} className="space-y-4">
                                        <div
                                            className="group cursor-pointer bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-4 transition-all duration-200 hover:border-[#4a4a4a] hover:shadow-lg hover:shadow-[#0e639c]/10"
                                            onClick={() => handleQuestionClick(message.id)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-[#0e639c] flex items-center justify-center flex-shrink-0">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-[#e0e0e0] text-base">{message.question}</h3>
                                                    <p className="text-sm text-[#b5b5b5] mt-1 line-clamp-2">
                                                        {message.answer.substring(0, 150) || 'Loading response...'}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-xs text-[#858585]">
                                                            {/* {formatTimestamp(message.timestamp)} */}
                                                        </span>
                                                        <span className="text-xs text-[#9cdcfe] opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Click to view →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#4ec9b0] flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-[#e0e0e0] font-medium">AI Assistant</span>
                                                <span className="text-xs text-[#858585]">typing...</span>
                                            </div>
                                            <Card className="bg-[#252526] border-[#3c3c3c]">
                                                <CardContent className="p-4">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-[#9cdcfe] rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-[#9cdcfe] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-[#9cdcfe] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 border-t border-[#3c3c3c] bg-[#252526]">
                        <div className="flex space-x-4">
                            <div className="flex-1 relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything about this codebase..."
                                    className="bg-[#1e1e1e] border-[#3c3c3c] text-[#e0e0e0] placeholder-[#858585] pr-12 h-12 text-lg selection:bg-blue-500 selection:text-white"
                                    disabled={isSending}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={isSending && !inputValue.trim()}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0e639c] hover:bg-[#1177bb] text-white p-2 h-8 w-8 transition-colors flex items-center justify-center"
                                >
                                    {isSending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-[40%] min-w-[40%] bg-[#1e1e1e] border-l border-[#3c3c3c] overflow-y-auto" >
                    <SheetClose asChild>
                        <Button className="absolute right-4 top-4 text-white hover:text-gray-300">
                            <X className="w-5 h-5" />
                        </Button>
                    </SheetClose>

                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-[#e0e0e0]">Chat Details</SheetTitle>
                    </SheetHeader>
                    {selectedMessage && (
                        <div className="space-y-6">
                            <div className="bg-[#252526] p-4 rounded-lg">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#0e639c] flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#e0e0e0]">You asked:</h3>
                                        <p className="text-sm text-[#b5b5b5]">
                                            {/* {formatTimestamp(selectedMessage.timestamp)} */}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[#e0e0e0] whitespace-pre-wrap">
                                    {selectedMessage.question}
                                </p>
                            </div>

                            <div className="bg-[#252526] p-4 rounded-lg">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#4ec9b0] flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-medium text-[#e0e0e0]">AI Response:</h3>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <MarkdownRenderer content={selectedMessage.answer} />
                                </div>
                                <RelevantFiles fileContents={selectedMessage.fileContent} />
                            </div>
                        </div>
                    )}

                </SheetContent>
            </Sheet>
        </div>
    )
}