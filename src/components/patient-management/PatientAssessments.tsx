
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Assessment } from '@/types/patient';

interface PatientAssessmentsProps {
  assessments: Assessment[];
  onAddAssessment: (assessment: Omit<Assessment, 'id'>) => void;
}

const PatientAssessments: React.FC<PatientAssessmentsProps> = ({ assessments, onAddAssessment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const assessmentTypes = {
    'beck-depression': { name: 'Inventário de Depressão de Beck (BDI-II)', maxScore: 63, risk: { mild: 14, moderate: 20, severe: 29 } },
    'beck-anxiety': { name: 'Inventário de Ansiedade de Beck (BAI)', maxScore: 63, risk: { mild: 8, moderate: 16, severe: 26 } },
    'hamilton-depression': { name: 'Escala de Hamilton para Depressão', maxScore: 52, risk: { mild: 8, moderate: 14, severe: 23 } },
    'gaf': { name: 'Escala de Avaliação Global do Funcionamento', maxScore: 100, risk: { mild: 70, moderate: 50, severe: 30 } },
    'whoqol': { name: 'WHOQOL-BREF Qualidade de Vida', maxScore: 100, risk: { mild: 60, moderate: 40, severe: 20 } },
  };

  const getAssessmentSeverity = (assessment: Assessment) => {
    const type = assessmentTypes[assessment.type];
    if (!type) return 'unknown';
    
    const percentage = (assessment.score / type.maxScore) * 100;
    
    if (assessment.type === 'gaf' || assessment.type === 'whoqol') {
      // Para GAF e WHOQOL, valores altos são melhores
      if (percentage >= type.risk.mild) return 'good';
      if (percentage >= type.risk.moderate) return 'mild';
      if (percentage >= type.risk.severe) return 'moderate';
      return 'severe';
    } else {
      // Para Beck e Hamilton, valores baixos são melhores
      const score = assessment.score;
      if (score <= type.risk.mild) return 'mild';
      if (score <= type.risk.moderate) return 'moderate';
      if (score <= type.risk.severe) return 'severe';
      return 'critical';
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      'good': 'bg-green-100 text-green-800 border-green-200',
      'mild': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'moderate': 'bg-orange-100 text-orange-800 border-orange-200',
      'severe': 'bg-red-100 text-red-800 border-red-200',
      'critical': 'bg-red-200 text-red-900 border-red-300',
      'unknown': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[severity] || colors.unknown;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'mild': return <TrendingUp className="w-4 h-4" />;
      case 'moderate': return <TrendingDown className="w-4 h-4" />;
      case 'severe': case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const chartData = assessments
    .filter(a => a.type === selectedCategory || selectedCategory === 'all')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(assessment => ({
      date: new Date(assessment.date).toLocaleDateString('pt-BR'),
      score: assessment.score,
      percentage: (assessment.score / assessmentTypes[assessment.type]?.maxScore || 100) * 100,
      type: assessment.type
    }));

  const latestAssessments = assessments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Avaliações Psicológicas</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">Histórico</TabsTrigger>
          <TabsTrigger value="charts" className="data-[state=active]:bg-white">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(assessmentTypes).map(([key, type]) => {
              const latestAssessment = assessments
                .filter(a => a.type === key)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              
              if (!latestAssessment) return null;
              
              const severity = getAssessmentSeverity(latestAssessment);
              const percentage = (latestAssessment.score / type.maxScore) * 100;
              
              return (
                <Card key={key} className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{latestAssessment.score}</span>
                      <Badge className={`${getSeverityColor(severity)} border flex items-center gap-1`}>
                        {getSeverityIcon(severity)}
                        {severity}
                      </Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Última avaliação: {new Date(latestAssessment.date).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-3">
            {latestAssessments.map((assessment) => {
              const type = assessmentTypes[assessment.type];
              const severity = getAssessmentSeverity(assessment);
              
              return (
                <Card key={assessment.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{type?.name || assessment.type}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(assessment.date).toLocaleDateString('pt-BR')} • 
                          Pontuação: {assessment.score}/{type?.maxScore || assessment.maxScore}
                        </p>
                        {assessment.notes && (
                          <p className="text-sm text-gray-600 mt-2">{assessment.notes}</p>
                        )}
                      </div>
                      <Badge className={`${getSeverityColor(severity)} border flex items-center gap-1`}>
                        {getSeverityIcon(severity)}
                        {severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Evolução das Avaliações</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="border-gray-300"
                >
                  Todas
                </Button>
                {Object.entries(assessmentTypes).map(([key, type]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(key)}
                    className="border-gray-300"
                  >
                    {type.name.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#2563eb" 
                        strokeWidth={2}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma avaliação encontrada para exibir no gráfico
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientAssessments;
