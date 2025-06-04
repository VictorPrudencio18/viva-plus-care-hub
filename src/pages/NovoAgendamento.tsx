
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  CalendarPlus, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  Bell, 
  ArrowLeft,
  Save,
  Search
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const NovoAgendamento = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    pacienteId: '',
    pacienteNome: '',
    tipoConsulta: '',
    modalidade: '',
    data: '',
    horario: '',
    duracao: '50',
    sala: '',
    observacoes: '',
    lembretes: {
      sms: false,
      email: false,
      whatsapp: false
    },
    recorrencia: 'nenhuma',
    prioridade: 'normal'
  });

  const [searchPaciente, setSearchPaciente] = useState('');
  const [showPacientes, setShowPacientes] = useState(false);

  // Mock de pacientes para busca
  const pacientes = [
    { id: '1', nome: 'João Silva', telefone: '(11) 99999-9999' },
    { id: '2', nome: 'Maria Santos', telefone: '(11) 88888-8888' },
    { id: '3', nome: 'Pedro Costa', telefone: '(11) 77777-7777' },
    { id: '4', nome: 'Ana Oliveira', telefone: '(11) 66666-6666' }
  ];

  const pacientesFiltrados = pacientes.filter(p => 
    p.nome.toLowerCase().includes(searchPaciente.toLowerCase())
  );

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const selecionarPaciente = (paciente) => {
    setFormData(prev => ({
      ...prev,
      pacienteId: paciente.id,
      pacienteNome: paciente.nome
    }));
    setSearchPaciente(paciente.nome);
    setShowPacientes(false);
  };

  const salvarAgendamento = () => {
    console.log('Salvando agendamento:', formData);
    navigate('/agendamentos');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard/psicologo')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Agendamento</h1>
            <p className="text-gray-600">Agendar nova consulta ou retorno</p>
          </div>
        </div>
        
        <Button onClick={salvarAgendamento} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Confirmar Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5" />
                Dados do Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Busca de Paciente */}
              <div className="space-y-2">
                <Label>Paciente *</Label>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar paciente por nome..."
                      value={searchPaciente}
                      onChange={(e) => {
                        setSearchPaciente(e.target.value);
                        setShowPacientes(true);
                      }}
                      onFocus={() => setShowPacientes(true)}
                      className="pl-10"
                    />
                  </div>
                  
                  {showPacientes && searchPaciente && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {pacientesFiltrados.length > 0 ? (
                        pacientesFiltrados.map((paciente) => (
                          <div
                            key={paciente.id}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b"
                            onClick={() => selecionarPaciente(paciente)}
                          >
                            <div className="font-medium">{paciente.nome}</div>
                            <div className="text-sm text-gray-500">{paciente.telefone}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-center">
                          Nenhum paciente encontrado
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {formData.pacienteNome && (
                  <Badge className="bg-green-100 text-green-800">
                    <User className="w-3 h-3 mr-1" />
                    {formData.pacienteNome}
                  </Badge>
                )}
              </div>

              {/* Tipo e Modalidade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Consulta *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tipoConsulta: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primeira-consulta">Primeira Consulta</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                      <SelectItem value="urgencia">Urgência</SelectItem>
                      <SelectItem value="grupo">Terapia em Grupo</SelectItem>
                      <SelectItem value="avaliacao">Avaliação Psicológica</SelectItem>
                      <SelectItem value="supervisao">Supervisão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Modalidade *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, modalidade: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Presencial
                        </div>
                      </SelectItem>
                      <SelectItem value="online">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Online
                        </div>
                      </SelectItem>
                      <SelectItem value="domiciliar">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Domiciliar
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Horário *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, horario: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {horario}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duração (min)</Label>
                  <Select 
                    value={formData.duracao}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duracao: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="50">50 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sala/Local */}
              {formData.modalidade === 'presencial' && (
                <div className="space-y-2">
                  <Label>Sala/Consultório</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, sala: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar sala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sala-1">Sala 1 - Consultório Principal</SelectItem>
                      <SelectItem value="sala-2">Sala 2 - Atendimento Individual</SelectItem>
                      <SelectItem value="sala-3">Sala 3 - Terapia em Grupo</SelectItem>
                      <SelectItem value="sala-4">Sala 4 - Avaliação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Recorrência */}
              <div className="space-y-2">
                <Label>Recorrência</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, recorrencia: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Agendar apenas uma vez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nenhuma">Agendar apenas uma vez</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Prioridade */}
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, prioridade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">
                      <Badge className="bg-green-100 text-green-800">Baixa</Badge>
                    </SelectItem>
                    <SelectItem value="normal">
                      <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                    </SelectItem>
                    <SelectItem value="alta">
                      <Badge className="bg-orange-100 text-orange-800">Alta</Badge>
                    </SelectItem>
                    <SelectItem value="urgente">
                      <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea 
                  placeholder="Observações adicionais sobre a consulta..."
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Lembretes */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Lembretes para o Paciente
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lembrete-sms"
                      checked={formData.lembretes.sms}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        lembretes: { ...prev.lembretes, sms: checked }
                      }))}
                    />
                    <Label htmlFor="lembrete-sms">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lembrete-email"
                      checked={formData.lembretes.email}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        lembretes: { ...prev.lembretes, email: checked }
                      }))}
                    />
                    <Label htmlFor="lembrete-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lembrete-whatsapp"
                      checked={formData.lembretes.whatsapp}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        lembretes: { ...prev.lembretes, whatsapp: checked }
                      }))}
                    />
                    <Label htmlFor="lembrete-whatsapp">WhatsApp</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Resumo do Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.pacienteNome && (
                <div>
                  <Label className="text-sm text-gray-500">Paciente</Label>
                  <p className="font-medium">{formData.pacienteNome}</p>
                </div>
              )}

              {formData.tipoConsulta && (
                <div>
                  <Label className="text-sm text-gray-500">Tipo</Label>
                  <p className="font-medium">{formData.tipoConsulta}</p>
                </div>
              )}

              {formData.modalidade && (
                <div>
                  <Label className="text-sm text-gray-500">Modalidade</Label>
                  <p className="font-medium">{formData.modalidade}</p>
                </div>
              )}

              {selectedDate && (
                <div>
                  <Label className="text-sm text-gray-500">Data</Label>
                  <p className="font-medium">{format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
              )}

              {formData.horario && (
                <div>
                  <Label className="text-sm text-gray-500">Horário</Label>
                  <p className="font-medium">{formData.horario}</p>
                </div>
              )}

              <div>
                <Label className="text-sm text-gray-500">Duração</Label>
                <p className="font-medium">{formData.duracao} minutos</p>
              </div>

              {formData.sala && (
                <div>
                  <Label className="text-sm text-gray-500">Local</Label>
                  <p className="font-medium">{formData.sala}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Horários do Dia */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Agenda do Dia</CardTitle>
              <CardDescription>
                {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['09:00 - João Silva', '14:00 - Maria Santos', '16:00 - Pedro Costa'].map((agendamento, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                    {agendamento}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NovoAgendamento;
