import DashboardComponent from "@/components/dashboard-component";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0]">
      {/* Header */}
      <Navbar />

      <main className="p-4 md:p-6 bg-[#1e1e1e] min-h-[calc(100vh-80px)]">
        <DashboardComponent />
      </main>
    </div>
  );
}
