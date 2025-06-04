
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { TrendingUp, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface ChartsTabProps {
  patient: ComprehensivePatient;
}

const ChartsTab: React.FC<ChartsTabProps> = ({ patient }) => {
  // Preparar dados para evolução do humor
  const moodData = patient.sessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('pt-BR'),
    humor: session.mood,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Preparar dados para frequência de sessões por mês
  const sessionsByMonth = patient.sessions.reduce((acc, session) => {
    const month = new Date(session.date).toLocaleDateString('pt-BR', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = { month, count: 0, completed: 0, cancelled: 0, noShow: 0 };
    }
    
    acc[month].count += 1;
    
    if (session.status === 'completed') acc[month].completed += 1;
    else if (session.status === 'cancelled') acc[month].cancelled += 1;
    else if (session.status === 'no-show') acc[month].noShow += 1;
    
    return acc;
  }, {});
  
  const sessionFrequencyData = Object.values(sessionsByMonth);

  // Preparar dados para avaliações
  const assessmentData = patient.assessments.map(assessment => {
    const score = (assessment.score / assessment.maxScore) * 100;
    return {
      name: assessment.type,
      date: new Date(assessment.date).toLocaleDateString('pt-BR'),
      score,
      fullScore: assessment.score,
      maxScore: assessment.maxScore
    };
  });

  // Dados para análise de progresso
  const progressData = [
    { area: 'Humor', score: patient.averageMood * 10, fullMark: 100 },
    { area: 'Aderência', score: patient.adherenceRate, fullMark: 100 },
    { area: 'Melhora', score: patient.improvementRate, fullMark: 100 },
    { area: 'Técnicas', score: patient.sessions.reduce((acc, session) => acc + session.techniques.length, 0) > 0 ? 70 : 30, fullMark: 100 },
    { area: 'Objetivos', score: patient.treatmentPlan?.objectives.filter(obj => obj.achieved).length || 0 * 20, fullMark: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução do Humor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Evolução do Humor
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {moodData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip 
                    formatter={(value) => [`${value}/10`, 'Humor']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humor" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Não há dados de humor suficientes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Avaliações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Avaliações Psicológicas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {assessmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assessmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value, name, props) => [`${props.payload.fullScore}/${props.payload.maxScore} (${value.toFixed(0)}%)`, 'Pontuação']}
                    labelFormatter={(label) => `Escala: ${label}`}
                  />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Não há avaliações registradas</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Frequência de Sessões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Frequência de Sessões
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {sessionFrequencyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Realizadas" fill="#10B981" />
                  <Bar dataKey="cancelled" name="Canceladas" fill="#F59E0B" />
                  <Bar dataKey="noShow" name="Faltas" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Não há dados de sessões suficientes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Análise de Progresso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Análise de Progresso
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={progressData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Progresso"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartsTab;
