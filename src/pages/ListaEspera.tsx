
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ListaEspera = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState("todas");
  const [filterStatus, setFilterStatus] = useState("todos");

  const pacientesEspera = [
    {
      id: '1',
      nome: 'Carlos Mendes',
      telefone: '(11) 95555-5555',
      email: 'carlos.mendes@email.com',
      dataInclusao: '2024-01-10',
      prioridade: 'alta',
      status: 'aguardando',
      motivoConsulta: 'Ansiedade e ataques de pânico',
      observacoes: 'Paciente relata urgência no atendimento',
      tempoEspera: 5,
      preferencias: {
        modalidade: 'presencial',
        periodo: 'manha',
        dias: ['segunda', 'quarta']
      }
    },
    {
      id: '2',
      nome: 'Luciana Oliveira',
      telefone: '(11) 94444-4444',
      email: 'luciana.oliveira@email.com',
      dataInclusao: '2024-01-12',
      prioridade: 'media',
      status: 'contatado',
      motivoConsulta: 'Depressão pós-parto',
      observacoes: 'Indicação médica do obstetra',
      tempoEspera: 3,
      preferencias: {
        modalidade: 'online',
        periodo: 'tarde',
        dias: ['terca', 'quinta']
      }
    },
    {
      id: '3',
      nome: 'Roberto Silva',
      telefone: '(11) 93333-3333',
      email: 'roberto.silva@email.com',
      dataInclusao: '2024-01-15',
      prioridade: 'urgente',
      status: 'agendado',
      motivoConsulta: 'Ideação suicida',
      observacoes: 'URGENTE - Risco alto, agendar o quanto antes',
      tempoEspera: 1,
      preferencias: {
        modalidade: 'presencial',
        periodo: 'qualquer',
        dias: ['qualquer']
      }
    },
    {
      id: '4',
      nome: 'Fernanda Costa',
      telefone: '(11) 92222-2222',
      email: 'fernanda.costa@email.com',
      dataInclusao: '2024-01-08',
      prioridade: 'baixa',
      status: 'aguardando',
      motivoConsulta: 'Terapia de casal',
      observacoes: 'Casal busca terapia preventiva',
      tempoEspera: 7,
      preferencias: {
        modalidade: 'presencial',
        periodo: 'noite',
        dias: ['sexta']
      }
    }
  ];

  const getPrioridadeColor = (prioridade) => {
    const colors = {
      'urgente': 'bg-red-100 text-red-800 border-red-200',
      'alta': 'bg-orange-100 text-orange-800 border-orange-200',
      'media': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'baixa': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[prioridade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status) => {
    const colors = {
      'aguardando': 'bg-gray-100 text-gray-800 border-gray-200',
      'contatado': 'bg-blue-100 text-blue-800 border-blue-200',
      'agendado': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredPacientes = pacientesEspera.filter(paciente => {
    const matchesSearch = paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paciente.telefone.includes(searchTerm);
    const matchesPrioridade = filterPrioridade === 'todas' || paciente.prioridade === filterPrioridade;
    const matchesStatus = filterStatus === 'todos' || paciente.status === filterStatus;
    return matchesSearch && matchesPrioridade && matchesStatus;
  });

  const agendarPaciente = (pacienteId) => {
    console.log('Agendar paciente:', pacienteId);
    navigate('/app/agendamentos/novo', { state: { pacienteId } });
  };

  const contatarPaciente = (paciente) => {
    console.log('Contatar paciente:', paciente);
    // Aqui integraria com sistema de comunicação
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/app/dashboard/psicologo')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lista de Espera</h1>
            <p className="text-gray-600">Gerenciar pacientes aguardando atendimento</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar à Lista
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Paciente à Lista de Espera</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input placeholder="Nome do paciente" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prioridade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Modalidade Preferida</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Presencial/Online" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="ambas">Ambas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Motivo da Consulta</Label>
                <Textarea placeholder="Descreva o motivo da consulta..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar à Lista</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total na Lista</p>
                <p className="text-2xl font-bold">{pacientesEspera.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-600">
                  {pacientesEspera.filter(p => p.prioridade === 'urgente').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Já Agendados</p>
                <p className="text-2xl font-bold text-green-600">
                  {pacientesEspera.filter(p => p.status === 'agendado').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Médio (dias)</p>
                <p className="text-2xl font-bold">
                  {Math.round(pacientesEspera.reduce((acc, p) => acc + p.tempoEspera, 0) / pacientesEspera.length)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as prioridades</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="contatado">Contatado</SelectItem>
                <SelectItem value="agendado">Agendado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <div className="space-y-4">
        {filteredPacientes.map((paciente) => (
          <Card key={paciente.id} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {paciente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{paciente.nome}</h3>
                        <p className="text-gray-600">{paciente.motivoConsulta}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`${getPrioridadeColor(paciente.prioridade)} border`}>
                          {paciente.prioridade}
                        </Badge>
                        <Badge className={`${getStatusColor(paciente.status)} border`}>
                          {paciente.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{paciente.telefone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{paciente.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{paciente.tempoEspera} dias na lista</span>
                      </div>
                    </div>

                    {paciente.observacoes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{paciente.observacoes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Preferências:</span>
                      <Badge variant="outline">{paciente.preferencias.modalidade}</Badge>
                      <Badge variant="outline">{paciente.preferencias.periodo}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    size="sm" 
                    onClick={() => agendarPaciente(paciente.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Agendar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => contatarPaciente(paciente)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Contatar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPacientes.length === 0 && (
        <Card className="bg-white">
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-gray-500">
              Não há pacientes na lista de espera com os filtros selecionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListaEspera;
