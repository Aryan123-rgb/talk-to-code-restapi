<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7

import {
  LayoutDashboard,
  MessageSquare,
  Video,
  CreditCard,
  Code,
<<<<<<< HEAD
  Plus,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
=======
  Plus
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7

interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  lastAnalyzed: string;
  status: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  projects: Project[];
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  projects,
}: DashboardSidebarProps) {
  const { user, isLoaded, isSignedIn } = useUser();

  const sidebarItems: SidebarItem[] = [
<<<<<<< HEAD
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "qa", label: "Q&A", icon: MessageSquare },
    { id: "meetings", label: "Meetings", icon: Video },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "add-project", label: "Add Project", icon: Plus },
  ];
  const router = useRouter();
=======
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qa', label: 'Q&A', icon: MessageSquare },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'add-project', label: 'Add Project', icon: Plus },
  ];
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7

  return (
    <div className="w-64 min-h-screen bg-[#252526] border-r border-[#3c3c3c]">
      <div className="p-6">
        {/* Logo */}
<<<<<<< HEAD
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 mb-8 cursor-pointer"
        >
=======
        <div className="flex items-center space-x-2 mb-8">
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
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
<<<<<<< HEAD
              <p className="text-[#e0e0e0] font-medium truncate">
                {user.fullName}
              </p>
              <p className="text-[#858585] text-sm truncate">
                {user.emailAddresses[0].emailAddress}
              </p>
=======
              <p className="text-[#e0e0e0] font-medium truncate">{user.fullName}</p>
              <p className="text-[#858585] text-sm truncate">{user.emailAddresses[0].emailAddress}</p>
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
<<<<<<< HEAD
                  ? "bg-[#0e639c] text-white border border-[#1a8fe8]"
                  : "text-[#b5b5b5] hover:text-[#e0e0e0] hover:bg-[#2a2d2e]"
=======
                ? 'bg-[#0e639c] text-white border border-[#1a8fe8]'
                : 'text-[#b5b5b5] hover:text-[#e0e0e0] hover:bg-[#2a2d2e]'
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
