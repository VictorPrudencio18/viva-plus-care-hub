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
  History
} from "lucide-react";

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [filterStatus, setFilterStatus] = useState("todos");

  const pacientes = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      telefone: "(11) 99999-9999",
      departamento: "TI",
      cargo: "Desenvolvedor",
      status: "acompanhamento",
      prioridade: "alta",
      humorMedio: 4,
      tendencia: "baixa",
      ultimaConsulta: "2024-01-15",
      proximaConsulta: "2024-01-22",
      sessoes: 8,
      avatar: "/placeholder.svg",
      observacoes: "Paciente apresenta sinais de ansiedade relacionada ao trabalho.",
      prontuario: {
        diagnostico: "Transtorno de Ansiedade Generalizada",
        tratamento: "Terapia Cognitivo-Comportamental",
        medicamentos: ["Sertralina 50mg", "Alprazolam 0,25mg"],
        evolucoes: [
          {
            data: "2024-01-15",
            profissional: "Dr. Maria Santos",
            tipo: "Consulta Psicológica",
            observacoes: "Paciente relata melhora nos sintomas de ansiedade. Demonstra maior capacidade de enfrentamento em situações de estresse no trabalho.",
            humor: 6
          },
          {
            data: "2024-01-08",
            profissional: "Dr. João Oliveira",
            tipo: "Consulta Médica",
            observacoes: "Ajuste de medicação. Paciente tolerando bem a sertralina. Redução gradual do alprazolam conforme planejado.",
            humor: 5
          },
          {
            data: "2024-01-01",
            profissional: "Dr. Maria Santos",
            tipo: "Consulta Psicológica",
            observacoes: "Início da terapia CBT. Paciente motivado para o tratamento. Estabelecidos objetivos terapêuticos.",
            humor: 4
          }
        ]
      }
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      telefone: "(11) 88888-8888",
      departamento: "RH",
      cargo: "Analista",
      status: "ativo",
      prioridade: "media",
      humorMedio: 7,
      tendencia: "alta",
      ultimaConsulta: "2024-01-12",
      proximaConsulta: "2024-01-19",
      sessoes: 5,
      avatar: "/placeholder.svg",
      observacoes: "Boa evolução no tratamento. Paciente engajada.",
      prontuario: {
        diagnostico: "Episódio Depressivo Leve",
        tratamento: "Psicoterapia de Apoio",
        medicamentos: [],
        evolucoes: [
          {
            data: "2024-01-12",
            profissional: "Dr. Maria Santos",
            tipo: "Consulta Psicológica",
            observacoes: "Excelente progresso. Paciente demonstra maior autoestima e motivação para atividades do dia a dia.",
            humor: 7
          }
        ]
      }
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro.costa@empresa.com",
      telefone: "(11) 77777-7777",
      departamento: "Vendas",
      cargo: "Gerente",
      status: "critico",
      prioridade: "urgente",
      humorMedio: 2,
      tendencia: "baixa",
      ultimaConsulta: "2024-01-14",
      proximaConsulta: "2024-01-16",
      sessoes: 12,
      avatar: "/placeholder.svg",
      observacoes: "Necessita acompanhamento intensivo. Sinais de burnout."
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      email: "ana.oliveira@empresa.com",
      telefone: "(11) 66666-6666",
      departamento: "Marketing",
      cargo: "Coordenadora",
      status: "estavel",
      prioridade: "baixa",
      humorMedio: 8,
      tendencia: "alta",
      ultimaConsulta: "2024-01-10",
      proximaConsulta: "2024-01-24",
      sessoes: 3,
      avatar: "/placeholder.svg",
      observacoes: "Paciente estável. Sessões de manutenção."
    }
  ];

  const filteredPacientes = pacientes.filter(paciente => {
    const matchesSearch = paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paciente.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || paciente.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'critico': 'bg-red-100 text-red-800 border-red-200',
      'acompanhamento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'ativo': 'bg-blue-100 text-blue-800 border-blue-200',
      'estavel': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      'urgente': 'bg-red-500',
      'alta': 'bg-orange-500',
      'media': 'bg-yellow-500',
      'baixa': 'bg-green-500'
    };
    return colors[prioridade] || 'bg-gray-500';
  };

  const getHumorColor = (humor: number) => {
    if (humor <= 3) return 'text-red-600';
    if (humor <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getTipoConsultaColor = (tipo: string) => {
    const colors = {
      'Consulta Psicológica': 'bg-blue-100 text-blue-800 border-blue-200',
      'Consulta Médica': 'bg-green-100 text-green-800 border-green-200',
      'Consulta Psiquiátrica': 'bg-purple-100 text-purple-800 border-purple-200',
      'Sessão Terapêutica': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Pacientes</h1>
          <p className="text-gray-600">Acompanhe o progresso dos seus pacientes</p>
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
                  <label htmlFor="departamento">Departamento</label>
                  <Input id="departamento" placeholder="Departamento" className="bg-white border-gray-300" />
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

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Total de Pacientes</h3>
            <p className="text-2xl font-bold text-gray-900">{pacientes.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Casos Críticos</h3>
            <p className="text-2xl font-bold text-red-600">
              {pacientes.filter(p => p.status === 'critico').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Em Acompanhamento</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {pacientes.filter(p => p.status === 'acompanhamento').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-600">Estáveis</h3>
            <p className="text-2xl font-bold text-green-600">
              {pacientes.filter(p => p.status === 'estavel').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="bg-white border-gray-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar paciente por nome ou departamento..."
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
                <SelectItem value="critico">Críticos</SelectItem>
                <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="estavel">Estáveis</SelectItem>
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
                          {paciente.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getPrioridadeColor(paciente.prioridade)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-gray-900">{paciente.nome}</h3>
                      <p className="text-sm text-gray-600">{paciente.departamento}</p>
                    </div>
                    <Badge className={`${getStatusColor(paciente.status)} border`}>
                      {paciente.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Humor Médio</span>
                    <div className="flex items-center gap-2">
                      <Heart className={`w-4 h-4 ${getHumorColor(paciente.humorMedio)}`} />
                      <span className={`font-medium ${getHumorColor(paciente.humorMedio)}`}>
                        {paciente.humorMedio}/10
                      </span>
                      {paciente.tendencia === 'alta' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso</span>
                      <span className="text-gray-900">{paciente.sessoes} sessões</span>
                    </div>
                    <Progress value={(paciente.sessoes / 20) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Próxima: {new Date(paciente.proximaConsulta).toLocaleDateString('pt-BR')}</span>
                  </div>

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

      {/* Dialog de Detalhes do Paciente com ScrollArea melhorado */}
      {selectedPaciente && (
        <Dialog open={!!selectedPaciente} onOpenChange={() => setSelectedPaciente(null)}>
          <DialogContent className="sm:max-w-[900px] h-[85vh] flex flex-col bg-white border-gray-200">
            <DialogHeader className="pb-4 border-b border-gray-200 flex-shrink-0">
              <DialogTitle className="text-xl text-gray-900">Prontuário Completo</DialogTitle>
            </DialogHeader>
            
            {/* Header do Paciente - Fixed */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 flex-shrink-0">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedPaciente.avatar} />
                <AvatarFallback className="text-lg font-semibold bg-gray-100 text-gray-700">
                  {selectedPaciente.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{selectedPaciente.nome}</h3>
                <p className="text-gray-600">{selectedPaciente.cargo} - {selectedPaciente.departamento}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getStatusColor(selectedPaciente.status)} border`}>
                    {selectedPaciente.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    ID: #{selectedPaciente.id.toString().padStart(4, '0')}
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

            {/* Tabs com ScrollArea */}
            <Tabs defaultValue="resumo" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 flex-shrink-0">
                <TabsTrigger value="resumo" className="data-[state=active]:bg-white">Resumo</TabsTrigger>
                <TabsTrigger value="prontuario" className="data-[state=active]:bg-white">Prontuário</TabsTrigger>
                <TabsTrigger value="evolucao" className="data-[state=active]:bg-white">Evolução</TabsTrigger>
                <TabsTrigger value="acoes" className="data-[state=active]:bg-white">Ações</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden mt-4">
                <TabsContent value="resumo" className="h-full m-0">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-gray-500">Email</span>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{selectedPaciente.email}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-gray-500">Telefone</span>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{selectedPaciente.telefone}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-500">Observações Gerais</span>
                        <p className="text-sm text-gray-700 mt-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          {selectedPaciente.observacoes}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Card className="border-l-4 border-l-orange-400 bg-white">
                          <CardContent className="p-4 text-center">
                            <Heart className={`w-8 h-8 mx-auto mb-2 ${getHumorColor(selectedPaciente.humorMedio)}`} />
                            <p className="text-sm text-gray-600">Humor Médio</p>
                            <p className={`text-xl font-bold ${getHumorColor(selectedPaciente.humorMedio)}`}>
                              {selectedPaciente.humorMedio}/10
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-blue-400 bg-white">
                          <CardContent className="p-4 text-center">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm text-gray-600">Sessões Realizadas</p>
                            <p className="text-xl font-bold text-gray-900">{selectedPaciente.sessoes}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-purple-400 bg-white">
                          <CardContent className="p-4 text-center">
                            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <p className="text-sm text-gray-600">Próxima Consulta</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(selectedPaciente.proximaConsulta).toLocaleDateString('pt-BR')}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="prontuario" className="h-full m-0">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                      <Card className="bg-white border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                            <FileText className="w-5 h-5" />
                            Informações Clínicas
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Diagnóstico Principal</h4>
                              <p className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                {selectedPaciente.prontuario?.diagnostico || "Não informado"}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Tratamento Atual</h4>
                              <p className="text-sm text-gray-700 p-3 bg-green-50 rounded-lg border border-green-200">
                                {selectedPaciente.prontuario?.tratamento || "Não informado"}
                              </p>
                            </div>
                          </div>
                          
                          {selectedPaciente.prontuario?.medicamentos && selectedPaciente.prontuario.medicamentos.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Medicamentos Prescritos</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedPaciente.prontuario.medicamentos.map((med, index) => (
                                  <Badge key={index} className="bg-purple-100 text-purple-800 border border-purple-200">
                                    {med}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="bg-white border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                            <History className="w-5 h-5" />
                            Evoluções Clínicas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="max-h-96">
                            <ScrollArea className="h-full pr-4">
                              <div className="space-y-4">
                                {selectedPaciente.prontuario?.evolucoes?.map((evolucao, index) => (
                                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-start mb-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                          <User className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-gray-900">{evolucao.profissional}</p>
                                          <div className="flex items-center gap-2">
                                            <Badge className={`${getTipoConsultaColor(evolucao.tipo)} border`}>
                                              {evolucao.tipo}
                                            </Badge>
                                            <span className="text-sm text-gray-500">{evolucao.data}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Heart className={`w-4 h-4 ${getHumorColor(evolucao.humor)}`} />
                                        <span className={`text-sm font-medium ${getHumorColor(evolucao.humor)}`}>
                                          {evolucao.humor}/10
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      {evolucao.observacoes}
                                    </p>
                                  </div>
                                )) || (
                                  <p className="text-center text-gray-500 py-8">
                                    Nenhuma evolução registrada
                                  </p>
                                )}
                              </div>
                            </ScrollArea>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="evolucao" className="h-full m-0">
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Gráfico de Evolução
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Visualização da evolução do humor e progresso terapêutico ao longo do tempo
                    </p>
                    <Button variant="outline" className="border-gray-300">
                      Gerar Relatório de Evolução
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="acoes" className="h-full m-0">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                      <Calendar className="w-6 h-6" />
                      <span>Agendar Consulta</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 border-gray-300" variant="outline">
                      <FileText className="w-6 h-6" />
                      <span>Nova Evolução</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 border-gray-300" variant="outline">
                      <Mail className="w-6 h-6" />
                      <span>Enviar Mensagem</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 border-gray-300" variant="outline">
                      <AlertTriangle className="w-6 h-6" />
                      <span>Marcar Urgente</span>
                    </Button>
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
