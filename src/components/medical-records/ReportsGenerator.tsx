
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Calendar,
  User,
  FileBarChart,
  FilePlus,
  Heart,
  Brain,
  Activity
} from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';

interface ReportsGeneratorProps {
  patient: ComprehensivePatient;
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ patient }) => {
  const [selectedReportType, setSelectedReportType] = useState('evolutivo');
  const [period, setPeriod] = useState('ultimo-mes');
  const [includeSections, setIncludeSections] = useState({
    personalInfo: true,
    sessions: true,
    assessments: true,
    medications: true,
    charts: true,
    treatmentPlan: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleToggleSection = (section: string) => {
    setIncludeSections(prev => ({ 
      ...prev, 
      [section]: !prev[section as keyof typeof prev] 
    }));
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // In a real application, this would generate a PDF or document
      alert('Relatório gerado com sucesso! Em uma aplicação real, isto baixaria um PDF.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileBarChart className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Gerador de Relatórios</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="w-5 h-5" />
                Configuração do Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Tipo de Relatório
                </label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evolutivo">Relatório Evolutivo</SelectItem>
                    <SelectItem value="sessoes">Relatório de Sessões</SelectItem>
                    <SelectItem value="diagnostico">Relatório Diagnóstico</SelectItem>
                    <SelectItem value="avaliacao">Relatório de Avaliação</SelectItem>
                    <SelectItem value="alta">Relatório de Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Período
                </label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ultimo-mes">Último mês</SelectItem>
                    <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
                    <SelectItem value="ultimos-6-meses">Últimos 6 meses</SelectItem>
                    <SelectItem value="ultimo-ano">Último ano</SelectItem>
                    <SelectItem value="todo-periodo">Todo o período</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Seções a incluir
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-personalInfo" 
                      checked={includeSections.personalInfo}
                      onCheckedChange={() => handleToggleSection('personalInfo')}
                    />
                    <label htmlFor="section-personalInfo" className="text-sm cursor-pointer">
                      Informações Pessoais
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-sessions" 
                      checked={includeSections.sessions}
                      onCheckedChange={() => handleToggleSection('sessions')}
                    />
                    <label htmlFor="section-sessions" className="text-sm cursor-pointer">
                      Histórico de Sessões
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-assessments" 
                      checked={includeSections.assessments}
                      onCheckedChange={() => handleToggleSection('assessments')}
                    />
                    <label htmlFor="section-assessments" className="text-sm cursor-pointer">
                      Avaliações Psicológicas
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-medications" 
                      checked={includeSections.medications}
                      onCheckedChange={() => handleToggleSection('medications')}
                    />
                    <label htmlFor="section-medications" className="text-sm cursor-pointer">
                      Medicações
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-charts" 
                      checked={includeSections.charts}
                      onCheckedChange={() => handleToggleSection('charts')}
                    />
                    <label htmlFor="section-charts" className="text-sm cursor-pointer">
                      Gráficos e Visualizações
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="section-treatmentPlan" 
                      checked={includeSections.treatmentPlan}
                      onCheckedChange={() => handleToggleSection('treatmentPlan')}
                    />
                    <label htmlFor="section-treatmentPlan" className="text-sm cursor-pointer">
                      Plano de Tratamento
                    </label>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerateReport} 
                className="w-full mt-4"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>Gerando...</>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pré-visualização do Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="border-t pt-4">
              <div className="bg-white p-6 rounded-lg border min-h-[500px] max-h-[600px] overflow-auto">
                {/* Report Header */}
                <div className="text-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedReportType === 'evolutivo' && 'Relatório Evolutivo'}
                    {selectedReportType === 'sessoes' && 'Relatório de Sessões'}
                    {selectedReportType === 'diagnostico' && 'Relatório Diagnóstico'}
                    {selectedReportType === 'avaliacao' && 'Relatório de Avaliação'}
                    {selectedReportType === 'alta' && 'Relatório de Alta'}
                  </h2>
                  <p className="text-gray-600">
                    {patient.name} • {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {/* Report Sections */}
                <div className="space-y-6">
                  {includeSections.personalInfo && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Informações Pessoais
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Nome:</span>
                            <p className="text-gray-700">{patient.name}</p>
                          </div>
                          <div>
                            <span className="font-medium">Idade:</span>
                            <p className="text-gray-700">{patient.age} anos</p>
                          </div>
                          <div>
                            <span className="font-medium">CPF:</span>
                            <p className="text-gray-700">{patient.cpf}</p>
                          </div>
                          <div>
                            <span className="font-medium">Gênero:</span>
                            <p className="text-gray-700">{patient.gender}</p>
                          </div>
                          <div>
                            <span className="font-medium">Estado Civil:</span>
                            <p className="text-gray-700">{patient.maritalStatus}</p>
                          </div>
                          <div>
                            <span className="font-medium">Profissão:</span>
                            <p className="text-gray-700">{patient.occupation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {includeSections.sessions && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Histórico de Sessões
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          {patient.sessions.slice(0, 3).map(session => (
                            <div key={session.id} className="p-3 bg-white rounded border">
                              <div className="flex justify-between">
                                <span className="font-medium">{new Date(session.date).toLocaleDateString('pt-BR')}</span>
                                <Badge>{session.type}</Badge>
                              </div>
                              <p className="text-sm mt-1">{session.notes}</p>
                            </div>
                          ))}
                          {patient.sessions.length > 3 && (
                            <p className="text-sm text-gray-500 text-center">
                              + {patient.sessions.length - 3} outras sessões
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {includeSections.assessments && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Avaliações Psicológicas
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          {patient.assessments.map(assessment => (
                            <div key={assessment.id} className="p-3 bg-white rounded border">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{assessment.type}</span>
                                <span className="text-sm">{new Date(assessment.date).toLocaleDateString('pt-BR')}</span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm">Pontuação: {assessment.score}/{assessment.maxScore}</span>
                                <Badge variant="outline">
                                  {(assessment.score / assessment.maxScore) * 100}%
                                </Badge>
                              </div>
                              {assessment.notes && (
                                <p className="text-sm mt-2 text-gray-600">{assessment.notes}</p>
                              )}
                            </div>
                          ))}
                          {patient.assessments.length === 0 && (
                            <p className="text-sm text-gray-500 text-center">
                              Nenhuma avaliação registrada
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {includeSections.medications && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Medicações
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          {patient.medicalHistory.currentMedications.length > 0 ? (
                            patient.medicalHistory.currentMedications.map((medication, index) => (
                              <div key={index} className="p-3 bg-white rounded border">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{medication}</span>
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    Ativo
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 text-center">
                              Nenhuma medicação registrada
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {includeSections.treatmentPlan && patient.treatmentPlan && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Plano de Tratamento
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="mb-2">
                            <h4 className="font-medium">Diagnósticos:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {patient.treatmentPlan.diagnosis.map((diagnosis, index) => (
                                <Badge key={index} variant="outline">
                                  {diagnosis}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <h4 className="font-medium">Objetivos:</h4>
                            <div className="space-y-2 mt-1">
                              {patient.treatmentPlan.objectives.map((objective, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                                  <div className={`w-2 h-2 rounded-full ${objective.achieved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                  <span className="text-sm">{objective.goal}</span>
                                  <span className="text-xs text-gray-500 ml-auto">
                                    {objective.achieved ? 'Alcançado' : `Meta: ${objective.deadline}`}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Técnicas:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {patient.treatmentPlan.techniques.map((technique, index) => (
                                <Badge key={index} variant="outline">
                                  {technique}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-lg font-medium mb-3">Relatórios Pré-configurados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Relatório Evolutivo', 
              description: 'Resumo completo do progresso do paciente',
              type: 'evolutivo',
              icon: Activity
            },
            { 
              title: 'Relatório para Convênio', 
              description: 'Documentação para planos de saúde',
              type: 'convenio',
              icon: FileText
            },
            { 
              title: 'Parecer Psicológico', 
              description: 'Parecer técnico detalhado',
              type: 'parecer',
              icon: Brain
            }
          ].map((template, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <template.icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <h4 className="font-medium">{template.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSelectedReportType(template.type);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Personalizar
                  </Button>
                  <Button size="sm" className="w-full">
                    <Download className="w-3 h-3 mr-1" />
                    Gerar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsGenerator;
