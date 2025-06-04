
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Plus, 
  Calendar, 
  Heart, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  User,
  Phone,
  Mail,
  FileText,
  Clock,
  Edit,
  Printer,
  History,
  Brain,
  Target
} from "lucide-react";

// Import components and data
import PatientAssessments from '@/components/patient-management/PatientAssessments';
import TreatmentPlanManager from '@/components/patient-management/TreatmentPlanManager';
import SessionManager from '@/components/patient-management/SessionManager';
import { complexPatients } from '@/data/complexPatients';
import { ComplexPatient } from '@/types/patient';

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState<ComplexPatient | null>(null);
  const [filterStatus, setFilterStatus] = useState("todos");

  const filteredPacientes = complexPatients.filter(paciente => {
    const matchesSearch = paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paciente.cpf.includes(searchTerm);
    const matchesStatus = filterStatus === "todos" || paciente.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'inactive': 'bg-gray-100 text-gray-800 border-gray-200',
      'discharged': 'bg-blue-100 text-blue-800 border-blue-200',
      'dropped-out': 'bg-red-100 text-red-800 border-red-200',
      'referred': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      'urgent': 'bg-red-500',
      'high': 'bg-orange-500',
      'medium': 'bg-yellow-500',
      'low': 'bg-green-500'
    };
    return colors[prioridade] || 'bg-gray-500';
  };

  const getHumorColor = (humor: number) => {
    if (humor <= 3) return 'text-red-600';
    if (humor <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskLevelColor = (level: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800 border-green-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'high': 'bg-orange-100 text-orange-800 border-orange-200',
      'critical': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema Avançado de Pacientes</h1>
          <p className="text-gray-600">Gestão completa e profissional dos seus pacientes</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nome">Nome Completo</label>
                  <Input id="nome" placeholder="Nome do paciente" className="bg-white border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="email@empresa.com" className="bg-white border-gray-300" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="telefone">Telefone</label>
                  <Input id="telefone" placeholder="(00) 00000-0000" className="bg-white border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cpf">CPF</label>
                  <Input id="cpf" placeholder="000.000.000-00" className="bg-white border-gray-300" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Adicionar Paciente</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas Avançadas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Pacientes</h3>
            <p className="text-2xl font-bold text-gray-900">{complexPatients.length}</p>
            <p className="text-xs text-green-600 mt-1">+2 este mês</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Pacientes Ativos</h3>
            <p className="text-2xl font-bold text-green-600">
              {complexPatients.filter(p => p.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Alta Prioridade</h3>
            <p className="text-2xl font-bold text-orange-600">
              {complexPatients.filter(p => p.priority === 'high' || p.priority === 'urgent').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Taxa de Melhora</h3>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(complexPatients.reduce((acc, p) => acc + p.improvementRate, 0) / complexPatients.length)}%
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Sessões Totais</h3>
            <p className="text-2xl font-bold text-purple-600">
              {complexPatients.reduce((acc, p) => acc + p.totalSessions, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros Avançados */}
      <Card className="bg-white border-gray-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 z-50">
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="discharged">Alta</SelectItem>
                <SelectItem value="dropped-out">Abandono</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes com ScrollArea */}
      <div className="h-[60vh]">
        <ScrollArea className="h-full w-full pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPacientes.map((paciente) => (
              <Card
                key={paciente.id}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-gray-200"
                onClick={() => setSelectedPaciente(paciente)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={paciente.avatar} />
                        <AvatarFallback className="bg-gray-100 text-gray-700">
                          {paciente.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getPrioridadeColor(paciente.priority)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-gray-900">{paciente.name}</h3>
                      <p className="text-sm text-gray-600">{paciente.occupation}</p>
                    </div>
                    <Badge className={`${getStatusColor(paciente.status)} border`}>
                      {paciente.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Diagnóstico */}
                  {paciente.treatmentPlan?.diagnosis && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Diagnóstico:</p>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        {paciente.treatmentPlan.diagnosis[0]?.split(' - ')[0] || 'Não definido'}
                      </Badge>
                    </div>
                  )}

                  {/* Humor e Progresso */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Humor Médio</span>
                    <div className="flex items-center gap-2">
                      <Heart className={`w-4 h-4 ${getHumorColor(paciente.averageMood)}`} />
                      <span className={`font-medium ${getHumorColor(paciente.averageMood)}`}>
                        {paciente.averageMood.toFixed(1)}/10
                      </span>
                      {paciente.improvementRate > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Taxa de Melhora */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Taxa de Melhora</span>
                      <span className="text-gray-900">{paciente.improvementRate}%</span>
                    </div>
                    <Progress value={paciente.improvementRate} className="h-2" />
                  </div>

                  {/* Sessões e Próxima Consulta */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{paciente.totalSessions} sessões realizadas</span>
                    </div>
                    {paciente.lastAppointment && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Última: {new Date(paciente.lastAppointment).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>

                  {/* Nível de Risco */}
                  {paciente.treatmentPlan?.riskLevel && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-gray-500" />
                      <Badge className={`${getRiskLevelColor(paciente.treatmentPlan.riskLevel)} border text-xs`}>
                        Risco {paciente.treatmentPlan.riskLevel}
                      </Badge>
                    </div>
                  )}

                  {/* Ações Rápidas */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-gray-300">
                      <Calendar className="w-4 h-4 mr-1" />
                      Agendar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-gray-300">
                      <FileText className="w-4 h-4 mr-1" />
                      Prontuário
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Dialog de Detalhes Avançado do Paciente */}
      {selectedPaciente && (
        <Dialog open={!!selectedPaciente} onOpenChange={() => setSelectedPaciente(null)}>
          <DialogContent className="sm:max-w-[95vw] h-[90vh] flex flex-col bg-white border-gray-200">
            <DialogHeader className="pb-4 border-b border-gray-200 flex-shrink-0">
              <DialogTitle className="text-xl text-gray-900">Prontuário Completo - Sistema Avançado</DialogTitle>
            </DialogHeader>
            
            {/* Header do Paciente - Fixed */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 flex-shrink-0">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedPaciente.avatar} />
                <AvatarFallback className="text-lg font-semibold bg-gray-100 text-gray-700">
                  {selectedPaciente.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{selectedPaciente.name}</h3>
                <p className="text-gray-600">{selectedPaciente.occupation} • {selectedPaciente.age} anos</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getStatusColor(selectedPaciente.status)} border`}>
                    {selectedPaciente.status}
                  </Badge>
                  <Badge className={`${getRiskLevelColor(selectedPaciente.treatmentPlan?.riskLevel || 'low')} border`}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Risco {selectedPaciente.treatmentPlan?.riskLevel || 'baixo'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    ID: #{selectedPaciente.id.padStart(4, '0')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-300">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300">
                  <Printer className="w-4 h-4 mr-1" />
                  Imprimir
                </Button>
              </div>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-4 gap-4 flex-shrink-0">
              <Card className="border-l-4 border-l-blue-400 bg-white">
                <CardContent className="p-3 text-center">
                  <Heart className={`w-6 h-6 mx-auto mb-1 ${getHumorColor(selectedPaciente.averageMood)}`} />
                  <p className="text-xs text-gray-600">Humor Médio</p>
                  <p className={`text-lg font-bold ${getHumorColor(selectedPaciente.averageMood)}`}>
                    {selectedPaciente.averageMood.toFixed(1)}/10
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-400 bg-white">
                <CardContent className="p-3 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-gray-600">Taxa de Melhora</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPaciente.improvementRate}%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-400 bg-white">
                <CardContent className="p-3 text-center">
                  <FileText className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs text-gray-600">Sessões Totais</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPaciente.totalSessions}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-400 bg-white">
                <CardContent className="p-3 text-center">
                  <Target className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs text-gray-600">Adesão</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPaciente.adherenceRate}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Avançadas com ScrollArea */}
            <Tabs defaultValue="resumo" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="grid w-full grid-cols-6 bg-gray-100 flex-shrink-0">
                <TabsTrigger value="resumo" className="data-[state=active]:bg-white">Resumo</TabsTrigger>
                <TabsTrigger value="avaliacoes" className="data-[state=active]:bg-white">Avaliações</TabsTrigger>
                <TabsTrigger value="plano" className="data-[state=active]:bg-white">Plano</TabsTrigger>
                <TabsTrigger value="sessoes" className="data-[state=active]:bg-white">Sessões</TabsTrigger>
                <TabsTrigger value="historico" className="data-[state=active]:bg-white">Histórico</TabsTrigger>
                <TabsTrigger value="documentos" className="data-[state=active]:bg-white">Documentos</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden mt-4">
                <TabsContent value="resumo" className="h-full m-0">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      {/* Dados Pessoais Expandidos */}
                      <Card className="border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                            <User className="w-5 h-5" />
                            Dados Pessoais Completos
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <span className="text-sm font-medium text-gray-500">Email</span>
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{selectedPaciente.email}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Telefone</span>
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{selectedPaciente.phone}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">CPF</span>
                              <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">{selectedPaciente.cpf}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium text-gray-500">Estado Civil</span>
                              <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">{selectedPaciente.maritalStatus}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Escolaridade</span>
                              <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">{selectedPaciente.education}</p>
                            </div>
                          </div>

                          {/* Endereço */}
                          <div>
                            <span className="text-sm font-medium text-gray-500">Endereço</span>
                            <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                              {selectedPaciente.address.street}, {selectedPaciente.address.city} - {selectedPaciente.address.state}, {selectedPaciente.address.zipCode}
                            </p>
                          </div>

                          {/* Contatos de Emergência */}
                          <div>
                            <span className="text-sm font-medium text-gray-500 mb-2 block">Contatos de Emergência</span>
                            <div className="space-y-2">
                              {selectedPaciente.contacts.map((contact) => (
                                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900">{contact.name}</p>
                                    <p className="text-sm text-gray-500">{contact.relationship} • {contact.phone}</p>
                                  </div>
                                  {contact.isEmergency && (
                                    <Badge className="bg-red-100 text-red-800 border-red-200">
                                      Emergência
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Histórico Médico */}
                      <Card className="border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                            <Brain className="w-5 h-5" />
                            Histórico Médico
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {selectedPaciente.medicalHistory.allergies.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Alergias</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedPaciente.medicalHistory.allergies.map((allergy, index) => (
                                  <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {selectedPaciente.medicalHistory.currentMedications.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Medicamentos Atuais</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedPaciente.medicalHistory.currentMedications.map((med, index) => (
                                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                                    {med}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="avaliacoes" className="h-full m-0">
                  <PatientAssessments 
                    assessments={selectedPaciente.assessments}
                    onAddAssessment={(assessment) => {
                      console.log('Adicionar avaliação:', assessment);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="plano" className="h-full m-0">
                  <TreatmentPlanManager 
                    treatmentPlan={selectedPaciente.treatmentPlan}
                    onUpdatePlan={(plan) => {
                      console.log('Atualizar plano:', plan);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="sessoes" className="h-full m-0">
                  <SessionManager 
                    sessions={selectedPaciente.sessions}
                    onAddSession={(session) => {
                      console.log('Adicionar sessão:', session);
                    }}
                    onUpdateSession={(sessionId, session) => {
                      console.log('Atualizar sessão:', sessionId, session);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="historico" className="h-full m-0">
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Histórico Completo
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Timeline completo de todas as interações, mudanças e evoluções
                    </p>
                    <Button variant="outline" className="border-gray-300">
                      Gerar Timeline Detalhado
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="documentos" className="h-full m-0">
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Central de Documentos
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Laudos, atestados, exames e documentos do paciente
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <Button variant="outline" className="border-gray-300">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Documento
                      </Button>
                      <Button variant="outline" className="border-gray-300">
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar Laudo
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Pacientes;
