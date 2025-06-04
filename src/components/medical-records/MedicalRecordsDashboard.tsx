import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Heart,
  Bell
} from "lucide-react";
import { usePatientStore } from '@/store/patientStore';
import PatientDashboard from './PatientDashboard';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { Link } from 'react-router-dom';

const MedicalRecordsDashboard = () => {
  const { patients, selectedPatient, setSelectedPatient } = usePatientStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Converter ComplexPatient para ComprehensivePatient
  const convertToComprehensive = (complexPatient: any): ComprehensivePatient => {
    return {
      ...complexPatient,
      medicalHistory: {
        allergies: complexPatient.medicalHistory.allergies || [],
        currentMedications: complexPatient.medicalHistory.currentMedications || [],
        chronicConditions: complexPatient.medicalHistory.chronicConditions || [],
        surgeries: complexPatient.medicalHistory.surgeries || [],
        medicalExams: [],
        medications: [],
        detailedSurgeries: [],
        familyHistory: [],
        hospitalizations: [],
        vaccinationHistory: []
      },
      psychologicalProfile: {
        personalityTraits: [],
        copingStrategies: [],
        stressors: [],
        supportNetwork: {
          family: 3,
          friends: 2,
          professional: 4,
          community: 2
        },
        riskFactors: {
          suicide: 'low',
          selfHarm: 'low',
          substance: 'low',
          violence: 'low'
        },
        resilenceFactors: []
      },
      scaleApplications: [],
      clinicalNotes: [],
      alerts: [],
      socialHistory: {
        education: complexPatient.education || '',
        occupation: complexPatient.occupation || '',
        maritalStatus: complexPatient.maritalStatus || '',
        children: 0,
        livingArrangement: '',
        socioeconomicStatus: complexPatient.income || ''
      }
    };
  };

  // Filtrar pacientes
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || patient.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calcular estatísticas
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const highPriorityPatients = patients.filter(p => p.priority === 'high' || p.priority === 'urgent').length;
  const averageMood = patients.reduce((acc, p) => acc + p.averageMood, 0) / patients.length;

  const handlePatientSelect = (patient: any) => {
    const comprehensivePatient = convertToComprehensive(patient);
    setSelectedPatient(comprehensivePatient);
  };

  const handleUpdatePatient = (updatedPatient: ComprehensivePatient) => {
    setSelectedPatient(updatedPatient);
    // Aqui você poderia também atualizar no store se necessário
  };

  // Calculate all active alerts across all patients
  const getAllActiveAlerts = () => {
    return patients.reduce((allAlerts, patient) => {
      const patientData = convertToComprehensive(patient);
      const activeAlerts = patientData.alerts?.filter(alert => alert.active) || [];
      
      return [
        ...allAlerts,
        ...activeAlerts.map(alert => ({
          ...alert,
          patientId: patient.id,
          patientName: patient.name
        }))
      ];
    }, [] as any[]).sort((a, b) => {
      const severityMap = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityMap[b.severity as keyof typeof severityMap] - severityMap[a.severity as keyof typeof severityMap];
    }).slice(0, 5);
  };

  const recentAlerts = getAllActiveAlerts();

  if (selectedPatient) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPatient(null)}
            className="mb-4"
          >
            ← Voltar para Lista
          </Button>
        </div>
        <PatientDashboard 
          patient={selectedPatient} 
          onUpdatePatient={handleUpdatePatient}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Prontuários</h1>
          <p className="text-gray-600">Gerencie prontuários médicos e psicológicos</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Prontuário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pacientes Ativos</p>
                <p className="text-3xl font-bold text-green-600">{activePatients}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alta Prioridade</p>
                <p className="text-3xl font-bold text-red-600">{highPriorityPatients}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humor Médio</p>
                <p className="text-3xl font-bold text-purple-600">{averageMood.toFixed(1)}/10</p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alertas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => {
                const getSeverityColor = (severity: string) => {
                  switch (severity) {
                    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
                    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
                    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                    case 'low': return 'bg-green-100 text-green-800 border-green-200';
                    default: return 'bg-gray-100 text-gray-800 border-gray-200';
                  }
                };

                return (
                  <div 
                    key={index} 
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      const patient = patients.find(p => p.id === alert.patientId);
                      if (patient) handlePatientSelect(patient);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-500' : alert.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'}`} />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-600">Paciente: {alert.patientName}</p>
                        </div>
                      </div>
                      <Badge className={`capitalize ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="discharged">Alta</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Prioridades</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Prontuários ({filteredPatients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
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
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">CPF:</span> {patient.cpf}
                      </div>
                      <div>
                        <span className="font-medium">Idade:</span> {patient.age} anos
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{patient.totalSessions} sessões</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>Humor: {patient.averageMood}/10</span>
                      </div>
                    </div>
                    
                    {patient.lastAppointment && (
                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Última consulta: {new Date(patient.lastAppointment).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Ver Prontuário
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum prontuário encontrado com os filtros aplicados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Link to Reports */}
      <div className="flex justify-end">
        <Link to="/relatorios">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Ver Relatórios Gerenciais
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MedicalRecordsDashboard;
