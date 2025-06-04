
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Heart, 
  Search, 
  Filter,
  Plus,
  FileText,
  Calendar,
  BarChart3,
  Download
} from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';

const MedicalRecordsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<ComprehensivePatient | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    psychologist: 'all',
    diagnosis: 'all'
  });

  // Mock data - Em produção viria do backend
  const patients: Partial<ComprehensivePatient>[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      age: 34,
      phone: '(11) 99999-9999',
      email: 'maria.santos@email.com',
      status: 'active',
      priority: 'medium',
      totalSessions: 12,
      averageMood: 7.2,
      adherenceRate: 85,
      lastAppointment: '2024-01-15',
      treatmentPlan: {
        id: '1',
        diagnosis: ['Transtorno de Ansiedade Generalizada', 'Episódio Depressivo Leve'],
        objectives: [],
        techniques: [],
        frequency: '',
        duration: '',
        riskLevel: 'medium'
      }
    },
    {
      id: '2',
      name: 'João Pedro Costa',
      age: 28,
      phone: '(11) 88888-8888',
      email: 'joao.costa@email.com',
      status: 'active',
      priority: 'high',
      totalSessions: 8,
      averageMood: 4.5,
      adherenceRate: 92,
      lastAppointment: '2024-01-14',
      treatmentPlan: {
        id: '2',
        diagnosis: ['Transtorno Depressivo Maior', 'Ideação Suicida'],
        objectives: [],
        techniques: [],
        frequency: '',
        duration: '',
        riskLevel: 'high'
      }
    },
    {
      id: '3',
      name: 'Ana Beatriz Lima',
      age: 22,
      phone: '(11) 77777-7777',
      email: 'ana.lima@email.com',
      status: 'active',
      priority: 'low',
      totalSessions: 24,
      averageMood: 8.1,
      adherenceRate: 78,
      lastAppointment: '2024-01-13',
      treatmentPlan: {
        id: '3',
        diagnosis: ['Transtorno de Personalidade Borderline'],
        objectives: [],
        techniques: [],
        frequency: '',
        duration: '',
        riskLevel: 'medium'
      }
    },
    {
      id: '4',
      name: 'Carlos Eduardo Ferreira',
      age: 45,
      phone: '(11) 66666-6666',
      email: 'carlos.ferreira@email.com',
      status: 'discharged',
      priority: 'low',
      totalSessions: 36,
      averageMood: 8.8,
      adherenceRate: 94,
      lastAppointment: '2024-01-10',
      treatmentPlan: {
        id: '4',
        diagnosis: ['Transtorno de Pânico - Remissão'],
        objectives: [],
        techniques: [],
        frequency: '',
        duration: '',
        riskLevel: 'low'
      }
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || patient.status === filters.status;
    const matchesPriority = filters.priority === 'all' || patient.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStats = () => {
    const totalPatients = patients.length;
    const activePatients = patients.filter(p => p.status === 'active').length;
    const highPriorityPatients = patients.filter(p => p.priority === 'high').length;
    const averageImprovement = patients.reduce((acc, p) => acc + (p.averageMood || 0), 0) / patients.length;
    
    return {
      total: totalPatients,
      active: activePatients,
      highPriority: highPriorityPatients,
      avgImprovement: averageImprovement.toFixed(1)
    };
  };

  const stats = getStats();

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'discharged': return 'bg-green-100 text-green-800 border-green-200';
      case 'dropped-out': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prontuários Médicos</h1>
          <p className="text-gray-600">Sistema completo de gestão de prontuários</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Prontuário
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pacientes Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alta Prioridade</p>
                <p className="text-2xl font-bold text-orange-600">{stats.highPriority}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humor Médio</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgImprovement}/10</p>
              </div>
              <Heart className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email ou diagnóstico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="discharged">Alta</SelectItem>
                  <SelectItem value="dropped-out">Abandono</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pacientes ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedPatient?.id === patient.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => setSelectedPatient(patient as ComprehensivePatient)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {patient.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{patient.name}</h3>
                    <p className="text-xs text-gray-500">{patient.age} anos</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${getStatusColor(patient.status || '')}`}>
                        {patient.status}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(patient.priority || '')}`}>
                        {patient.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Sessões: {patient.totalSessions}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{patient.averageMood}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card className="lg:col-span-2">
          {selectedPatient ? (
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {selectedPatient.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                      <p className="text-gray-500">
                        {selectedPatient.treatmentPlan?.diagnosis[0] || 'Sem diagnóstico'}
                      </p>
                    </div>
                  </div>
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Prontuário Completo
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Resumo</TabsTrigger>
                    <TabsTrigger value="sessions">Sessões</TabsTrigger>
                    <TabsTrigger value="progress">Progresso</TabsTrigger>
                    <TabsTrigger value="alerts">Alertas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Telefone</label>
                        <p className="text-sm text-gray-600">{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-gray-600">{selectedPatient.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Última Consulta</label>
                        <p className="text-sm text-gray-600">
                          {selectedPatient.lastAppointment ? 
                            new Date(selectedPatient.lastAppointment).toLocaleDateString('pt-BR') : 
                            'Não registrado'
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Aderência</label>
                        <p className="text-sm text-gray-600">{selectedPatient.adherenceRate}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Diagnósticos</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPatient.treatmentPlan?.diagnosis.map((diagnosis, index) => (
                          <Badge key={index} variant="outline">
                            {diagnosis}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sessions" className="mt-6">
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Histórico de Sessões
                      </h3>
                      <p className="text-gray-500">
                        {selectedPatient.totalSessions} sessões realizadas
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="progress" className="mt-6">
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Gráficos de Progresso
                      </h3>
                      <p className="text-gray-500">
                        Evolução do humor: {selectedPatient.averageMood}/10
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alerts" className="mt-6">
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Sistema de Alertas
                      </h3>
                      <p className="text-gray-500">
                        Nenhum alerta ativo no momento
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione um Paciente
                </h3>
                <p className="text-gray-500">
                  Escolha um paciente para visualizar os detalhes do prontuário
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MedicalRecordsDashboard;
