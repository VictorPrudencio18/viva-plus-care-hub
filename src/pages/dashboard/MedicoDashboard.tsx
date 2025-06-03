
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, FileText, Users, Stethoscope, Clock } from "lucide-react";

const MedicoDashboard = () => {
  const consultasHoje = [
    { paciente: "José Silva", hora: "08:30", tipo: "Consulta de Rotina", prioridade: "normal" },
    { paciente: "Ana Costa", hora: "09:15", tipo: "Retorno", prioridade: "normal" },
    { paciente: "Carlos Oliveira", hora: "10:00", tipo: "Urgência", prioridade: "alta" },
    { paciente: "Maria Santos", hora: "14:30", tipo: "Telemedicina", prioridade: "normal" },
  ];

  const examesPendentes = [
    { paciente: "Pedro Alves", exame: "Hemograma Completo", data: "2024-01-15" },
    { paciente: "Lucia Ferreira", exame: "Raio-X Tórax", data: "2024-01-16" },
    { paciente: "Roberto Silva", exame: "Eletrocardiograma", data: "2024-01-17" },
  ];

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Médico</h1>
        <p className="text-gray-600">Visão geral dos seus pacientes e consultas médicas</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes do Dia</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 consultas, 8 retornos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Restantes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              próxima às 14:30
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exames Pendentes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              aguardando resultado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telemedicina</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              consultas online hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultas do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Consultas de Hoje
            </CardTitle>
            <CardDescription>
              Sua agenda médica para hoje
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultasHoje.map((consulta, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{consulta.paciente}</p>
                  <p className="text-sm text-gray-500">{consulta.tipo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{consulta.hora}</Badge>
                  <Badge className={getPrioridadeColor(consulta.prioridade)}>
                    {consulta.prioridade}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              Ver Agenda Completa
            </Button>
          </CardContent>
        </Card>

        {/* Exames Pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Exames Pendentes
            </CardTitle>
            <CardDescription>
              Resultados de exames aguardando avaliação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {examesPendentes.map((exame, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{exame.paciente}</p>
                  <p className="text-sm text-gray-500">{exame.exame}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(exame.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              Ver Todos os Exames
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às funcionalidades médicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              Nova Receita
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Activity className="w-6 h-6" />
              Solicitar Exame
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Stethoscope className="w-6 h-6" />
              Iniciar Teleconsulta
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              Lista de Pacientes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicoDashboard;
