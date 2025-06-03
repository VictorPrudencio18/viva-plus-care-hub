
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, TrendingUp, Clock, AlertCircle } from "lucide-react";

const PsicologoDashboard = () => {
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
            <Button className="w-full mt-4" variant="outline">
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
            <Button className="w-full mt-4" variant="outline">
              Ver Todos os Pacientes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              Novo Prontuário
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Calendar className="w-6 h-6" />
              Agendar Consulta
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              Lista de Espera
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <TrendingUp className="w-6 h-6" />
              Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsicologoDashboard;
