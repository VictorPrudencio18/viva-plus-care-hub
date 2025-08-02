
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, FileText, TrendingUp, Activity, Settings, AlertTriangle, Shield } from "lucide-react";

const AdminDashboard = () => {
  const usuariosData = [
    { mes: 'Jan', servidores: 120, profissionais: 15 },
    { mes: 'Fev', servidores: 135, profissionais: 18 },
    { mes: 'Mar', servidores: 150, profissionais: 20 },
    { mes: 'Abr', servidores: 168, profissionais: 22 },
    { mes: 'Mai', servidores: 180, profissionais: 25 },
    { mes: 'Jun', servidores: 195, profissionais: 27 },
  ];

  const atendimentosData = [
    { tipo: 'Psicologia', quantidade: 450, cor: '#8884d8' },
    { tipo: 'Medicina', quantidade: 320, cor: '#82ca9d' },
    { tipo: 'Telemedicina', quantidade: 180, cor: '#ffc658' },
    { tipo: 'Grupos', quantidade: 95, cor: '#ff7c7c' },
  ];

  const alertas = [
    { tipo: "Sistema", mensagem: "Backup automático realizado com sucesso", severity: "info" },
    { tipo: "Segurança", mensagem: "3 tentativas de login falharam para usuário admin", severity: "warning" },
    { tipo: "Performance", mensagem: "Uso de CPU acima de 80% nos últimos 30 min", severity: "error" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600">Visão geral completa da plataforma Viva+</p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos/Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,045</div>
            <p className="text-xs text-muted-foreground">
              +8% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Satisfação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              2 novos hoje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>
              Evolução mensal de servidores e profissionais cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usuariosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="servidores" stroke="#8884d8" strokeWidth={2} name="Servidores" />
                <Line type="monotone" dataKey="profissionais" stroke="#82ca9d" strokeWidth={2} name="Profissionais" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Atendimentos</CardTitle>
            <CardDescription>
              Tipos de atendimentos realizados este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={atendimentosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                >
                  {atendimentosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Alertas do Sistema
          </CardTitle>
          <CardDescription>
            Monitoramento em tempo real da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertas.map((alerta, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className={getSeverityColor(alerta.severity)}>
                  {alerta.tipo}
                </Badge>
                <p className="text-sm">{alerta.mensagem}</p>
              </div>
              <div className="text-sm text-gray-500">
                há 2 horas
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" variant="outline">
            Ver Todos os Alertas
          </Button>
        </CardContent>
      </Card>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle>Ferramentas Administrativas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades de gestão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/app/usuarios'}
            >
              <Users className="w-6 h-6" />
              Gerenciar Usuários
            </Button>
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => window.location.href = '/app/relatorios'}
            >
              <FileText className="w-6 h-6" />
              Relatórios
            </Button>
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => window.location.href = '/app/configuracoes'}
            >
              <Settings className="w-6 h-6" />
              Configurações
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Activity className="w-6 h-6" />
              Monitoramento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
