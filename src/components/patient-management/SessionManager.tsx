
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  FileText, 
  Plus, 
  Edit,
  Heart,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { TherapySession } from '@/types/patient';

interface SessionManagerProps {
  sessions: TherapySession[];
  onAddSession: (session: Omit<TherapySession, 'id'>) => void;
  onUpdateSession: (sessionId: string, session: Partial<TherapySession>) => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ 
  sessions, 
  onAddSession, 
  onUpdateSession 
}) => {
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [newSession, setNewSession] = useState<Partial<TherapySession>>({
    date: new Date().toISOString().split('T')[0],
    duration: 50,
    type: 'individual',
    status: 'scheduled',
    mood: 5,
    notes: '',
    interventions: [],
    homework: ''
  });

  const sessionTypes = {
    individual: { label: 'Individual', icon: Users, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    group: { label: 'Grupo', icon: Users, color: 'bg-green-100 text-green-800 border-green-200' },
    family: { label: 'Familiar', icon: Users, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    online: { label: 'Online', icon: Video, color: 'bg-orange-100 text-orange-800 border-orange-200' }
  };

  const sessionStatuses = {
    scheduled: { label: 'Agendada', icon: Calendar, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    completed: { label: 'Concluída', icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' },
    cancelled: { label: 'Cancelada', icon: XCircle, color: 'bg-red-100 text-red-800 border-red-200' },
    'no-show': { label: 'Falta', icon: AlertCircle, color: 'bg-orange-100 text-orange-800 border-orange-200' }
  };

  const interventions = [
    'Reestruturação Cognitiva',
    'Exposição Gradual',
    'Relaxamento Progressivo',
    'Mindfulness',
    'Técnicas de Respiração',
    'Registro de Pensamentos',
    'Experimentos Comportamentais',
    'Role-playing',
    'Psicoeducação',
    'Técnicas de Assertividade'
  ];

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-red-600';
    if (mood <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMoodTrend = (currentMood: number, previousMood?: number) => {
    if (!previousMood) return null;
    if (currentMood > previousMood) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (currentMood < previousMood) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const handleCreateSession = () => {
    if (newSession.date && newSession.notes) {
      onAddSession(newSession as Omit<TherapySession, 'id'>);
      setIsNewSessionOpen(false);
      setNewSession({
        date: new Date().toISOString().split('T')[0],
        duration: 50,
        type: 'individual',
        status: 'scheduled',
        mood: 5,
        notes: '',
        interventions: [],
        homework: ''
      });
    }
  };

  const sortedSessions = sessions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const completedSessions = sessions.filter(s => s.status === 'completed');
  const averageMood = completedSessions.length > 0 
    ? completedSessions.reduce((acc, s) => acc + s.mood, 0) / completedSessions.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Sessões Terapêuticas</h3>
        <Dialog open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Sessão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle>Registrar Nova Sessão</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionDate">Data da Sessão</Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    className="bg-white border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionDuration">Duração (minutos)</Label>
                  <Input
                    id="sessionDuration"
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionType">Tipo de Sessão</Label>
                  <Select
                    value={newSession.type}
                    onValueChange={(value: 'individual' | 'group' | 'family' | 'online') => 
                      setNewSession({ ...newSession, type: value })
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 z-50">
                      {Object.entries(sessionTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionMood">Humor do Paciente (1-10)</Label>
                  <Input
                    id="sessionMood"
                    type="number"
                    min="1"
                    max="10"
                    value={newSession.mood}
                    onChange={(e) => setNewSession({ ...newSession, mood: parseInt(e.target.value) })}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Intervenções Utilizadas</Label>
                <div className="flex flex-wrap gap-2">
                  {interventions.map((intervention) => (
                    <Badge
                      key={intervention}
                      className={`cursor-pointer border ${
                        newSession.interventions?.includes(intervention)
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        const current = newSession.interventions || [];
                        const updated = current.includes(intervention)
                          ? current.filter(i => i !== intervention)
                          : [...current, intervention];
                        setNewSession({ ...newSession, interventions: updated });
                      }}
                    >
                      {intervention}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionNotes">Observações da Sessão</Label>
                <Textarea
                  id="sessionNotes"
                  value={newSession.notes}
                  onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                  placeholder="Descreva o que foi trabalhado na sessão, evolução do paciente, observações importantes..."
                  rows={4}
                  className="bg-white border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionHomework">Tarefa para Casa</Label>
                <Textarea
                  id="sessionHomework"
                  value={newSession.homework}
                  onChange={(e) => setNewSession({ ...newSession, homework: e.target.value })}
                  placeholder="Descreva as atividades ou exercícios para o paciente realizar até a próxima sessão..."
                  rows={3}
                  className="bg-white border-gray-300"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewSessionOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSession} className="bg-blue-600 hover:bg-blue-700">
                  Registrar Sessão
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas das Sessões */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600">Total de Sessões</p>
            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600">Sessões Concluídas</p>
            <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-4 text-center">
            <Heart className={`w-8 h-8 mx-auto mb-2 ${getMoodColor(averageMood)}`} />
            <p className="text-sm text-gray-600">Humor Médio</p>
            <p className={`text-2xl font-bold ${getMoodColor(averageMood)}`}>
              {averageMood.toFixed(1)}/10
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600">Tempo Total</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(completedSessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Sessões */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Histórico de Sessões</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4">
              {sortedSessions.map((session, index) => {
                const previousSession = sortedSessions[index + 1];
                const sessionType = sessionTypes[session.type];
                const sessionStatus = sessionStatuses[session.status];
                
                return (
                  <Card key={session.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <sessionType.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Sessão {sessionType.label}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {new Date(session.date).toLocaleDateString('pt-BR')} • {session.duration} min
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={`${sessionStatus.color} border`}>
                            <sessionStatus.icon className="w-3 h-3 mr-1" />
                            {sessionStatus.label}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Heart className={`w-4 h-4 ${getMoodColor(session.mood)}`} />
                            <span className={`text-sm font-medium ${getMoodColor(session.mood)}`}>
                              {session.mood}/10
                            </span>
                            {getMoodTrend(session.mood, previousSession?.mood)}
                          </div>
                        </div>
                      </div>
                      
                      {session.interventions.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Intervenções:</p>
                          <div className="flex flex-wrap gap-1">
                            {session.interventions.map((intervention, idx) => (
                              <Badge key={idx} className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                                {intervention}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-700 mb-3">{session.notes}</p>
                      
                      {session.homework && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-yellow-800 mb-1">Tarefa para Casa:</p>
                          <p className="text-sm text-yellow-700">{session.homework}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma sessão registrada ainda
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManager;
