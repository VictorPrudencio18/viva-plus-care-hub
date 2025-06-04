
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Bell,
  Check,
  Plus,
  Calendar,
  FileText,
  Activity,
  Heart,
  Shield,
  X
} from "lucide-react";
import { ComprehensivePatient } from '@/types/enhanced-patient';

interface AlertsManagerProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

interface PatientAlert {
  id: string;
  type: 'medication' | 'risk' | 'appointment' | 'document' | 'evaluation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  active: boolean;
  createdAt: string;
  resolvedAt?: string;
}

const AlertsManager: React.FC<AlertsManagerProps> = ({ patient, onUpdatePatient }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active');

  const alerts: PatientAlert[] = patient.alerts || [];
  
  // Filter alerts based on the selected filter
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.active;
    return !alert.active; // resolved
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Heart className="w-5 h-5" />;
      case 'risk': return <AlertTriangle className="w-5 h-5" />;
      case 'appointment': return <Calendar className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'evaluation': return <Activity className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          active: false,
          resolvedAt: new Date().toISOString()
        };
      }
      return alert;
    });

    const updatedPatient = {
      ...patient,
      alerts: updatedAlerts
    };

    onUpdatePatient(updatedPatient);
  };

  const handleAddAlert = () => {
    // This would typically open a modal for adding a new alert
    // Here we'll just add a sample alert for demonstration
    const newAlert: PatientAlert = {
      id: `alert_${Date.now()}`,
      type: 'appointment',
      severity: 'medium',
      message: 'Lembrete: Agendar próxima sessão com o paciente',
      active: true,
      createdAt: new Date().toISOString()
    };

    const updatedPatient = {
      ...patient,
      alerts: [...alerts, newAlert]
    };

    onUpdatePatient(updatedPatient);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Alertas do Paciente</h3>
        </div>
        <Button onClick={handleAddAlert}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Alerta
        </Button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          Todos
        </Button>
        <Button 
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          size="sm"
          className={filter === 'active' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          <AlertTriangle className="w-4 h-4 mr-1" />
          Ativos
        </Button>
        <Button 
          variant={filter === 'resolved' ? 'default' : 'outline'}
          onClick={() => setFilter('resolved')}
          size="sm"
          className={filter === 'resolved' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          <Check className="w-4 h-4 mr-1" />
          Resolvidos
        </Button>
      </div>

      {/* Alert cards */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <Card key={alert.id} className={alert.active ? 'border-l-4 border-l-red-500' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`capitalize ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {alert.type}
                        </Badge>
                        {!alert.active && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Resolvido
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-900 font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        Criado em {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                        {alert.resolvedAt && ` • Resolvido em ${new Date(alert.resolvedAt).toLocaleDateString('pt-BR')}`}
                      </p>
                    </div>
                  </div>
                  {alert.active && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Resolver
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {filter === 'active' ? 'Nenhum alerta ativo' : 'Nenhum alerta resolvido'}
            </h3>
            <p className="text-gray-500">
              {filter === 'active' ? 'Não há alertas ativos para este paciente no momento.' : 'Não há alertas resolvidos para este paciente.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsManager;
