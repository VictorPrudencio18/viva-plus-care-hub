
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity,
  AlertTriangle,
  Calendar,
  Heart,
  Pill,
  Scissors,
  Users,
  Plus,
  FileText
} from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';

interface MedicalHistoryTabProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({ patient }) => {
  const [activeHistoryTab, setActiveHistoryTab] = useState('medications');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Histórico Médico Detalhado</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Registro
        </Button>
      </div>

      <Tabs value={activeHistoryTab} onValueChange={setActiveHistoryTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="medications">Medicações</TabsTrigger>
          <TabsTrigger value="allergies">Alergias</TabsTrigger>
          <TabsTrigger value="surgeries">Cirurgias</TabsTrigger>
          <TabsTrigger value="family">Histórico Familiar</TabsTrigger>
          <TabsTrigger value="chronic">Condições Crônicas</TabsTrigger>
        </TabsList>

        <TabsContent value="medications" className="space-y-4">
          <div className="grid gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Pill className="w-5 h-5" />
                  Medicações Atuais ({patient.medicalHistory.currentMedications.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patient.medicalHistory.currentMedications.map((medication, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-green-200">
                      <div>
                        <h4 className="font-medium text-gray-900">{medication}</h4>
                        <p className="text-sm text-gray-600">Ativo desde início do tratamento</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Ativo
                      </Badge>
                    </div>
                  ))}
                  {patient.medicalHistory.currentMedications.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Nenhuma medicação atual registrada</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                Alergias Conhecidas ({patient.medicalHistory.allergies.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.medicalHistory.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{allergy}</h4>
                        <p className="text-sm text-gray-600">Reação alérgica conhecida</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      Crítico
                    </Badge>
                  </div>
                ))}
                {patient.medicalHistory.allergies.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma alergia conhecida</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surgeries" className="space-y-4">
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Scissors className="w-5 h-5" />
                Histórico Cirúrgico ({patient.medicalHistory.surgeries.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.medicalHistory.surgeries.map((surgery, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-purple-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{surgery.procedure}</h4>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {formatDate(surgery.date)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Hospital:</strong> {surgery.hospital}
                    </p>
                  </div>
                ))}
                {patient.medicalHistory.surgeries.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma cirurgia registrada</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                Histórico Familiar ({patient.medicalHistory.familyHistory.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.medicalHistory.familyHistory.map((family, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{family}</h4>
                        <p className="text-sm text-gray-600">Histórico familiar</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Familiar
                      </Badge>
                    </div>
                  </div>
                ))}
                {patient.medicalHistory.familyHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhum histórico familiar registrado</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chronic" className="space-y-4">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Activity className="w-5 h-5" />
                Condições Crônicas ({patient.medicalHistory.chronicConditions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.medicalHistory.chronicConditions.map((condition, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{condition}</h4>
                        <p className="text-sm text-gray-600">Condição crônica em acompanhamento</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        Crônica
                      </Badge>
                    </div>
                  </div>
                ))}
                {patient.medicalHistory.chronicConditions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma condição crônica registrada</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalHistoryTab;
