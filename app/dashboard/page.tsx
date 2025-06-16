'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  CreditCard,
  Code,
<<<<<<< HEAD
  Search,
  Bell,
=======
  Github,
  Calendar,
  Clock,
  Star,
  GitBranch,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  User
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import DashboardComponent from '@/components/dashboard-component';
import AddProjectForm from '@/components/AddProjectForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qa', label: 'Q&A', icon: MessageSquare },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'add-project', label: 'Add Project', icon: Code },
  ];

  const projects = [
    {
      id: 1,
      name: 'react-todo-app',
      description: 'A modern todo application built with React and TypeScript',
      url: 'https://github.com/user/react-todo-app',
      language: 'TypeScript',
      stars: 24,
      lastAnalyzed: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'express-api-server',
      description: 'RESTful API server built with Express.js and MongoDB',
      url: 'https://github.com/user/express-api-server',
      language: 'JavaScript',
      stars: 12,
      lastAnalyzed: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'python-ml-toolkit',
      description: 'Machine learning utilities and helper functions',
      url: 'https://github.com/user/python-ml-toolkit',
      language: 'Python',
      stars: 45,
      lastAnalyzed: '3 days ago',
      status: 'inactive'
    }
  ];

<<<<<<< HEAD
=======
  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-[#0e639c]',
      'JavaScript': 'bg-[#f7dc6f]',
      'Python': 'bg-[#34c759]',
      'Java': 'bg-[#b72e2e]',
      'Go': 'bg-[#34c759]'
    };
    return colors[language] || 'bg-[#858585]';
  };

>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
  const onTabChange = (id: string) => {
    setActiveTab(id);
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} projects={projects} onTabChange={onTabChange} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-[#252526] border-b border-[#3c3c3c] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#e0e0e0] mb-1">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-[#b5b5b5]">
                  {activeTab === 'dashboard' && 'Welcome back! Here\'s an overview of your projects and activity.'}
                  {activeTab === 'qa' && 'Ask questions about your code and get intelligent answers.'}
                  {activeTab === 'meetings' && 'Schedule and manage your code review meetings.'}
                  {activeTab === 'billing' && 'Manage your subscription and billing information.'}
<<<<<<< HEAD
                  {activeTab === 'add-project' && 'Connect a new GitHub repository to start analyzing and getting insights about your codebase'}
=======
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-[#3c3c3c] text-[#9cdcfe] hover:bg-[#2a2d2e] hover:text-[#ffffff]">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="border-[#3c3c3c] text-[#9cdcfe] hover:bg-[#2a2d2e] hover:text-[#ffffff]">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 bg-[#1e1e1e]">
            {activeTab === 'dashboard' && (
              <DashboardComponent />
            )}
            {/* Placeholder content for other tabs */}
            {activeTab == 'add-project' && (
              <AddProjectForm />
            )}
            {activeTab !== 'dashboard' && activeTab != 'add-project' && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0e639c] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {/* {sidebarItems.find(item => item.id === activeTab)?.icon && (
                      <sidebarItems.find(item => item.id === activeTab)!.icon className="w-8 h-8 text-white" />
                    )} */}
                  </div>
                  <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                    {sidebarItems.find(item => item.id === activeTab)?.label} Coming Soon
                  </h3>
                  <p className="text-[#858585]">
                    This section is under development and will be available soon.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}