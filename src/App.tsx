
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { useAppStore } from './store';
import { usePWA } from './hooks/usePWA';

// Lazy-loaded components
import {
  ServidorDashboard,
  PsicologoDashboard,
  MedicoDashboard,
  AdminDashboard,
  Agendamentos,
  Termometro,
  ChatViva,
  Prontuarios,
  Perfil,
} from './components/LazyPages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: (failureCount, error) => {
        // Não fazer retry em caso de erro de rede quando offline
        if (!navigator.onLine) return false;
        return failureCount < 3;
      },
    },
  },
});

// Componente para monitoramento PWA
const PWAManager: React.FC = () => {
  const { isStandalone, canInstall, updateAvailable } = usePWA();
  const { addNotification } = useAppStore();

  React.useEffect(() => {
    if (updateAvailable) {
      addNotification({
        type: 'info',
        title: 'Atualização Disponível',
        message: 'Uma nova versão está disponível. Recarregue para atualizar.',
      });
    }
  }, [updateAvailable, addNotification]);

  React.useEffect(() => {
    // Mostrar dica de instalação após um tempo
    if (canInstall && !isStandalone) {
      const timer = setTimeout(() => {
        addNotification({
          type: 'info',
          title: 'Instalar App',
          message: 'Instale o Viva+ para uma experiência melhor!',
        });
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [canInstall, isStandalone, addNotification]);

  return null;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PWAManager />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            
            {/* Dashboard Routes with Layout and Lazy Loading */}
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

            {/* Shared Pages with Layout and Lazy Loading */}
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
