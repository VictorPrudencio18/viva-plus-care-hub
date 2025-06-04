
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Clock
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
      observacoes: "Paciente apresenta sinais de ansiedade relacionada ao trabalho."
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
      observacoes: "Boa evolução no tratamento. Paciente engajada."
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
      'critico': 'bg-red-100 text-red-800',
      'acompanhamento': 'bg-yellow-100 text-yellow-800',
      'ativo': 'bg-blue-100 text-blue-800',
      'estavel': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Pacientes</h1>
          <p className="text-gray-600">Acompanhe o progresso dos seus pacientes</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nome">Nome Completo</label>
                  <Input id="nome" placeholder="Nome do paciente" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="email@empresa.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="telefone">Telefone</label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="departamento">Departamento</label>
                  <Input id="departamento" placeholder="Departamento" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Paciente</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Total de Pacientes</h3>
            <p className="text-2xl font-bold">{pacientes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Casos Críticos</h3>
            <p className="text-2xl font-bold text-red-600">
              {pacientes.filter(p => p.status === 'critico').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Em Acompanhamento</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {pacientes.filter(p => p.status === 'acompanhamento').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Estáveis</h3>
            <p className="text-2xl font-bold text-green-600">
              {pacientes.filter(p => p.status === 'estavel').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente por nome ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
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

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPacientes.map((paciente) => (
          <Card
            key={paciente.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPaciente(paciente)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={paciente.avatar} />
                    <AvatarFallback>
                      {paciente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getPrioridadeColor(paciente.prioridade)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{paciente.nome}</h3>
                  <p className="text-sm text-gray-600">{paciente.departamento}</p>
                </div>
                <Badge className={getStatusColor(paciente.status)}>
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
                  <span>Progresso</span>
                  <span>{paciente.sessoes} sessões</span>
                </div>
                <Progress value={(paciente.sessoes / 20) * 100} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Próxima: {new Date(paciente.proximaConsulta).toLocaleDateString('pt-BR')}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Agendar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  Prontuário
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Detalhes do Paciente */}
      {selectedPaciente && (
        <Dialog open={!!selectedPaciente} onOpenChange={() => setSelectedPaciente(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Paciente</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="resumo" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="evolucao">Evolução</TabsTrigger>
                <TabsTrigger value="acoes">Ações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="resumo" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedPaciente.avatar} />
                    <AvatarFallback>
                      {selectedPaciente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedPaciente.nome}</h3>
                    <p className="text-gray-600">{selectedPaciente.cargo} - {selectedPaciente.departamento}</p>
                    <Badge className={getStatusColor(selectedPaciente.status)}>
                      {selectedPaciente.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Email</span>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedPaciente.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Telefone</span>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedPaciente.telefone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium">Observações</span>
                  <p className="text-sm text-gray-600 mt-1">{selectedPaciente.observacoes}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className={`w-8 h-8 mx-auto mb-2 ${getHumorColor(selectedPaciente.humorMedio)}`} />
                      <p className="text-sm text-gray-600">Humor Médio</p>
                      <p className={`text-xl font-bold ${getHumorColor(selectedPaciente.humorMedio)}`}>
                        {selectedPaciente.humorMedio}/10
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600">Sessões</p>
                      <p className="text-xl font-bold">{selectedPaciente.sessoes}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm text-gray-600">Próxima Consulta</p>
                      <p className="text-sm font-medium">
                        {new Date(selectedPaciente.proximaConsulta).toLocaleDateString('pt-BR')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="historico">
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Histórico de Consultas
                  </h3>
                  <p className="text-gray-500">
                    Histórico detalhado das sessões aparecerá aqui
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="evolucao">
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Gráfico de Evolução
                  </h3>
                  <p className="text-gray-500">
                    Evolução do humor e progresso terapêutico
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="acoes">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col gap-2">
                    <Calendar className="w-6 h-6" />
                    Agendar Consulta
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <FileText className="w-6 h-6" />
                    Ver Prontuário
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Mail className="w-6 h-6" />
                    Enviar Mensagem
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <AlertTriangle className="w-6 h-6" />
                    Marcar Urgente
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Pacientes;
