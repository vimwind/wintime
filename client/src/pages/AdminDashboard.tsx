import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import BlogManagement from "@/components/admin/BlogManagement";
import FormSubmissions from "@/components/admin/FormSubmissions";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AdminTab = "overview" | "blog" | "forms" | "analytics";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      setLocation("/");
    }
  }, [isAuthenticated, user, setLocation]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const { data: analytics } = trpc.analytics.dashboard.useQuery();

  const renderContent = () => {
    switch (activeTab) {
      case "blog":
        return <BlogManagement />;
      case "forms":
        return <FormSubmissions />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "overview":
      default:
        return <AdminOverview analytics={analytics} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your salon website content and analytics</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdminTab)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="forms">Form Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {renderContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AdminOverview({ analytics }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalViews || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.uniquePages || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{analytics?.topPages?.[0]?.[0] || "N/A"}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <div className="font-semibold">Create New Blog Post</div>
              <div className="text-sm text-muted-foreground">Add content to your blog</div>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <div className="font-semibold">View Form Submissions</div>
              <div className="text-sm text-muted-foreground">Check booking requests</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
