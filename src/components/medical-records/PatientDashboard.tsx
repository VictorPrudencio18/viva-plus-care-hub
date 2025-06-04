import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Heart, 
  Brain, 
  AlertTriangle, 
  Calendar, 
  FileText,
  TrendingUp,
  Shield,
  Phone,
  Mail,
  BarChart3
} from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';
import MedicalHistoryTab from './MedicalHistoryTab';
import SessionsTab from './SessionsTab';
import AssessmentsTab from './AssessmentsTab';
import ChartsTab from './ChartsTab';

interface PatientDashboardProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, onUpdatePatient }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getActiveAlerts = () => {
    return patient.alerts?.filter(alert => alert.active) || [];
  };

  const getRiskLevel = () => {
    if (!patient.psychologicalProfile) return 'low';
    
    const risks = patient.psychologicalProfile.riskFactors;
    const maxRisk = Math.max(
      ...Object.values(risks).map(risk => {
        switch(risk) {
          case 'critical': return 4;
          case 'high': return 3;
          case 'medium': return 2;
          case 'low': return 1;
          default: return 0;
        }
      })
    );
    
    if (maxRisk >= 4) return 'critical';
    if (maxRisk >= 3) return 'high';
    if (maxRisk >= 2) return 'medium';
    return 'low';
  };

  const getLastSession = () => {
    return patient.sessions.length > 0 
      ? patient.sessions[patient.sessions.length - 1]
      : null;
  };

  const activeAlerts = getActiveAlerts();
  const riskLevel = getRiskLevel();
  const lastSession = getLastSession();

  return (
    <div className="space-y-6">
      {/* Header with Patient Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600">{patient.age} anos • {patient.gender}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{patient.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={patient.status === 'active' ? 'default' : 'secondary'}
              className="capitalize"
            >
              {patient.status}
            </Badge>
            <Badge 
              variant={patient.priority === 'urgent' ? 'destructive' : 'outline'}
              className="capitalize"
            >
              {patient.priority}
            </Badge>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {activeAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">
                Alertas Ativos ({activeAlerts.length})
              </h3>
            </div>
            <div className="space-y-1">
              {activeAlerts.slice(0, 3).map(alert => (
                <p key={alert.id} className="text-sm text-orange-800">
                  • {alert.message}
                </p>
              ))}
              {activeAlerts.length > 3 && (
                <p className="text-sm text-orange-600 font-medium">
                  +{activeAlerts.length - 3} outros alertas
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessões Realizadas</p>
                <p className="text-2xl font-bold">{patient.totalSessions}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Humor Médio</p>
                <p className="text-2xl font-bold">{patient.averageMood}/10</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nível de Risco</p>
                <Badge 
                  variant={
                    riskLevel === 'critical' ? 'destructive' : 
                    riskLevel === 'high' ? 'destructive' : 
                    riskLevel === 'medium' ? 'secondary' : 'outline'
                  }
                  className="capitalize"
                >
                  {riskLevel}
                </Badge>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aderência</p>
                <p className="text-2xl font-bold">{patient.adherenceRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="assessments">Avaliações</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">CPF:</span>
                    <p className="text-gray-600">{patient.cpf}</p>
                  </div>
                  <div>
                    <span className="font-medium">RG:</span>
                    <p className="text-gray-600">{patient.rg}</p>
                  </div>
                  <div>
                    <span className="font-medium">Estado Civil:</span>
                    <p className="text-gray-600">{patient.maritalStatus}</p>
                  </div>
                  <div>
                    <span className="font-medium">Profissão:</span>
                    <p className="text-gray-600">{patient.occupation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Escolaridade:</span>
                    <p className="text-gray-600">{patient.education}</p>
                  </div>
                  <div>
                    <span className="font-medium">Convênio:</span>
                    <p className="text-gray-600">
                      {patient.healthInsurance?.provider || 'Particular'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Última Sessão */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Última Sessão
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lastSession ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Data:</span>
                      <span className="text-sm text-gray-600">
                        {new Date(lastSession.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tipo:</span>
                      <span className="text-sm text-gray-600">{lastSession.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Humor:</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">{lastSession.mood}/10</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Observações:</span>
                      <p className="text-sm text-gray-600 mt-1">{lastSession.notes}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Nenhuma sessão registrada
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Diagnósticos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Diagnósticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.treatmentPlan?.diagnosis.map((diagnosis, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {diagnosis}
                    </Badge>
                  )) || (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum diagnóstico registrado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medicações Atuais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Medicações Atuais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.medicalHistory.currentMedications.length > 0 ? (
                    patient.medicalHistory.currentMedications.map((medication, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-sm font-medium">{medication}</span>
                        <Badge variant="outline" className="text-xs">Ativo</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhuma medicação registrada
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <MedicalHistoryTab patient={patient} onUpdatePatient={onUpdatePatient} />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsTab patient={patient} onUpdatePatient={onUpdatePatient} />
        </TabsContent>

        <TabsContent value="assessments">
          <AssessmentsTab patient={patient} onUpdatePatient={onUpdatePatient} />
        </TabsContent>

        <TabsContent value="charts">
          <ChartsTab patient={patient} />
        </TabsContent>

        <TabsContent value="documents">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Documentos e Anexos
            </h3>
            <p className="text-gray-500">
              Seção em desenvolvimento - Documentos, exames e relatórios
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
