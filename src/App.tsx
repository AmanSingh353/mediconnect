
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HealthRecords from "./components/HealthRecords";
import MedicineOrder from "./components/MedicineOrder";
import Reminders from "./components/Reminders";
import NearbyDoctors from "./components/NearbyDoctors";
import PregnancyTracker from "./components/PregnancyTracker";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/health-records" 
            element={
              <Layout>
                <HealthRecords />
              </Layout>
            } 
          />
          <Route 
            path="/medicine" 
            element={
              <Layout>
                <MedicineOrder />
              </Layout>
            } 
          />
          <Route 
            path="/reminders" 
            element={
              <Layout>
                <Reminders />
              </Layout>
            } 
          />
          <Route 
            path="/doctors" 
            element={
              <Layout>
                <NearbyDoctors />
              </Layout>
            } 
          />
          <Route 
            path="/pregnancy" 
            element={
              <Layout>
                <PregnancyTracker />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
