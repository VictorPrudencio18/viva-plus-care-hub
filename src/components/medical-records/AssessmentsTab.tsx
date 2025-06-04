
import React, { useState } from 'react';
import PatientAssessments from '@/components/patient-management/PatientAssessments';
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { Assessment } from '@/types/patient';

interface AssessmentsTabProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ patient, onUpdatePatient }) => {
  const handleAddAssessment = (newAssessment: Omit<Assessment, 'id'>) => {
    const assessmentWithId: Assessment = {
      ...newAssessment,
      id: `assessment_${Date.now()}`
    };

    const updatedPatient = {
      ...patient,
      assessments: [...patient.assessments, assessmentWithId]
    };

    onUpdatePatient(updatedPatient);
  };

  return (
    <div className="space-y-6">
      <PatientAssessments
        assessments={patient.assessments}
        onAddAssessment={handleAddAssessment}
      />
    </div>
  );
};

export default AssessmentsTab;
