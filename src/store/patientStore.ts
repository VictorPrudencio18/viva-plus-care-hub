
import { create } from 'zustand';
import { ComplexPatient } from '@/types/patient';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { complexPatients } from '@/data/complexPatients';

interface PatientStore {
  patients: ComplexPatient[];
  selectedPatient: ComprehensivePatient | null;
  setPatients: (patients: ComplexPatient[]) => void;
  setSelectedPatient: (patient: ComprehensivePatient | null) => void;
  updatePatient: (patientId: string, updates: Partial<ComplexPatient>) => void;
  getPatientById: (id: string) => ComplexPatient | undefined;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: complexPatients,
  selectedPatient: null,
  setPatients: (patients) => set({ patients }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  updatePatient: (patientId, updates) => 
    set((state) => ({
      patients: state.patients.map(p => 
        p.id === patientId ? { ...p, ...updates } : p
      )
    })),
  getPatientById: (id) => get().patients.find(p => p.id === id),
}));
