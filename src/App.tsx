
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Cadastro from './pages/Cadastro';
import Pacientes from './pages/Pacientes';
import Prontuarios from './pages/Prontuarios';
import Agendamentos from './pages/Agendamentos';
import Configuracoes from './pages/Configuracoes';
import ChatViva from './pages/ChatViva';
import Termometro from './pages/Termometro';
import Usuarios from './pages/Usuarios';
import Sistema from './pages/Sistema';
import Perfil from './pages/Perfil';

// Dashboards
import PsicologoDashboard from './pages/dashboard/PsicologoDashboard';
import MedicoDashboard from './pages/dashboard/MedicoDashboard';
import ServidorDashboard from './pages/dashboard/ServidorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Novas páginas do sistema avançado
import NovoProntuario from './pages/NovoProntuario';
import NovoAgendamento from './pages/NovoAgendamento';
import ListaEspera from './pages/ListaEspera';
import Relatorios from './pages/Relatorios';
import Avaliacoes from './pages/Avaliacoes';
import NovosPacientes from './pages/NovosPacientes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas - SEM Layout administrativo */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rotas Protegidas - COM Layout administrativo */}
        <Route path="/app/*" element={<Layout><Outlet /></Layout>}>
          {/* Rotas protegidas para todos os usuários autenticados */}
          <Route path="perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          <Route path="chat-viva" element={
            <ProtectedRoute>
              <ChatViva />
            </ProtectedRoute>
          } />
          
          {/* Dashboards específicos por tipo */}
          <Route path="dashboard/servidor" element={
            <ProtectedRoute allowedTypes={['servidor']}>
              <ServidorDashboard />
            </ProtectedRoute>
          } />
          <Route path="dashboard/psicologo" element={
            <ProtectedRoute allowedTypes={['psicologo']}>
              <PsicologoDashboard />
            </ProtectedRoute>
          } />
          <Route path="dashboard/medico" element={
            <ProtectedRoute allowedTypes={['medico']}>
              <MedicoDashboard />
            </ProtectedRoute>
          } />
          <Route path="dashboard/admin" element={
            <ProtectedRoute allowedTypes={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Rotas específicas para servidores */}
          <Route path="termometro" element={
            <ProtectedRoute allowedTypes={['servidor']}>
              <Termometro />
            </ProtectedRoute>
          } />
          
          {/* Rotas específicas para psicólogos e médicos */}
          <Route path="pacientes" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico', 'admin']}>
              <Pacientes />
            </ProtectedRoute>
          } />
          <Route path="pacientes/novo" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico']}>
              <NovosPacientes />
            </ProtectedRoute>
          } />
          <Route path="prontuarios" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico']}>
              <Prontuarios />
            </ProtectedRoute>
          } />
          <Route path="prontuarios/novo" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico']}>
              <NovoProntuario />
            </ProtectedRoute>
          } />
          <Route path="lista-espera" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico']}>
              <ListaEspera />
            </ProtectedRoute>
          } />
          <Route path="avaliacoes" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico']}>
              <Avaliacoes />
            </ProtectedRoute>
          } />
          
          {/* Rotas específicas para administradores */}
          <Route path="usuarios" element={
            <ProtectedRoute allowedTypes={['admin']}>
              <Usuarios />
            </ProtectedRoute>
          } />
          <Route path="sistema" element={
            <ProtectedRoute allowedTypes={['admin']}>
              <Sistema />
            </ProtectedRoute>
          } />
          
          {/* Rotas compartilhadas (com diferentes níveis de acesso) */}
          <Route path="agendamentos" element={
            <ProtectedRoute>
              <Agendamentos />
            </ProtectedRoute>
          } />
          <Route path="agendamentos/novo" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico', 'admin']}>
              <NovoAgendamento />
            </ProtectedRoute>
          } />
          <Route path="relatorios" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico', 'admin']}>
              <Relatorios />
            </ProtectedRoute>
          } />
          <Route path="configuracoes" element={
            <ProtectedRoute allowedTypes={['psicologo', 'medico', 'admin']}>
              <Configuracoes />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
