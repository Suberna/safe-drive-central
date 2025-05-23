
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Violations from "./pages/Violations";
import ViolationDetails from "./pages/ViolationDetails";
import NewAppeal from "./pages/NewAppeal";
import Appeals from "./pages/Appeals";
import AppealDetails from "./pages/AppealDetails";
import ReportViolation from "./pages/ReportViolation";
import NotFound from "./pages/NotFound";
import AdminReports from "./pages/AdminReports";
import AdminUsers from "./pages/AdminUsers";
import AdminAppeals from "./pages/AdminAppeals";
import AdminSettings from "./pages/AdminSettings";
import { AdminAppealDetails } from "./pages/AdminAppealDetails";
import { AdminReportDetails } from "./pages/AdminReportDetails";
import TrafficMap from "./pages/TrafficMap";
import SmartFines from "./pages/SmartFines";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/violations" element={<Violations />} />
              <Route path="/violations/:id" element={<ViolationDetails />} />
              <Route path="/appeals/new/:id" element={<NewAppeal />} />
              <Route path="/appeals" element={<Appeals />} />
              <Route path="/appeals/:id" element={<AppealDetails />} />
              <Route path="/report" element={<ReportViolation />} />
              <Route path="/traffic-map" element={<TrafficMap />} />
              <Route path="/smart-fines" element={<SmartFines />} />
              
              {/* Admin routes */}
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/reports/:id" element={<AdminReportDetails />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/appeals" element={<AdminAppeals />} />
              <Route path="/admin/appeals/:id" element={<AdminAppealDetails />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/traffic-map" element={<TrafficMap />} />
              <Route path="/admin/smart-fines" element={<SmartFines />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
