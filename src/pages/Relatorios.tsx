
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users, 
  TrendingUp, 
  TrendingDown,
  ArrowLeft,
  FileText,
  PieChart,
  Activity,
  Target,
  Clock
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const Relatorios = () => {
  const navigate = useNavigate();
  const [periodoSelecionado, setPeriodoSelecionado] = useState('ultimo-mes');

  // Dados mockados para os gráficos
  const dadosEvolucaoHumor = [
    { mes: 'Jan', humor: 5.2, sessoes: 45 },
    { mes: 'Fev', humor: 6.1, sessoes: 52 },
    { mes: 'Mar', humor: 6.8, sessoes: 48 },
    { mes: 'Abr', humor: 7.2, sessoes: 55 },
    { mes: 'Mai', humor: 7.5, sessoes: 60 },
    { mes: 'Jun', humor: 7.8, sessoes: 58 }
  ];

  const dadosDistribuicaoDiagnosticos = [
    { name: 'Ansiedade', value: 35, color: '#3B82F6' },
    { name: 'Depressão', value: 28, color: '#EF4444' },
    { name: 'Transtorno Bipolar', value: 15, color: '#F59E0B' },
    { name: 'PTSD', value: 12, color: '#10B981' },
    { name: 'Outros', value: 10, color: '#8B5CF6' }
  ];

  const dadosSessoesPorMes = [
    { mes: 'Jan', presencial: 30, online: 15, total: 45 },
    { mes: 'Fev', presencial: 35, online: 17, total: 52 },
    { mes: 'Mar', presencial: 32, online: 16, total: 48 },
    { mes: 'Abr', presencial: 38, online: 17, total: 55 },
    { mes: 'Mai', presencial: 42, online: 18, total: 60 },
    { mes: 'Jun', presencial: 40, online: 18, total: 58 }
  ];

  const estatisticasGerais = {
    totalPacientes: 42,
    pacientesAtivos: 35,
    sessoesRealizadas: 318,
    taxaMelhora: 78,
    taxaAdesao: 85,
    tempoMedioTratamento: 6.2,
    crescimentoMensal: 12
  };

  const relatoriosDisponiveis = [
    {
      titulo: 'Relatório de Evolução de Pacientes',
      descricao: 'Análise detalhada do progresso individual dos pacientes',
      tipo: 'evolucao',
      icone: TrendingUp
    },
    {
      titulo: 'Relatório de Sessões Realizadas',
      descricao: 'Resumo das sessões por período e modalidade',
      tipo: 'sessoes',
      icone: Calendar
    },
    {
      titulo: 'Relatório Financeiro',
      descricao: 'Análise de faturamento e receitas por período',
      tipo: 'financeiro',
      icone: BarChart3
    },
    {
      titulo: 'Relatório de Eficácia Terapêutica',
      descricao: 'Métricas de sucesso do tratamento por diagnóstico',
      tipo: 'eficacia',
      icone: Target
    }
  ];

  const gerarRelatorio = (tipo) => {
    console.log('Gerando relatório:', tipo);
    // Aqui integraria com sistema de geração de relatórios
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
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Estatísticas</h1>
            <p className="text-gray-600">Análises detalhadas do seu consultório</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ultima-semana">Última semana</SelectItem>
              <SelectItem value="ultimo-mes">Último mês</SelectItem>
              <SelectItem value="ultimo-trimestre">Último trimestre</SelectItem>
              <SelectItem value="ultimo-ano">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pacientes Ativos</p>
                <p className="text-2xl font-bold">{estatisticasGerais.pacientesAtivos}</p>
                <p className="text-xs text-green-600">+{estatisticasGerais.crescimentoMensal}% este mês</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessões Realizadas</p>
                <p className="text-2xl font-bold">{estatisticasGerais.sessoesRealizadas}</p>
                <p className="text-xs text-green-600">58 este mês</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Melhora</p>
                <p className="text-2xl font-bold">{estatisticasGerais.taxaMelhora}%</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +5% vs mês anterior
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Adesão</p>
                <p className="text-2xl font-bold">{estatisticasGerais.taxaAdesao}%</p>
                <p className="text-xs text-gray-600">Comparecimento às sessões</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="graficos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="graficos">Gráficos e Análises</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios Detalhados</TabsTrigger>
          <TabsTrigger value="comparativos">Análises Comparativas</TabsTrigger>
        </TabsList>

        <TabsContent value="graficos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolução do Humor */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Evolução do Humor Médio
                </CardTitle>
                <CardDescription>
                  Tendência de melhora dos pacientes ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucaoHumor}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="humor" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição de Diagnósticos */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Distribuição de Diagnósticos
                </CardTitle>
                <CardDescription>
                  Prevalência dos transtornos tratados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={dadosDistribuicaoDiagnosticos}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dadosDistribuicaoDiagnosticos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sessões por Modalidade */}
            <Card className="bg-white lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sessões por Modalidade
                </CardTitle>
                <CardDescription>
                  Comparativo entre sessões presenciais e online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosSessoesPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="presencial" fill="#3B82F6" name="Presencial" />
                    <Bar dataKey="online" fill="#10B981" name="Online" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatoriosDisponiveis.map((relatorio, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <relatorio.icone className="w-6 h-6 text-blue-600" />
                    {relatorio.titulo}
                  </CardTitle>
                  <CardDescription>
                    {relatorio.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => gerarRelatorio(relatorio.tipo)}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparativos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comparativo de Eficácia por Diagnóstico */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Eficácia por Diagnóstico</CardTitle>
                <CardDescription>
                  Taxa de melhora por tipo de transtorno
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { diagnostico: 'Ansiedade', taxa: 85, cor: 'bg-green-500' },
                  { diagnostico: 'Depressão', taxa: 75, cor: 'bg-blue-500' },
                  { diagnostico: 'Transtorno Bipolar', taxa: 65, cor: 'bg-yellow-500' },
                  { diagnostico: 'PTSD', taxa: 70, cor: 'bg-purple-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.diagnostico}</span>
                      <span className="font-medium">{item.taxa}%</span>
                    </div>
                    <Progress value={item.taxa} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tempo Médio de Tratamento */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Tempo Médio de Tratamento</CardTitle>
                <CardDescription>
                  Duração média em meses por diagnóstico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { diagnostico: 'Ansiedade', tempo: 4.2, meta: 6 },
                  { diagnostico: 'Depressão', tempo: 8.5, meta: 12 },
                  { diagnostico: 'Transtorno Bipolar', tempo: 18.2, meta: 24 },
                  { diagnostico: 'PTSD', tempo: 12.1, meta: 18 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.diagnostico}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {item.tempo} meses
                      </Badge>
                      <span className="text-xs text-gray-500">
                        (meta: {item.meta}m)
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;
