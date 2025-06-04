
import React from 'react';
import SessionManager from '@/components/patient-management/SessionManager';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { TherapySession } from '@/types/patient';

interface SessionsTabProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ patient, onUpdatePatient }) => {
  const handleAddSession = (newSession: Omit<TherapySession, 'id'>) => {
    const sessionWithId: TherapySession = {
      ...newSession,
      id: `session_${Date.now()}`
    };

    const updatedPatient = {
      ...patient,
      sessions: [...patient.sessions, sessionWithId],
      totalSessions: patient.totalSessions + 1,
      lastAppointment: newSession.date
    };

    onUpdatePatient(updatedPatient);
  };

  const handleUpdateSession = (sessionId: string, updates: Partial<TherapySession>) => {
    const updatedSessions = patient.sessions.map(session =>
      session.id === sessionId ? { ...session, ...updates } : session
    );

    const updatedPatient = {
      ...patient,
      sessions: updatedSessions
    };

    onUpdatePatient(updatedPatient);
  };

  return (
    <div className="space-y-6">
      <SessionManager
        sessions={patient.sessions}
        onAddSession={handleAddSession}
        onUpdateSession={handleUpdateSession}
      />
    </div>
  );
};

export default SessionsTab;
