import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/main.css"; // Import main CSS for health app styling
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Analytics from "./pages/Analytics";
import MentalWellness from "./pages/MentalWellness";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConnectDevice from "./pages/ConnectDevice";
import AICoachChat from "./pages/AICoachChat";
import Meal from "./pages/Meal";
import AddMeal from "./pages/AddMeal";
import MealDatabase from "./pages/MealDatabase";
import Achievements from "./pages/Achievements";
import AboutUs from "./pages/AboutUs";
import ProfileSettings from "./pages/ProfileSettings";
import AIVideoAnalysis from "./pages/AIVideoAnalysis";
import AIVoiceAssistant from "./pages/AIVoiceAssistant";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HealthReport from "./pages/HealthReport";
import LiveStatsDashboard from "./pages/LiveStatsDashboard";
import HydrationTracker from "./pages/HydrationTracker";
import SleepAnalysis from "./pages/SleepAnalysis";
import PersonalizedInsights from "./pages/PersonalizedInsights";
import PersonalizedInsightsFeed from "./pages/PersonalizedInsightsFeed";
import ModernSymptomChecker from "./pages/ModernSymptomChecker";
import GeneExplorer from "./pages/GeneExplorer";

const queryClient = new QueryClient();

// Protected route component that uses AuthContext
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Wrapper component to provide auth context
const AppWithAuth = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connect-device" element={
          <ProtectedRoute>
            <ConnectDevice />
          </ProtectedRoute>
        } />
        
        {/* Non-auth but with drawer layout */}
        <Route path="/about" element={
          <AppLayout>
            <AboutUs />
          </AppLayout>
        } />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <Index />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/personalized-insights" element={
          <ProtectedRoute>
            <AppLayout>
              <PersonalizedInsights />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/personalized-insights-feed" element={
          <ProtectedRoute>
            <AppLayout>
              <PersonalizedInsightsFeed />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/modern-symptom-checker" element={
          <ProtectedRoute>
            <AppLayout>
              <ModernSymptomChecker />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AppLayout>
              <Analytics />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/mental-wellness" element={
          <ProtectedRoute>
            <AppLayout>
              <MentalWellness />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <AppLayout>
              <Calendar />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <AppLayout>
              <AICoachChat />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/meal" element={
          <ProtectedRoute>
            <AppLayout>
              <Meal />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/add-meal" element={
          <ProtectedRoute>
            <AppLayout>
              <AddMeal />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/meal-database" element={
          <ProtectedRoute>
            <AppLayout>
              <MealDatabase />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/achievements" element={
          <ProtectedRoute>
            <AppLayout>
              <Achievements />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile-settings" element={
          <ProtectedRoute>
            <AppLayout>
              <ProfileSettings />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/ai-video-analysis" element={
          <ProtectedRoute>
            <AppLayout>
              <AIVideoAnalysis />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/ai-voice-assistant" element={
          <ProtectedRoute>
            <AppLayout>
              <AIVoiceAssistant />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/live-stats-dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <LiveStatsDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/hydration-tracker" element={
          <ProtectedRoute>
            <AppLayout>
              <HydrationTracker />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/sleep-analysis" element={
          <ProtectedRoute>
            <AppLayout>
              <SleepAnalysis />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/health-report" element={
          <ProtectedRoute>
            <AppLayout>
              <HealthReport />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/gene-explorer" element={
          <ProtectedRoute>
            <AppLayout>
              <GeneExplorer />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithAuth />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
