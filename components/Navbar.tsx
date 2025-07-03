"use client";

import { Button } from "@/components/ui/button";
import {
    Code,
    Menu,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { dark } from "@clerk/themes";

export default function Navbar() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    return (
        <header className="bg-[#1e1e1e] border-b border-[#404040] sticky top-0 z-50">
            <div className="mx-auto px-10 py-4">
                <div className="flex items-center justify-between">
                    <div onClick={() => router.push('/')} className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 bg-[#0e639c] rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[#ffffff]">TalkToCode</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-4">
                            {isLoaded && isSignedIn ? (
                                <>
                                    <Button
                                        onClick={() => router.push("/dashboard")}
                                        variant="outline"
                                        className="border-[#3c3c3c] text-[#9cdcfe] bg-[#1e1e1e] hover:bg-[#2a2d2e] hover:text-[#ffffff] transition-colors cursor-pointer text-sm lg:text-base"
                                    >
                                        Dashboard
                                    </Button>
                                    <UserButton
                                        appearance={{
                                            baseTheme: dark,
                                        }}
                                    />
                                </>
                            ) : (
                                <Button
                                    onClick={() => router.push("/dashboard")}
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
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[#9cdcfe] hover:bg-[#2a2d2e] hover:text-white"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="bg-[#1e1e1e] border-l border-[#404040] w-[300px] sm:w-[350px] p-6"
                            >
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
                                                    onClick={() => router.push("/dashboard")}
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
    );
}
