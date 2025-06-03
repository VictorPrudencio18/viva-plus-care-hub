
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, User, Phone } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EscalationProps {
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  onEscalate: (professionalType: string) => void;
}

export const EscalationSystem: React.FC<EscalationProps> = ({ urgencyLevel, onEscalate }) => {
  const getUrgencyConfig = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          color: 'bg-red-500',
          label: 'Crítico',
          description: 'Atenção imediata necessária',
          professionals: ['Psicólogo de Plantão', 'Médico Psiquiatra', 'Emergência 192']
        };
      case 'high':
        return {
          color: 'bg-orange-500',
          label: 'Alto',
          description: 'Prioridade alta - até 30 minutos',
          professionals: ['Psicólogo Disponível', 'Médico Clínico']
        };
      case 'medium':
        return {
          color: 'bg-yellow-500',
          label: 'Médio',
          description: 'Agendamento prioritário - até 2 horas',
          professionals: ['Psicólogo', 'Assistente Social']
        };
      default:
        return {
          color: 'bg-green-500',
          label: 'Baixo',
          description: 'Agendamento normal - até 24 horas',
          professionals: ['Psicólogo', 'Orientador de Bem-estar']
        };
    }
  };

  const config = getUrgencyConfig();

  const handleEscalation = (professionalType: string) => {
    onEscalate(professionalType);
    
    if (urgencyLevel === 'critical') {
      toast({
        title: "Protocolo de Emergência Ativado",
        description: `Conectando com ${professionalType} imediatamente...`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Solicitação Encaminhada",
        description: `Conectando com ${professionalType}...`,
      });
    }
  };

  return (
    <Card className="border-l-4" style={{ borderLeftColor: config.color.replace('bg-', '#') }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Escalonamento Automático
          </CardTitle>
          <Badge className={`${config.color} text-white`}>
            {config.label}
          </Badge>
        </div>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Profissionais disponíveis para atendimento:
          </p>
          <div className="space-y-2">
            {config.professionals.map((professional, index) => (
              <Button
                key={index}
                variant={urgencyLevel === 'critical' ? "destructive" : "outline"}
                className="w-full justify-start"
                onClick={() => handleEscalation(professional)}
              >
                {professional.includes('Emergência') ? (
                  <Phone className="w-4 h-4 mr-2" />
                ) : urgencyLevel === 'critical' ? (
                  <AlertTriangle className="w-4 h-4 mr-2" />
                ) : (
                  <User className="w-4 h-4 mr-2" />
                )}
                {professional}
                {urgencyLevel === 'critical' && (
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="w-3 h-3 mr-1" />
                    Imediato
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscalationSystem;
