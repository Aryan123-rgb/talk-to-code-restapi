'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  CreditCard,
  Code,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Clock,
  Star,
  GitBranch,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import DashboardComponent from '@/components/dashboard-component';
import AddProjectForm from '@/components/AddProjectForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qa', label: 'Q&A', icon: MessageSquare },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'add-project', label: 'Add Project', icon: Plus },
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
      status: 'active',
      branches: 3
    },
    {
      id: 2,
      name: 'express-api-server',
      description: 'RESTful API server built with Express.js and MongoDB',
      url: 'https://github.com/user/express-api-server',
      language: 'JavaScript',
      stars: 12,
      lastAnalyzed: '1 day ago',
      status: 'active',
      branches: 2
    },
    {
      id: 3,
      name: 'python-ml-toolkit',
      description: 'Machine learning utilities and helper functions',
      url: 'https://github.com/user/python-ml-toolkit',
      language: 'Python',
      stars: 45,
      lastAnalyzed: '3 days ago',
      status: 'inactive',
      branches: 4
    }
  ];

  const onTabChange = (id: string) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'add-project':
        return <AddProjectForm />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-6">
            <div className="w-20 h-20 bg-[#0e639c] rounded-2xl flex items-center justify-center mx-auto mb-6">
              {(() => {
                const Icon = sidebarItems.find(item => item.id === activeTab)?.icon || LayoutDashboard;
                return <Icon className="w-10 h-10 text-white" />;
              })()}
            </div>
            <h3 className="text-2xl font-semibold text-[#e0e0e0] mb-3">
              {sidebarItems.find(item => item.id === activeTab)?.label} Coming Soon
            </h3>
            <p className="text-[#b5b5b5] max-w-md">
              This section is under active development and will be available soon. Stay tuned for updates!
            </p>
            <Button className="mt-6 bg-[#0e639c] hover:bg-[#1177bb] text-white">
              Notify Me When Ready
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0]">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} projects={projects} onTabChange={onTabChange} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-[#252526] border-b border-[#3c3c3c] p-4 md:p-6 sticky top-0 z-40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#e0e0e0] mb-1">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm md:text-base text-[#b5b5b5]">
                  {activeTab === 'dashboard' && 'Welcome back! Here\'s an overview of your projects and activity.'}
                  {activeTab === 'qa' && 'Ask questions about your code and get intelligent answers.'}
                  {activeTab === 'meetings' && 'Schedule and manage your code review meetings.'}
                  {activeTab === 'billing' && 'Manage your subscription and billing information.'}
                  {activeTab === 'add-project' && 'Connect a new GitHub repository to start analyzing and getting insights about your codebase'}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 md:p-6 bg-[#1e1e1e] min-h-[calc(100vh-160px)]">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}