
export interface PatientContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isEmergency: boolean;
}

export interface MedicalHistory {
  allergies: string[];
  currentMedications: string[];
  familyHistory: string[];
  surgeries: { date: string; procedure: string; hospital: string; }[];
  chronicConditions: string[];
}

export interface Assessment {
  id: string;
  type: string;
  date: string;
  score: number;
  maxScore: number;
  notes?: string;
}

export interface TherapySession {
  id: string;
  date: string;
  duration: number;
  type: 'individual' | 'group' | 'family' | 'online';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  mood: number;
  notes: string;
  interventions: string[];
  homework?: string;
  nextSession?: string;
  recordingUrl?: string;
}

export interface TreatmentPlan {
  id: string;
  diagnosis: string[];
  objectives: { goal: string; deadline: string; achieved: boolean; }[];
  techniques: string[];
  frequency: string;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  contraindications?: string[];
}

export interface ComplexPatient {
  id: string;
  // Dados básicos
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  
  // Dados demográficos
  birthDate: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  education: string;
  occupation: string;
  income?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Sistema de saúde
  healthInsurance?: {
    provider: string;
    cardNumber: string;
    validUntil: string;
  };
  
  // Histórico médico
  medicalHistory: MedicalHistory;
  
  // Contatos
  contacts: PatientContact[];
  
  // Status do tratamento
  status: 'active' | 'inactive' | 'discharged' | 'dropped-out' | 'referred';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Primeira consulta
  firstAppointment: string;
  lastAppointment?: string;
  
  // Avaliações
  assessments: Assessment[];
  
  // Sessões
  sessions: TherapySession[];
  
  // Plano de tratamento
  treatmentPlan?: TreatmentPlan;
  
  // Observações gerais
  generalNotes: string;
  
  // Dados técnicos
  createdAt: string;
  updatedAt: string;
  psychologistId: string;
  
  // Avatar e documentos
  avatar?: string;
  documents: { type: string; url: string; uploadedAt: string; }[];
  
  // Métricas
  totalSessions: number;
  averageMood: number;
  adherenceRate: number;
  improvementRate: number;
}
