
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ServidorDashboard from "./pages/dashboard/ServidorDashboard";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
              <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard do Psicólogo</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </Layout>
          } />
          
          <Route path="/dashboard/medico" element={
            <Layout userType="medico">
              <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard do Médico</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </Layout>
          } />
          
          <Route path="/dashboard/admin" element={
            <Layout userType="admin">
              <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
                <p className="text-gray-600">Em desenvolvimento...</p>
              </div>
            </Layout>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
