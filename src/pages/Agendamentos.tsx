
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, List, BarChart3, Download } from "lucide-react";

// Components
import CalendarView from '@/components/scheduling/CalendarView';
import ListView from '@/components/scheduling/ListView';
import SchedulingFilters from '@/components/scheduling/SchedulingFilters';
import NewAppointmentDialog from '@/components/scheduling/NewAppointmentDialog';

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

interface FilterState {
  search: string;
  professional: string;
  status: string;
  type: string;
  modality: string;
  dateRange: string;
}

const Agendamentos = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Plantão Psicológico',
      patient: 'Maria Santos',
      professional: 'Dra. Ana Silva',
      date: '2024-01-15',
      time: '14:00',
      duration: 60,
      type: 'Plantão Psicológico',
      status: 'confirmed',
      modality: 'presencial',
      notes: 'Primeira consulta - ansiedade',
      phone: '(11) 99999-9999'
    },
    {
      id: '2',
      title: 'Consulta Médica',
      patient: 'João Silva',
      professional: 'Dr. João Santos',
      date: '2024-01-15',
      time: '09:30',
      duration: 45,
      type: 'Consulta Médica',
      status: 'scheduled',
      modality: 'online',
      notes: 'Exame de rotina'
    },
    {
      id: '3',
      title: 'Psicoterapia Breve',
      patient: 'Ana Costa',
      professional: 'Dra. Maria Costa',
      date: '2024-01-16',
      time: '16:00',
      duration: 60,
      type: 'Psicoterapia Breve',
      status: 'confirmed',
      modality: 'presencial',
      notes: 'Sessão de acompanhamento'
    },
    {
      id: '4',
      title: 'Avaliação Psicológica',
      patient: 'Pedro Lima',
      professional: 'Dra. Ana Silva',
      date: '2024-01-17',
      time: '10:00',
      duration: 90,
      type: 'Avaliação Psicológica',
      status: 'scheduled',
      modality: 'presencial',
      notes: 'Avaliação completa'
    }
  ]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    professional: '',
    status: '',
    type: '',
    modality: '',
    dateRange: ''
  });

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = !filters.search || 
        appointment.patient.toLowerCase().includes(filters.search.toLowerCase()) ||
        appointment.professional.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesProfessional = !filters.professional || appointment.professional === filters.professional;
      const matchesStatus = !filters.status || appointment.status === filters.status;
      const matchesType = !filters.type || appointment.type === filters.type;
      const matchesModality = !filters.modality || appointment.modality === filters.modality;
      
      // Date range filtering
      const today = new Date();
      const appointmentDate = new Date(appointment.date);
      let matchesDateRange = true;
      
      if (filters.dateRange === 'today') {
        matchesDateRange = appointmentDate.toDateString() === today.toDateString();
      } else if (filters.dateRange === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        matchesDateRange = appointmentDate >= weekStart && appointmentDate <= weekEnd;
      } else if (filters.dateRange === 'month') {
        matchesDateRange = appointmentDate.getMonth() === today.getMonth() && 
                           appointmentDate.getFullYear() === today.getFullYear();
      }

      return matchesSearch && matchesProfessional && matchesStatus && 
             matchesType && matchesModality && matchesDateRange;
    });
  }, [appointments, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      professional: '',
      status: '',
      type: '',
      modality: '',
      dateRange: ''
    });
  };

  const handleNewAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleAppointmentAction = (action: string, appointmentId: string) => {
    console.log(`Action: ${action} for appointment: ${appointmentId}`);
    // Implement action logic here
  };

  const getStats = () => {
    const total = filteredAppointments.length;
    const confirmed = filteredAppointments.filter(apt => apt.status === 'confirmed').length;
    const today = filteredAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length;
    const online = filteredAppointments.filter(apt => apt.modality === 'online').length;
    
    return { total, confirmed, today, online };
  };

  const stats = getStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie todas as consultas e sessões</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-bold text-blue-600">{stats.today}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online</p>
                <p className="text-2xl font-bold text-purple-600">{stats.online}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <SchedulingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Lista
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-6">
          <CalendarView
            appointments={filteredAppointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <ListView
            appointments={filteredAppointments}
            onAction={handleAppointmentAction}
          />
        </TabsContent>
      </Tabs>

      {/* New Appointment Dialog */}
      <NewAppointmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleNewAppointment}
      />
    </div>
  );
};

export default Agendamentos;
