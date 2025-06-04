
import React from 'react';
import SessionManager from '@/components/patient-management/SessionManager';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { TherapySession } from '@/types/patient';

interface SessionsTabProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ patient, onUpdatePatient }) => {
  // Convert EnhancedTherapySession to basic TherapySession for compatibility
  const basicSessions: TherapySession[] = patient.sessions.map(session => ({
    id: session.id,
    date: session.date,
    duration: session.duration,
    type: session.type,
    status: session.status,
    mood: session.mood,
    notes: session.notes,
    interventions: session.interventions,
    homework: Array.isArray(session.homeworkTasks) 
      ? session.homeworkTasks.map(task => task.description).join('; ')
      : session.homeworkTasks || '',
    nextSession: session.nextSession,
    recordingUrl: session.recordingUrl
  }));

  const handleAddSession = (newSession: Omit<TherapySession, 'id'>) => {
    const sessionWithId: TherapySession = {
      ...newSession,
      id: `session_${Date.now()}`
    };

    const enhancedSession = {
      ...sessionWithId,
      objectives: [],
      techniques: [],
      homeworkTasks: sessionWithId.homework ? [{ description: sessionWithId.homework, completed: false }] : [],
      nextSessionPlan: '',
      progressNotes: '',
      clinicalObservations: '',
      medications: {
        discussed: false,
        changes: [],
        adherence: 0
      }
    };

    const updatedPatient = {
      ...patient,
      sessions: [...patient.sessions, enhancedSession],
      totalSessions: patient.totalSessions + 1,
      lastAppointment: newSession.date
    };

    onUpdatePatient(updatedPatient);
  };

  const handleUpdateSession = (sessionId: string, updates: Partial<TherapySession>) => {
    const updatedSessions = patient.sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          ...updates,
          homeworkTasks: updates.homework 
            ? [{ description: updates.homework, completed: false }]
            : session.homeworkTasks
        };
      }
      return session;
    });

    const updatedPatient = {
      ...patient,
      sessions: updatedSessions
    };

    onUpdatePatient(updatedPatient);
  };

  return (
    <div className="space-y-6">
      <SessionManager
        sessions={basicSessions}
        onAddSession={handleAddSession}
        onUpdateSession={handleUpdateSession}
      />
    </div>
  );
};

export default SessionsTab;
