"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Video,
  CreditCard,
  Code,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSheetOpenChange?: (open: boolean) => void;
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  onSheetOpenChange,
}: DashboardSidebarProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add-project", label: "Add Project", icon: Plus },
  ];

  const renderSidebarContent = (isMobileMenu = false) => (
    <div className={`${isMobileMenu ? 'p-6' : 'p-6'} h-full flex flex-col`}>
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center space-x-2 mb-8 cursor-pointer"
      >
        <div className="w-8 h-8 bg-[#0e639c] rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-[#e0e0e0]">TalkToCode</span>
      </div>

      {/* User Info */}
      {isLoaded && isSignedIn && (
        <div className="flex items-center space-x-3 mb-8 p-3 bg-[#2a2d2e] rounded-lg border border-[#3c3c3c]">
          <div className="flex-shrink-0">
            <UserButton />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[#e0e0e0] font-medium truncate">
              {user.fullName}
            </p>
            <p className="text-[#858585] text-sm truncate">
              {user.emailAddresses[0]?.emailAddress || ''}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              if (isMobileMenu) {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
              }
            }}
            className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${activeTab === item.id
              ? "bg-[#0e639c] text-white border border-[#1a8fe8]"
              : "text-[#b5b5b5] hover:text-[#e0e0e0] hover:bg-[#2a2d2e]"
              }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#252526] border-b border-[#3c3c3c] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sheet onOpenChange={onSheetOpenChange}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#9cdcfe] hover:bg-[#2a2d2e] hover:text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#252526] border-r border-[#404040] w-[280px] p-0">
                {renderSidebarContent(true)}
              </SheetContent>
            </Sheet>
            <span className="text-lg font-bold text-[#e0e0e0]">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Menu'}
            </span>
          </div>
          {isLoaded && isSignedIn && (
            <div className="flex-shrink-0">
              <UserButton />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-64 min-h-screen bg-[#252526] border-r border-[#3c3c3c]">
      {renderSidebarContent()}
    </div>
  );
}
