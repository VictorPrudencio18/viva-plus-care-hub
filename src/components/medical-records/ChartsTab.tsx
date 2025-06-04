
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, Heart, Activity, Calendar, Target } from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';

interface ChartsTabProps {
  patient: ComprehensivePatient;
}

const ChartsTab: React.FC<ChartsTabProps> = ({ patient }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1m' | '3m' | '6m' | '1y'>('3m');

  // Preparar dados para gráficos
  const moodData = patient.sessions
    .filter(session => session.mood > 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(session => ({
      date: new Date(session.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      mood: session.mood,
      fullDate: session.date
    }));

  const assessmentData = patient.assessments
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(assessment => ({
      date: new Date(assessment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      score: assessment.score,
      type: assessment.type,
      percentage: (assessment.score / assessment.maxScore) * 100
    }));

  const sessionFrequency = patient.sessions
    .reduce((acc, session) => {
      const month = new Date(session.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const frequencyData = Object.entries(sessionFrequency).map(([month, count]) => ({
    month,
    sessions: count
  }));

  const progressData = moodData.map((item, index) => {
    if (index === 0) return { ...item, trend: 0 };
    const prevMood = moodData[index - 1].mood;
    return {
      ...item,
      trend: item.mood - prevMood
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Análise Gráfica do Progresso</h3>
        <div className="flex gap-2">
          {['1m', '3m', '6m', '1y'].map((period) => (
            <Button
              key={period}
              size="sm"
              variant={selectedPeriod === period ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod(period as any)}
            >
              {period === '1m' ? '1 mês' : period === '3m' ? '3 meses' : period === '6m' ? '6 meses' : '1 ano'}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="mood" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mood">Evolução do Humor</TabsTrigger>
          <TabsTrigger value="assessments">Avaliações</TabsTrigger>
          <TabsTrigger value="frequency">Frequência de Sessões</TabsTrigger>
          <TabsTrigger value="progress">Análise de Progresso</TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Evolução do Humor (1-10)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {moodData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 10]} />
                      <Tooltip 
                        labelFormatter={(label) => `Data: ${label}`}
                        formatter={(value) => [`${value}/10`, 'Humor']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhum dado de humor disponível
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Resultados das Avaliações
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assessmentData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assessmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => `Data: ${label}`}
                        formatter={(value, name, props) => [
                          `${value} (${props.payload.percentage.toFixed(1)}%)`,
                          'Pontuação'
                        ]}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma avaliação disponível
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Frequência de Sessões por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              {frequencyData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={frequencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => `Mês: ${label}`}
                        formatter={(value) => [`${value}`, 'Sessões']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhum dado de frequência disponível
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Análise de Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{patient.totalSessions}</div>
                  <div className="text-sm text-blue-800">Total de Sessões</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{patient.averageMood.toFixed(1)}</div>
                  <div className="text-sm text-green-800">Humor Médio</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{patient.adherenceRate}%</div>
                  <div className="text-sm text-purple-800">Taxa de Aderência</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{patient.improvementRate}%</div>
                  <div className="text-sm text-orange-800">Taxa de Melhora</div>
                </div>
              </div>

              {progressData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => `Data: ${label}`}
                        formatter={(value, name) => [
                          name === 'mood' ? `${value}/10` : `${value > 0 ? '+' : ''}${value}`,
                          name === 'mood' ? 'Humor' : 'Tendência'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="trend" 
                        stroke="#f59e0b" 
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Dados insuficientes para análise de progresso
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsTab;
