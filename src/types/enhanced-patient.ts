
import { ComplexPatient, MedicalHistory, PatientContact, Assessment, TherapySession, TreatmentPlan } from './patient';
import { MedicalExam, Medication, Surgery, FamilyHistory, ScaleApplication } from './medical';

export interface EnhancedMedicalHistory extends MedicalHistory {
  medicalExams: MedicalExam[];
  medications: Medication[];
  surgeries: Surgery[];
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

export interface EnhancedTherapySession extends TherapySession {
  objectives: string[];
  techniques: string[];
  homework: {
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

export interface ComprehensivePatient extends ComplexPatient {
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
