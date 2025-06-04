
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Clock, 
  FileText, 
  Shield,
  Calendar,
  Save,
  Download,
  Upload
} from "lucide-react";

const Configuracoes = () => {
  const [notificacoes, setNotificacoes] = useState(true);
  const [lembretes, setLembretes] = useState(true);
  const [emailSemanal, setEmailSemanal] = useState(false);

  const horarios = [
    { dia: 'Segunda', inicio: '08:00', fim: '17:00', ativo: true },
    { dia: 'Terça', inicio: '08:00', fim: '17:00', ativo: true },
    { dia: 'Quarta', inicio: '08:00', fim: '17:00', ativo: true },
    { dia: 'Quinta', inicio: '08:00', fim: '17:00', ativo: true },
    { dia: 'Sexta', inicio: '08:00', fim: '16:00', ativo: true },
    { dia: 'Sábado', inicio: '', fim: '', ativo: false },
    { dia: 'Domingo', inicio: '', fim: '', ativo: false }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Personalize suas preferências e configurações profissionais</p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue="Dr. Carlos Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crp">CRP/CRM</Label>
                  <Input id="crp" defaultValue="CRP 06/123456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Select defaultValue="psicologia-clinica">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psicologia-clinica">Psicologia Clínica</SelectItem>
                      <SelectItem value="psicologia-organizacional">Psicologia Organizacional</SelectItem>
                      <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                      <SelectItem value="medicina-trabalho">Medicina do Trabalho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="carlos.silva@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sala">Sala/Consultório</Label>
                  <Input id="sala" defaultValue="Sala 201 - Bloco A" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Apresentação Profissional</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Descreva sua abordagem terapêutica e experiência..."
                  className="min-h-[100px]"
                />
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Configurações de Agenda
              </CardTitle>
              <CardDescription>
                Configure seus horários de disponibilidade e preferências de agendamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Configurações Gerais</h4>
                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração padrão das consultas</Label>
                    <Select defaultValue="50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="50">50 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intervalo">Intervalo entre consultas</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="20">20 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="antecedencia">Antecedência mínima para agendamento</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 horas</SelectItem>
                        <SelectItem value="24">24 horas</SelectItem>
                        <SelectItem value="48">48 horas</SelectItem>
                        <SelectItem value="72">72 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Preferências</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-confirm">Confirmação automática</Label>
                      <Switch id="auto-confirm" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="overtime">Permitir horários extras</Label>
                      <Switch id="overtime" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekend">Atendimento em finais de semana</Label>
                      <Switch id="weekend" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emergency">Agendamentos de emergência</Label>
                      <Switch id="emergency" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Horários de Atendimento</h4>
                <div className="space-y-3">
                  {horarios.map((horario, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={horario.ativo} />
                        <Label>{horario.dia}</Label>
                      </div>
                      <Input 
                        type="time" 
                        defaultValue={horario.inicio}
                        disabled={!horario.ativo}
                      />
                      <Input 
                        type="time" 
                        defaultValue={horario.fim}
                        disabled={!horario.ativo}
                      />
                      <span className="text-sm text-gray-500">
                        {horario.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Agenda
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificacoes">Notificações push</Label>
                    <p className="text-sm text-gray-600">Receber notificações em tempo real</p>
                  </div>
                  <Switch 
                    id="notificacoes"
                    checked={notificacoes}
                    onCheckedChange={setNotificacoes}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lembretes">Lembretes de consulta</Label>
                    <p className="text-sm text-gray-600">Notificação 30 min antes da consulta</p>
                  </div>
                  <Switch 
                    id="lembretes"
                    checked={lembretes}
                    onCheckedChange={setLembretes}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-semanal">Relatório semanal por email</Label>
                    <p className="text-sm text-gray-600">Resumo das atividades da semana</p>
                  </div>
                  <Switch 
                    id="email-semanal"
                    checked={emailSemanal}
                    onCheckedChange={setEmailSemanal}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notificações por Email</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Novos agendamentos</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Cancelamentos</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Pacientes críticos</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Relatórios do sistema</Label>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Notificações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Templates de Relatório
              </CardTitle>
              <CardDescription>
                Configure modelos padrão para seus relatórios e laudos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Relatório de Consulta</h4>
                    <p className="text-sm text-gray-600 mb-4">Template padrão para relatórios de sessões</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Laudo Psicológico</h4>
                    <p className="text-sm text-gray-600 mb-4">Template para laudos e avaliações</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Relatório Mensal</h4>
                    <p className="text-sm text-gray-600 mb-4">Template para relatórios mensais</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Novo Template</h4>
                    <p className="text-sm text-gray-600 mb-4">Criar um novo modelo personalizado</p>
                    <Button size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-1" />
                      Criar Template
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Configurações de Assinatura</h4>
                <div className="space-y-2">
                  <Label htmlFor="assinatura">Assinatura Digital</Label>
                  <Textarea 
                    id="assinatura"
                    placeholder="Dr. Carlos Silva - CRP 06/123456&#10;Psicólogo Clínico&#10;carlos.silva@empresa.com"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Ativar 2FA</Label>
                    <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Sessões Ativas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Sessão Atual</p>
                      <p className="text-sm text-gray-600">Chrome - Windows • Agora</p>
                    </div>
                    <Button variant="outline" size="sm">Atual</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Dispositivo Móvel</p>
                      <p className="text-sm text-gray-600">iPhone • há 2 horas</p>
                    </div>
                    <Button variant="outline" size="sm">Encerrar</Button>
                  </div>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;
