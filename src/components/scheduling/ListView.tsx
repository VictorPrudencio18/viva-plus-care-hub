
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, Phone, Video, MapPin, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Appointment {
  id: string;
  title: string;
  patient: string;
  professional: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  modality: 'presencial' | 'online' | 'hibrido';
  notes?: string;
  phone?: string;
}

interface ListViewProps {
  appointments: Appointment[];
  onAction: (action: string, appointmentId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ appointments, onAction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'online': return <Video className="w-4 h-4" />;
      case 'presencial': return <MapPin className="w-4 h-4" />;
      case 'hibrido': return <Phone className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Agendamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{appointment.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onAction('view', appointment.id)}>
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('edit', appointment.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('confirm', appointment.id)}>
                          Confirmar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('cancel', appointment.id)}>
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Paciente:</span>
                      <span>{appointment.patient}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Profissional:</span>
                      <span>{appointment.professional}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Data:</span>
                      <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Horário:</span>
                      <span>{appointment.time} ({appointment.duration}min)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      {getModalityIcon(appointment.modality)}
                      <span className="font-medium">Modalidade:</span>
                      <span className="capitalize">{appointment.modality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">Tipo:</span>
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <span className="font-medium">Observações:</span> {appointment.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ListView;
