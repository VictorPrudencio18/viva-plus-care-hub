
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Search, Plus, Calendar, User, Heart, AlertCircle } from "lucide-react";

const Prontuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const pacientes = [
    {
      id: 1,
      nome: "João Silva",
      cpf: "123.456.789-00",
      idade: 35,
      telefone: "(11) 99999-9999",
      ultimaConsulta: "2024-01-15",
      status: "ativo",
      humorMedio: 7,
      avatar: "/placeholder.svg",
      diagnostico: "Ansiedade Generalizada",
      observacoes: "Paciente apresenta melhora significativa desde o início do tratamento."
    },
    {
      id: 2,
      nome: "Maria Santos",
      cpf: "987.654.321-00",
      idade: 28,
      telefone: "(11) 88888-8888",
      ultimaConsulta: "2024-01-12",
      status: "acompanhamento",
      humorMedio: 5,
      avatar: "/placeholder.svg",
      diagnostico: "Depressão Leve",
      observacoes: "Necessita acompanhamento mais próximo. Responde bem à terapia cognitiva."
    },
    {
      id: 3,
      nome: "Pedro Costa",
      cpf: "456.789.123-00",
      idade: 42,
      telefone: "(11) 77777-7777",
      ultimaConsulta: "2024-01-10",
      status: "alta",
      humorMedio: 9,
      avatar: "/placeholder.svg",
      diagnostico: "Síndrome do Pânico",
      observacoes: "Paciente recebeu alta após 6 meses de tratamento. Acompanhamento trimestral."
    }
  ];

  const consultas = [
    {
      id: 1,
      data: "2024-01-15",
      tipo: "Psicoterapia Individual",
      duracao: "50 min",
      humor: 7,
      observacoes: "Paciente relata melhora no sono. Discutimos estratégias de enfrentamento para situações de trabalho.",
      proximaSessao: "2024-01-22"
    },
    {
      id: 2,
      data: "2024-01-08",
      tipo: "Avaliação Inicial",
      duracao: "60 min",
      humor: 6,
      observacoes: "Primeira consulta. Estabelecimento de rapport e coleta de histórico.",
      proximaSessao: "2024-01-15"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prontuários</h1>
          <p className="text-gray-600">Gerencie os prontuários dos seus pacientes</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Prontuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Prontuário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Digite o nome do paciente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input id="idade" type="number" placeholder="Idade" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnostico">Diagnóstico Inicial</Label>
                <Input id="diagnostico" placeholder="Diagnóstico preliminar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Iniciais</Label>
                <Textarea id="observacoes" placeholder="Observações sobre o paciente" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Prontuário</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar paciente por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pacientes ({filteredPacientes.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredPacientes.map((paciente) => (
              <div
                key={paciente.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedPaciente?.id === paciente.id ? 'bg-blue-50 border-primary' : ''
                }`}
                onClick={() => setSelectedPaciente(paciente)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={paciente.avatar} />
                    <AvatarFallback>
                      {paciente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{paciente.nome}</h3>
                    <p className="text-xs text-gray-500">{paciente.idade} anos</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          paciente.status === 'ativo' ? 'default' :
                          paciente.status === 'acompanhamento' ? 'secondary' :
                          'outline'
                        }
                        className="text-xs"
                      >
                        {paciente.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs">{paciente.humorMedio}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detalhes do Prontuário */}
        <Card className="lg:col-span-2">
          {selectedPaciente ? (
            <Tabs defaultValue="dados" className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedPaciente.avatar} />
                      <AvatarFallback>
                        {selectedPaciente.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{selectedPaciente.nome}</h3>
                      <p className="text-gray-500">{selectedPaciente.diagnostico}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                </div>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dados">Dados</TabsTrigger>
                  <TabsTrigger value="consultas">Consultas</TabsTrigger>
                  <TabsTrigger value="evolucao">Evolução</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="dados" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">CPF</Label>
                      <p className="text-sm text-gray-600">{selectedPaciente.cpf}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Telefone</Label>
                      <p className="text-sm text-gray-600">{selectedPaciente.telefone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Idade</Label>
                      <p className="text-sm text-gray-600">{selectedPaciente.idade} anos</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-gray-600">{selectedPaciente.status}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Observações</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedPaciente.observacoes}</p>
                  </div>
                </TabsContent>

                <TabsContent value="consultas" className="space-y-4">
                  {consultas.map((consulta) => (
                    <Card key={consulta.id}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{consulta.tipo}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(consulta.data).toLocaleDateString('pt-BR')} • {consulta.duracao}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm">{consulta.humor}/10</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{consulta.observacoes}</p>
                        {consulta.proximaSessao && (
                          <div className="mt-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-xs text-primary">
                              Próxima sessão: {new Date(consulta.proximaSessao).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="evolucao">
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Gráfico de Evolução
                    </h3>
                    <p className="text-gray-500">
                      Aqui será exibido o gráfico de evolução do paciente
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione um paciente
                </h3>
                <p className="text-gray-500">
                  Escolha um paciente para visualizar o prontuário
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Prontuarios;
