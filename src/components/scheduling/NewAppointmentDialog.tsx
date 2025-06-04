
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Calendar, Clock, User, Video, MapPin, Phone } from "lucide-react";

interface NewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (appointment: any) => void;
}

const NewAppointmentDialog: React.FC<NewAppointmentDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    patient: '',
    professional: '',
    type: '',
    date: '',
    time: '',
    duration: '60',
    modality: 'presencial',
    notes: '',
    recurring: false,
    recurringPattern: 'weekly'
  });

  const professionals = [
    { id: '1', name: 'Dra. Ana Silva', specialty: 'Psicóloga', available: true },
    { id: '2', name: 'Dr. João Santos', specialty: 'Médico', available: true },
    { id: '3', name: 'Dra. Maria Costa', specialty: 'Psicóloga', available: false },
    { id: '4', name: 'Dr. Pedro Lima', specialty: 'Psiquiatra', available: true }
  ];

  const appointmentTypes = [
    'Plantão Psicológico',
    'Psicoterapia Breve',
    'Consulta Médica',
    'Dinâmica de Grupo',
    'Avaliação Psicológica',
    'Consulta de Retorno'
  ];

  const suggestedTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient || !formData.professional || !formData.type || !formData.date || !formData.time) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      title: formData.type,
      patient: formData.patient,
      professional: formData.professional,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      type: formData.type,
      status: 'scheduled' as const,
      modality: formData.modality as 'presencial' | 'online' | 'hibrido',
      notes: formData.notes
    };

    onSubmit(newAppointment);
    toast.success('Agendamento criado com sucesso!');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      patient: '',
      professional: '',
      type: '',
      date: '',
      time: '',
      duration: '60',
      modality: 'presencial',
      notes: '',
      recurring: false,
      recurringPattern: 'weekly'
    });
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>
            Agende uma nova consulta ou sessão
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente *</Label>
              <Input
                id="patient"
                placeholder="Nome do paciente"
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Profissional *</Label>
              <Select value={formData.professional} onValueChange={(value) => setFormData({ ...formData, professional: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((prof) => (
                    <SelectItem key={prof.id} value={prof.name} disabled={!prof.available}>
                      <div className="flex items-center justify-between w-full">
                        <span>{prof.name} - {prof.specialty}</span>
                        {prof.available ? (
                          <Badge variant="outline" className="ml-2">Disponível</Badge>
                        ) : (
                          <Badge variant="destructive" className="ml-2">Indisponível</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Consulta *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Horário *</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Horário" />
                </SelectTrigger>
                <SelectContent>
                  {suggestedTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duração (min)</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                  <SelectItem value="90">90 min</SelectItem>
                  <SelectItem value="120">120 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Modalidade</Label>
            <div className="grid grid-cols-3 gap-2">
              {['presencial', 'online', 'hibrido'].map((modality) => (
                <Button
                  key={modality}
                  type="button"
                  variant={formData.modality === modality ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, modality: modality as any })}
                  className="flex items-center gap-2"
                >
                  {getModalityIcon(modality)}
                  <span className="capitalize">{modality}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Observações adicionais sobre o agendamento..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Agendar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentDialog;
