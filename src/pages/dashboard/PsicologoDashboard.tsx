
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, TrendingUp, Clock, AlertCircle, Plus, UserPlus, CalendarPlus, ClipboardList, BarChart3 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PsicologoDashboard = () => {
  const navigate = useNavigate();

  const pacientesRecentes = [
    { nome: "João Silva", ultimaConsulta: "2024-01-10", status: "acompanhamento", humor: 7 },
    { nome: "Maria Santos", ultimaConsulta: "2024-01-12", status: "primeira_consulta", humor: 4 },
    { nome: "Pedro Costa", ultimaConsulta: "2024-01-14", status: "retorno", humor: 8 },
  ];

  const agendamentosHoje = [
    { paciente: "Ana Oliveira", hora: "09:00", tipo: "Plantão Psicológico" },
    { paciente: "Carlos Ferreira", hora: "14:30", tipo: "Psicoterapia Breve" },
    { paciente: "Lucia Mendes", hora: "16:00", tipo: "Avaliação" },
  ];

  const acoesRapidas = [
    {
      titulo: "Novo Prontuário",
      descricao: "Criar prontuário para novo paciente",
      icone: FileText,
      cor: "bg-blue-600 hover:bg-blue-700",
      rota: "/prontuarios/novo"
    },
    {
      titulo: "Agendar Consulta",
      descricao: "Agendar nova consulta ou retorno",
      icone: CalendarPlus,
      cor: "bg-green-600 hover:bg-green-700",
      rota: "/agendamentos/novo"
    },
    {
      titulo: "Lista de Espera",
      descricao: "Gerenciar pacientes em espera",
      icone: Users,
      cor: "bg-purple-600 hover:bg-purple-700",
      rota: "/lista-espera"
    },
    {
      titulo: "Relatórios",
      descricao: "Gerar relatórios e estatísticas",
      icone: BarChart3,
      cor: "bg-orange-600 hover:bg-orange-700",
      rota: "/relatorios"
    },
    {
      titulo: "Avaliação Rápida",
      descricao: "Aplicar escalas e questionários",
      icone: ClipboardList,
      cor: "bg-teal-600 hover:bg-teal-700",
      rota: "/avaliacoes"
    },
    {
      titulo: "Cadastro Paciente",
      descricao: "Cadastrar novo paciente no sistema",
      icone: UserPlus,
      cor: "bg-indigo-600 hover:bg-indigo-700",
      rota: "/pacientes/novo"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Psicólogo</h1>
        <p className="text-gray-600">Visão geral dos seus pacientes e atendimentos</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +4 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 presenciais, 2 online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas de Humor</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              requerem atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Melhoria</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78%</div>
            <p className="text-xs text-muted-foreground">
              pacientes com evolução positiva
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agendamentos do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Agendamentos de Hoje
            </CardTitle>
            <CardDescription>
              Suas consultas programadas para hoje
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agendamentosHoje.map((agendamento, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{agendamento.paciente}</p>
                  <p className="text-sm text-gray-500">{agendamento.tipo}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{agendamento.hora}</Badge>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/agendamentos')}>
              Ver Agenda Completa
            </Button>
          </CardContent>
        </Card>

        {/* Pacientes Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Pacientes Recentes
            </CardTitle>
            <CardDescription>
              Últimos pacientes atendidos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pacientesRecentes.map((paciente, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{paciente.nome}</p>
                  <p className="text-sm text-gray-500">
                    Última consulta: {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={paciente.status === 'primeira_consulta' ? 'default' : 'secondary'}>
                    {paciente.status === 'primeira_consulta' ? 'Primeira' : 
                     paciente.status === 'acompanhamento' ? 'Acompanhamento' : 'Retorno'}
                  </Badge>
                  <div className="text-sm">
                    Humor: <span className="font-medium">{paciente.humor}/10</span>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/pacientes')}>
              Ver Todos os Pacientes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas Expandidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {acoesRapidas.map((acao, index) => (
              <Button
                key={index}
                className={`h-24 flex flex-col gap-2 text-white ${acao.cor}`}
                onClick={() => navigate(acao.rota)}
              >
                <acao.icone className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">{acao.titulo}</div>
                  <div className="text-xs opacity-90">{acao.descricao}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsicologoDashboard;
