
export interface MedicalExam {
  id: string;
  type: string;
  date: string;
  result: string;
  interpretation: string;
  doctor: string;
  fileUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'active' | 'suspended' | 'completed';
  notes?: string;
}

export interface Surgery {
  id: string;
  procedure: string;
  date: string;
  hospital: string;
  surgeon: string;
  anesthesia: string;
  complications?: string;
  recovery: string;
}

export interface FamilyHistory {
  id: string;
  relationship: string;
  condition: string;
  ageOfOnset?: number;
  status: 'alive' | 'deceased';
  notes?: string;
}

export interface PsychologicalScale {
  id: string;
  name: string;
  acronym: string;
  description: string;
  maxScore: number;
  interpretationRanges: {
    range: string;
    min: number;
    max: number;
    interpretation: string;
    severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'critical';
  }[];
}

export interface ScaleApplication {
  id: string;
  scaleId: string;
  patientId: string;
  appliedBy: string;
  date: string;
  score: number;
  subscores?: { [key: string]: number };
  interpretation: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'critical';
  notes?: string;
  nextApplicationDate?: string;
}
