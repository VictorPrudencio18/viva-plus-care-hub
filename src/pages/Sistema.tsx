
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Database, 
  Shield, 
  Activity, 
  Server, 
  Bell,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const Sistema = () => {
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const systemMetrics = [
    { label: "Uptime", value: "99.9%", status: "success" },
    { label: "CPU Usage", value: "45%", status: "warning" },
    { label: "Memory Usage", value: "68%", status: "normal" },
    { label: "Disk Space", value: "78%", status: "warning" }
  ];

  const recentLogs = [
    { time: "14:32", level: "INFO", message: "Backup automático concluído com sucesso" },
    { time: "14:15", level: "WARNING", message: "Uso de CPU acima de 80% por 5 minutos" },
    { time: "13:45", level: "INFO", message: "Novo usuário cadastrado: maria.silva@empresa.com" },
    { time: "13:20", level: "ERROR", message: "Falha na conexão com servidor de backup" }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600">Gerencie configurações globais e monitore a saúde da plataforma</p>
      </div>

      {/* Métricas do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Activity className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="monitoramento">Logs</TabsTrigger>
          <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="app-name">Nome da Aplicação</Label>
                    <Input id="app-name" defaultValue="Viva+ Enterprise" />
                  </div>
                  <div>
                    <Label htmlFor="max-users">Máximo de Usuários</Label>
                    <Input id="max-users" type="number" defaultValue="1000" />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notificações do Sistema</Label>
                    <Switch 
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Modo Manutenção</Label>
                    <Switch 
                      id="maintenance"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  {maintenanceMode && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Modo manutenção ativo. Novos logins serão bloqueados.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup e Restore
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Backup Automático</h3>
                  <p className="text-sm text-gray-600">Backup diário às 02:00</p>
                </div>
                <Switch 
                  checked={backupEnabled}
                  onCheckedChange={setBackupEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <Download className="w-8 h-8 mx-auto text-primary" />
                      <h4 className="font-medium">Backup Manual</h4>
                      <p className="text-sm text-gray-600">Criar backup completo agora</p>
                      <Button className="w-full">
                        Iniciar Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <Upload className="w-8 h-8 mx-auto text-secondary" />
                      <h4 className="font-medium">Restaurar Backup</h4>
                      <p className="text-sm text-gray-600">Restaurar dados de um backup</p>
                      <Button variant="outline" className="w-full">
                        Selecionar Arquivo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3">Backups Recentes</h4>
                <div className="space-y-2">
                  {[
                    { date: "2024-01-15 02:00", size: "450 MB", status: "success" },
                    { date: "2024-01-14 02:00", size: "445 MB", status: "success" },
                    { date: "2024-01-13 02:00", size: "440 MB", status: "failed" }
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {backup.status === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{backup.date}</p>
                          <p className="text-xs text-gray-600">{backup.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Tentativas de Login</h4>
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-gray-600">Falhas nas últimas 24h</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Usuários Ativos</h4>
                    <p className="text-2xl font-bold text-blue-600">45</p>
                    <p className="text-sm text-gray-600">Online agora</p>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Políticas de Segurança</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Força de senha obrigatória</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Autenticação de dois fatores</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Bloqueio após tentativas falhas</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoramento">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>Monitoramento em tempo real das atividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{log.time}</span>
                    <Badge className={getLevelColor(log.level)}>
                      {log.level}
                    </Badge>
                    <span className="text-sm flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  Ver Todos os Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manutencao">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Ferramentas de Manutenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Database className="w-6 h-6" />
                  Otimizar Banco
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Users className="w-6 h-6" />
                  Limpar Sessões
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Activity className="w-6 h-6" />
                  Reiniciar Serviços
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <AlertTriangle className="w-6 h-6" />
                  Verificar Integridade
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sistema;
