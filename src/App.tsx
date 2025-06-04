
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Layout from "./components/Layout";
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
        <Route path="/" element={<Layout><Outlet /></Layout>}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/novo" element={<NovosPacientes />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/prontuarios/novo" element={<NovoProntuario />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/lista-espera" element={<ListaEspera />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/chat-viva" element={<ChatViva />} />
          <Route path="/termometro" element={<Termometro />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/sistema" element={<Sistema />} />
          <Route path="/perfil" element={<Perfil />} />
          
          {/* Dashboards */}
          <Route path="/dashboard/psicologo" element={<PsicologoDashboard />} />
          <Route path="/dashboard/medico" element={<MedicoDashboard />} />
          <Route path="/dashboard/servidor" element={<ServidorDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
