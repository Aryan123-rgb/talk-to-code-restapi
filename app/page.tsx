"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  MessageSquare,
  Brain,
  Code,
  Search,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BookOpen,
  Settings,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Home() {
  const [githubUrl, setGithubUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const handleAnalyze = async () => {
    if (!githubUrl.trim()) return;

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Here you would integrate with your backend
    }, 2000);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI understands your codebase structure, dependencies, and patterns to provide intelligent insights.",
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description:
        "Ask questions in plain English about setup, architecture, best practices, or specific implementations.",
    },
    {
      icon: Search,
      title: "Deep Code Search",
      description:
        "Find relevant code snippets, functions, and patterns across your entire repository instantly.",
    },
    {
      icon: BookOpen,
      title: "Documentation Helper",
      description:
        "Get explanations for complex code, understand project structure, and learn implementation details.",
    },
    {
      icon: Settings,
      title: "Setup Guidance",
      description:
        "Step-by-step instructions for project setup, configuration, and development environment preparation.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Share insights with your team and onboard new developers faster with AI-generated explanations.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Paste Repository URL",
      description:
        "Simply paste your GitHub repository URL and we'll handle the rest.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our AI analyzes your code structure, dependencies, and documentation.",
    },
    {
      number: "03",
      title: "Ask Questions",
      description:
        "Start asking questions about setup, architecture, or specific implementations.",
    },
    {
      number: "04",
      title: "Get Insights",
      description:
        "Receive intelligent, contextual answers tailored to your codebase.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <header className="bg-[#1e1e1e] border-b border-[#404040] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0e639c] rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#ffffff]">
                TalkToCode
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[#9cdcfe] hover:text-[#ffffff] transition-colors text-sm lg:text-base"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-[#9cdcfe] hover:text-[#ffffff] transition-colors text-sm lg:text-base"
              >
                How it Works
              </a>
              <div className="flex items-center space-x-4">
                {isLoaded && isSignedIn ? (
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="border-[#3c3c3c] text-[#9cdcfe] bg-[#1e1e1e] hover:bg-[#2a2d2e] hover:text-[#ffffff] transition-colors cursor-pointer text-sm lg:text-base"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/sign-in")}
                    variant="outline"
                    className="border-[#3c3c3c] text-[#9cdcfe] bg-[#1e1e1e] hover:bg-[#2a2d2e] hover:text-[#ffffff] transition-colors cursor-pointer text-sm lg:text-base"
                  >
                    Login
                  </Button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#9cdcfe] hover:bg-[#2a2d2e] hover:text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#1e1e1e] border-l border-[#404040] w-[300px] sm:w-[350px] p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#0e639c] rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[#ffffff]">
                          TalkToCode
                        </span>
                      </div>
                      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        <X className="h-5 w-5 text-[#9cdcfe]" />
                        <span className="sr-only">Close</span>
                      </SheetClose>
                    </div>
                    <nav className="flex-1 flex flex-col space-y-4 px-2">
                      <SheetClose asChild>
                        <a
                          href="#features"
                          className="text-[#9cdcfe] hover:text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-[#2a2d2e] transition-colors"
                        >
                          Features
                        </a>
                      </SheetClose>
                      <SheetClose asChild>
                        <a
                          href="#how-it-works"
                          className="text-[#9cdcfe] hover:text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-[#2a2d2e] transition-colors"
                        >
                          How it Works
                        </a>
                      </SheetClose>
                      <div className="pt-4 mt-4 px-2">
                        {isLoaded && isSignedIn ? (
                          <Button
                            onClick={() => router.push("/dashboard")}
                            className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-6 text-base font-medium"
                          >
                            Go to Dashboard
                          </Button>
                        ) : (
                          <Button
                            onClick={() => router.push("/sign-in")}
                            className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-6 text-base font-medium"
                          >
                            Sign In
                          </Button>
                        )}
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-[#2a2d2e] text-[#9cdcfe] border-[#3c3c3c]">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Code Analysis
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-[#e0e0e0] mb-6 leading-tight">
            Talk to Your
            <span className="text-[#4ec9b0]"> Code</span>
          </h1>

          <p className="text-xl text-[#b5b5b5] mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform any GitHub repository into an intelligent conversation.
            Get instant answers about setup, architecture, and implementation
            details using advanced AI.
          </p>

          {/* GitHub URL Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-[#252526] backdrop-blur-sm rounded-2xl">
              <div className="flex-1 relative">
                <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#858585]" />
                <Input
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="pl-12 bg-[#252526] text-[#e0e0e0] placeholder-[#858585] text-lg h-14 border-0 focus-visible:ring-0"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!githubUrl.trim() || isAnalyzing}
                className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-8 h-14 text-lg font-semibold transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Repository <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-[#858585] mt-3">
              <CheckCircle className="w-4 h-4 inline mr-1 text-[#4ec9b0]" />
              Works with any public GitHub repository
            </p>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              "How do I set up this project?",
              "What's the project architecture?",
              "How to contribute to this repo?",
              "Explain this component",
            ].map((example, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#2a2d2e] text-[#9cdcfe] border-[#3c3c3c] hover:bg-[#33373a] transition-colors cursor-pointer"
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#252526]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#e0e0e0] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#b5b5b5] max-w-2xl mx-auto">
              Get started in seconds with our simple four-step process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0e639c] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#e0e0e0] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#b5b5b5] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-[#3c3c3c]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#e0e0e0] mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-[#b5b5b5] max-w-2xl mx-auto">
              Everything you need to understand and work with any codebase
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#252526] backdrop-blur-sm border-[#3c3c3c] hover:bg-[#2a2d2e] transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-[#0e639c] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#e0e0e0] text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#b5b5b5] leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
