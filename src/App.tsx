
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
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationContainer } from './components/NotificationSystem';
import { LoadingPage } from './components/LoadingStates';

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
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
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
        action: {
          label: 'Atualizar',
          onClick: () => window.location.reload(),
        }
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
          autoClose: false
        });
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [canInstall, isStandalone, addNotification]);

  return null;
};

// Componente de rota protegida
const ProtectedRoute: React.FC<{ children: React.ReactNode; userType: string }> = ({ 
  children, 
  userType 
}) => {
  return (
    <ErrorBoundary>
      <Layout userType={userType as any}>
        {children}
      </Layout>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simular carregamento inicial da aplicação
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage message="Inicializando Viva+..." />;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <NotificationContainer />
            <PWAManager />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
                {/* Dashboard Routes with Layout and Lazy Loading */}
                <Route path="/dashboard/servidor" element={
                  <ProtectedRoute userType="servidor">
                    <ServidorDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/psicologo" element={
                  <ProtectedRoute userType="psicologo">
                    <PsicologoDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/medico" element={
                  <ProtectedRoute userType="medico">
                    <MedicoDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/admin" element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                {/* Shared Pages with Layout and Lazy Loading */}
                <Route path="/agendamentos" element={
                  <ProtectedRoute userType="servidor">
                    <Agendamentos />
                  </ProtectedRoute>
                } />

                <Route path="/termometro" element={
                  <ProtectedRoute userType="servidor">
                    <Termometro />
                  </ProtectedRoute>
                } />

                <Route path="/chat" element={
                  <ProtectedRoute userType="servidor">
                    <ChatViva />
                  </ProtectedRoute>
                } />

                <Route path="/prontuarios" element={
                  <ProtectedRoute userType="psicologo">
                    <Prontuarios />
                  </ProtectedRoute>
                } />

                <Route path="/perfil" element={
                  <ProtectedRoute userType="servidor">
                    <Perfil />
                  </ProtectedRoute>
                } />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
