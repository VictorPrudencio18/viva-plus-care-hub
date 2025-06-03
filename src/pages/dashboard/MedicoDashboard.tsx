
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, FileText, Users, Stethoscope, Clock, Heart, Brain, Sparkles } from "lucide-react";

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
      case 'alta': return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      case 'media': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default: return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-therapeutic p-6 space-y-8">
      {/* Header Moderno */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-primary shadow-xl">
          <Stethoscope className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Dashboard Médico
          </h1>
          <p className="text-xl text-gray-600">Visão geral dos seus pacientes e consultas médicas</p>
        </div>
      </div>

      {/* Métricas Modernizadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-0 rounded-2xl shadow-2xl hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pacientes do Dia</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">12</div>
            <p className="text-sm text-gray-600 mt-1">
              4 consultas, 8 retornos
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 rounded-2xl shadow-2xl hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Consultas Restantes</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">7</div>
            <p className="text-sm text-gray-600 mt-1">
              próxima às 14:30
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 rounded-2xl shadow-2xl hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Exames Pendentes</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">8</div>
            <p className="text-sm text-gray-600 mt-1">
              aguardando resultado
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 rounded-2xl shadow-2xl hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Telemedicina</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600">
              <Heart className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">3</div>
            <p className="text-sm text-gray-600 mt-1">
              consultas online hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Consultas do Dia */}
        <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              Consultas de Hoje
            </CardTitle>
            <CardDescription className="text-base">
              Sua agenda médica para hoje
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultasHoje.map((consulta, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-calm hover-lift transition-all duration-300">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">{consulta.paciente}</p>
                  <p className="text-sm text-gray-600">{consulta.tipo}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-white/80 border-gray-200 px-3 py-1">
                    {consulta.hora}
                  </Badge>
                  <Badge className={`${getPrioridadeColor(consulta.prioridade)} px-3 py-1`}>
                    {consulta.prioridade}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full mt-6 bg-gradient-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl py-3">
              Ver Agenda Completa
            </Button>
          </CardContent>
        </Card>

        {/* Exames Pendentes */}
        <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600">
                <Activity className="w-6 h-6 text-white" />
              </div>
              Exames Pendentes
            </CardTitle>
            <CardDescription className="text-base">
              Resultados de exames aguardando avaliação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {examesPendentes.map((exame, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-calm hover-lift transition-all duration-300">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">{exame.paciente}</p>
                  <p className="text-sm text-gray-600">{exame.exame}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(exame.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full mt-6 bg-gradient-secondary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl py-3">
              Ver Todos os Exames
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas Modernizadas */}
      <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Sparkles className="w-7 h-7 text-blue-500" />
            Ações Rápidas
          </CardTitle>
          <CardDescription className="text-lg">
            Acesso rápido às funcionalidades médicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button className="h-24 flex flex-col gap-3 bg-gradient-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
              <FileText className="w-8 h-8" />
              <span className="font-semibold">Nova Receita</span>
            </Button>
            <Button className="h-24 flex flex-col gap-3 bg-gradient-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
              <Activity className="w-8 h-8" />
              <span className="font-semibold">Solicitar Exame</span>
            </Button>
            <Button className="h-24 flex flex-col gap-3 bg-gradient-to-r from-purple-400 to-purple-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
              <Brain className="w-8 h-8" />
              <span className="font-semibold">Teleconsulta</span>
            </Button>
            <Button className="h-24 flex flex-col gap-3 bg-gradient-to-r from-pink-400 to-pink-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
              <Users className="w-8 h-8" />
              <span className="font-semibold">Lista Pacientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicoDashboard;
