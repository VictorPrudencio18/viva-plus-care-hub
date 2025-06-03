
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ServidorDashboard from "./pages/dashboard/ServidorDashboard";
import PsicologoDashboard from "./pages/dashboard/PsicologoDashboard";
import MedicoDashboard from "./pages/dashboard/MedicoDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Agendamentos from "./pages/Agendamentos";
import Termometro from "./pages/Termometro";
import ChatViva from "./pages/ChatViva";
import Prontuarios from "./pages/Prontuarios";
import Perfil from "./pages/Perfil";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            
            {/* Dashboard Routes with Layout */}
            <Route path="/dashboard/servidor" element={
              <Layout userType="servidor">
                <ServidorDashboard />
              </Layout>
            } />
            
            <Route path="/dashboard/psicologo" element={
              <Layout userType="psicologo">
                <PsicologoDashboard />
              </Layout>
            } />
            
            <Route path="/dashboard/medico" element={
              <Layout userType="medico">
                <MedicoDashboard />
              </Layout>
            } />
            
            <Route path="/dashboard/admin" element={
              <Layout userType="admin">
                <AdminDashboard />
              </Layout>
            } />

            {/* Shared Pages with Layout */}
            <Route path="/agendamentos" element={
              <Layout userType="servidor">
                <Agendamentos />
              </Layout>
            } />

            <Route path="/termometro" element={
              <Layout userType="servidor">
                <Termometro />
              </Layout>
            } />

            <Route path="/chat" element={
              <Layout userType="servidor">
                <ChatViva />
              </Layout>
            } />

            <Route path="/prontuarios" element={
              <Layout userType="psicologo">
                <Prontuarios />
              </Layout>
            } />

            <Route path="/perfil" element={
              <Layout userType="servidor">
                <Perfil />
              </Layout>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
