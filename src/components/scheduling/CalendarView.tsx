
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

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
}

interface CalendarViewProps {
  appointments: Appointment[];
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ appointments, selectedDate, onDateSelect }) => {
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

  const todayAppointments = appointments.filter(
    apt => apt.date === selectedDate?.toISOString().split('T')[0]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Agendamentos - {selectedDate?.toLocaleDateString('pt-BR')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum agendamento para esta data
            </p>
          ) : (
            todayAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{appointment.title}</h4>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{appointment.patient}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time} ({appointment.duration}min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{appointment.professional}</span>
                    <span>•</span>
                    <span className="capitalize">{appointment.modality}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
