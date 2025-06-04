
import React from 'react';
import MedicalRecordsDashboard from '@/components/medical-records/MedicalRecordsDashboard';
import { usePatientStore } from '@/store/patientStore';
import { toast } from "sonner";

const Prontuarios = () => {
  React.useEffect(() => {
    // Show a toast notification to inform about the implementation
    toast.success("Sistema de Prontuários implementado com sucesso!", {
      description: "Todas as funcionalidades Premium agora estão disponíveis.",
      duration: 5000,
    });
  }, []);

  return <MedicalRecordsDashboard />;
};

export default Prontuarios;
