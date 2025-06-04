
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Target, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  Plus,
  Brain,
  Heart,
  Users,
  Zap
} from "lucide-react";
import { TreatmentPlan } from '@/types/patient';

interface TreatmentPlanManagerProps {
  treatmentPlan?: TreatmentPlan;
  onUpdatePlan: (plan: TreatmentPlan) => void;
}

const TreatmentPlanManager: React.FC<TreatmentPlanManagerProps> = ({ 
  treatmentPlan, 
  onUpdatePlan 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TreatmentPlan | null>(treatmentPlan || null);

  const therapeuticApproaches = [
    { id: 'tcc', name: 'Terapia Cognitivo-Comportamental', icon: Brain },
    { id: 'humanistic', name: 'Abordagem Humanística', icon: Heart },
    { id: 'systemic', name: 'Terapia Sistêmica', icon: Users },
    { id: 'gestalt', name: 'Gestalt-Terapia', icon: Zap },
    { id: 'psychodynamic', name: 'Psicodinâmica', icon: Brain },
    { id: 'act', name: 'Terapia de Aceitação e Compromisso', icon: Target },
  ];

  const commonTechniques = [
    'Reestruturação Cognitiva',
    'Exposição Gradual',
    'Relaxamento Progressivo',
    'Mindfulness',
    'Técnicas de Respiração',
    'Registro de Pensamentos',
    'Experimentos Comportamentais',
    'Role-playing',
    'Técnicas de Assertividade',
    'Psicoeducação'
  ];

  const riskLevels = {
    low: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Baixo' },
    medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Médio' },
    high: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Alto' },
    critical: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Crítico' }
  };

  const addObjective = () => {
    if (!editingPlan) return;
    
    const newObjective = {
      goal: '',
      deadline: '',
      achieved: false
    };
    
    setEditingPlan({
      ...editingPlan,
      objectives: [...editingPlan.objectives, newObjective]
    });
  };

  const updateObjective = (index: number, field: string, value: any) => {
    if (!editingPlan) return;
    
    const updatedObjectives = editingPlan.objectives.map((obj, i) => 
      i === index ? { ...obj, [field]: value } : obj
    );
    
    setEditingPlan({
      ...editingPlan,
      objectives: updatedObjectives
    });
  };

  const calculateProgress = () => {
    if (!treatmentPlan?.objectives.length) return 0;
    const achieved = treatmentPlan.objectives.filter(obj => obj.achieved).length;
    return (achieved / treatmentPlan.objectives.length) * 100;
  };

  if (!treatmentPlan && !isEditing) {
    return (
      <Card className="border-gray-200">
        <CardContent className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum Plano de Tratamento
          </h3>
          <p className="text-gray-500 mb-4">
            Crie um plano de tratamento personalizado para este paciente
          </p>
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Criar Plano de Tratamento
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Plano de Tratamento</h3>
        <div className="flex gap-2">
          {treatmentPlan && (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-gray-300"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
          )}
          {isEditing && (
            <Button 
              onClick={() => {
                if (editingPlan) {
                  onUpdatePlan(editingPlan);
                  setIsEditing(false);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Plano
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Editar Plano de Tratamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico Principal</Label>
                <Input
                  id="diagnosis"
                  value={editingPlan?.diagnosis.join(', ') || ''}
                  onChange={(e) => setEditingPlan(prev => prev ? {
                    ...prev,
                    diagnosis: e.target.value.split(', ').filter(d => d.trim())
                  } : null)}
                  placeholder="Ex: F32.1 - Episódio Depressivo Moderado"
                  className="bg-white border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Nível de Risco</Label>
                <Select
                  value={editingPlan?.riskLevel || 'low'}
                  onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => 
                    setEditingPlan(prev => prev ? { ...prev, riskLevel: value } : null)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 z-50">
                    {Object.entries(riskLevels).map(([key, level]) => (
                      <SelectItem key={key} value={key}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Objetivos Terapêuticos</Label>
                <Button size="sm" onClick={addObjective} variant="outline" className="border-gray-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Objetivo
                </Button>
              </div>
              
              {editingPlan?.objectives.map((objective, index) => (
                <Card key={index} className="border-gray-200 p-4">
                  <div className="space-y-3">
                    <Input
                      value={objective.goal}
                      onChange={(e) => updateObjective(index, 'goal', e.target.value)}
                      placeholder="Descreva o objetivo terapêutico"
                      className="bg-white border-gray-300"
                    />
                    <div className="flex gap-2 items-center">
                      <Input
                        type="date"
                        value={objective.deadline}
                        onChange={(e) => updateObjective(index, 'deadline', e.target.value)}
                        className="bg-white border-gray-300"
                      />
                      <Button
                        size="sm"
                        variant={objective.achieved ? "default" : "outline"}
                        onClick={() => updateObjective(index, 'achieved', !objective.achieved)}
                        className={objective.achieved ? "bg-green-600 hover:bg-green-700" : "border-gray-300"}
                      >
                        {objective.achieved ? <CheckCircle className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="techniques">Técnicas Utilizadas</Label>
              <div className="flex flex-wrap gap-2">
                {commonTechniques.map((technique) => (
                  <Badge
                    key={technique}
                    className={`cursor-pointer border ${
                      editingPlan?.techniques.includes(technique)
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      if (!editingPlan) return;
                      const techniques = editingPlan.techniques.includes(technique)
                        ? editingPlan.techniques.filter(t => t !== technique)
                        : [...editingPlan.techniques, technique];
                      setEditingPlan({ ...editingPlan, techniques });
                    }}
                  >
                    {technique}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        treatmentPlan && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">Visão Geral</TabsTrigger>
              <TabsTrigger value="objectives" className="data-[state=active]:bg-white">Objetivos</TabsTrigger>
              <TabsTrigger value="techniques" className="data-[state=active]:bg-white">Técnicas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700">Diagnóstico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {treatmentPlan.diagnosis.map((diag, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                          {diag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700">Nível de Risco</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={`${riskLevels[treatmentPlan.riskLevel].color} border flex items-center gap-2`}>
                      <AlertTriangle className="w-4 h-4" />
                      {riskLevels[treatmentPlan.riskLevel].label}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Progresso Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Objetivos Alcançados</span>
                      <span className="font-medium text-gray-900">
                        {treatmentPlan.objectives.filter(obj => obj.achieved).length} de {treatmentPlan.objectives.length}
                      </span>
                    </div>
                    <Progress value={calculateProgress()} className="h-3" />
                    <p className="text-sm text-gray-500">
                      {calculateProgress().toFixed(0)}% dos objetivos alcançados
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4">
              <div className="space-y-3">
                {treatmentPlan.objectives.map((objective, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{objective.goal}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Prazo: {new Date(objective.deadline).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge className={`${
                          objective.achieved 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        } border flex items-center gap-1`}>
                          {objective.achieved ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Alcançado
                            </>
                          ) : (
                            <>
                              <Target className="w-4 h-4" />
                              Em Progresso
                            </>
                          )}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="techniques" className="space-y-4">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Técnicas Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {treatmentPlan.techniques.map((technique, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200">
                        {technique}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
      )}
    </div>
  );
};

export default TreatmentPlanManager;
