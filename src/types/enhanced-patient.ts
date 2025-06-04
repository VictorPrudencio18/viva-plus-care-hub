import { ComplexPatient, PatientContact, Assessment, TherapySession, TreatmentPlan } from './patient';
import { MedicalExam, Medication, Surgery, FamilyHistory, ScaleApplication } from './medical';

// Use composition instead of inheritance to avoid conflicts
export interface EnhancedMedicalHistory {
  // Keep compatible fields from base MedicalHistory
  allergies: string[];
  currentMedications: string[];
  chronicConditions: string[];
  surgeries: { date: string; procedure: string; hospital: string; }[];
  
  // Enhanced fields
  medicalExams: MedicalExam[];
  medications: Medication[];
  detailedSurgeries: Surgery[];
  familyHistory: FamilyHistory[];
  hospitalizations: {
    id: string;
    reason: string;
    hospital: string;
    admissionDate: string;
    dischargeDate: string;
    outcome: string;
  }[];
  vaccinationHistory: {
    id: string;
    vaccine: string;
    date: string;
    lot: string;
    administrator: string;
  }[];
}

export interface PsychologicalProfile {
  personalityTraits: string[];
  copingStrategies: string[];
  stressors: string[];
  supportNetwork: {
    family: number;
    friends: number;
    professional: number;
    community: number;
  };
  riskFactors: {
    suicide: 'low' | 'medium' | 'high' | 'critical';
    selfHarm: 'low' | 'medium' | 'high' | 'critical';
    substance: 'low' | 'medium' | 'high' | 'critical';
    violence: 'low' | 'medium' | 'high' | 'critical';
  };
  resilenceFactors: string[];
}

// Use composition for therapy sessions too
export interface EnhancedTherapySession {
  // Base session fields
  id: string;
  date: string;
  duration: number;
  type: 'individual' | 'group' | 'family' | 'online';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  mood: number;
  notes: string;
  interventions: string[];
  nextSession?: string;
  recordingUrl?: string;
  
  // Enhanced fields
  objectives: string[];
  techniques: string[];
  homeworkTasks: {
    description: string;
    completed: boolean;
    feedback?: string;
  }[];
  nextSessionPlan: string;
  progressNotes: string;
  clinicalObservations: string;
  medications: {
    discussed: boolean;
    changes: string[];
    adherence: number;
  };
}

export interface ComprehensivePatient extends Omit<ComplexPatient, 'medicalHistory' | 'sessions'> {
  medicalHistory: EnhancedMedicalHistory;
  psychologicalProfile: PsychologicalProfile;
  scaleApplications: ScaleApplication[];
  sessions: EnhancedTherapySession[];
  clinicalNotes: {
    id: string;
    date: string;
    type: 'evolution' | 'emergency' | 'consultation' | 'administrative';
    author: string;
    content: string;
    tags: string[];
  }[];
  alerts: {
    id: string;
    type: 'medication' | 'risk' | 'appointment' | 'document' | 'evaluation';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    active: boolean;
    createdAt: string;
    resolvedAt?: string;
  }[];
  socialHistory: {
    education: string;
    occupation: string;
    maritalStatus: string;
    children: number;
    livingArrangement: string;
    religiousBelief?: string;
    culturalBackground?: string;
    socioeconomicStatus: string;
  };
}
