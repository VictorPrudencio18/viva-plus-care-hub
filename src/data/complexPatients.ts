
import { ComplexPatient } from '@/types/patient';

export const complexPatients: ComplexPatient[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    birthDate: "1988-03-15",
    age: 35,
    gender: "male",
    maritalStatus: "married",
    education: "Ensino Superior Completo",
    occupation: "Desenvolvedor de Software",
    income: "R$ 8.000 - R$ 12.000",
    address: {
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    healthInsurance: {
      provider: "Amil",
      cardNumber: "123456789",
      validUntil: "2024-12-31"
    },
    medicalHistory: {
      allergies: ["Dipirona", "Penicilina"],
      currentMedications: ["Sertralina 50mg", "Alprazolam 0,25mg"],
      familyHistory: ["Depressão (mãe)", "Ansiedade (irmão)"],
      surgeries: [
        {
          date: "2019-05-20",
          procedure: "Apendicectomia",
          hospital: "Hospital São Paulo"
        }
      ],
      chronicConditions: ["Hipertensão Arterial"]
    },
    contacts: [
      {
        id: "1",
        name: "Maria Silva",
        relationship: "Esposa",
        phone: "(11) 88888-8888",
        email: "maria.silva@email.com",
        isEmergency: true
      },
      {
        id: "2",
        name: "José Silva",
        relationship: "Pai",
        phone: "(11) 77777-7777",
        isEmergency: false
      }
    ],
    status: "active",
    priority: "high",
    firstAppointment: "2023-10-01",
    lastAppointment: "2024-01-15",
    assessments: [
      {
        id: "1",
        type: "beck-depression",
        date: "2023-10-01",
        score: 28,
        maxScore: 63,
        notes: "Episódio depressivo moderado a grave"
      },
      {
        id: "2",
        type: "beck-depression",
        date: "2023-11-15",
        score: 22,
        maxScore: 63,
        notes: "Melhora parcial após início do tratamento"
      },
      {
        id: "3",
        type: "beck-depression",
        date: "2024-01-15",
        score: 15,
        maxScore: 63,
        notes: "Evolução favorável, sintomas mais leves"
      },
      {
        id: "4",
        type: "beck-anxiety",
        date: "2023-10-01",
        score: 32,
        maxScore: 63,
        notes: "Ansiedade severa"
      },
      {
        id: "5",
        type: "beck-anxiety",
        date: "2024-01-15",
        score: 18,
        maxScore: 63,
        notes: "Redução significativa da ansiedade"
      },
      {
        id: "6",
        type: "gaf",
        date: "2023-10-01",
        score: 45,
        maxScore: 100,
        notes: "Funcionamento comprometido"
      },
      {
        id: "7",
        type: "gaf",
        date: "2024-01-15",
        score: 65,
        maxScore: 100,
        notes: "Melhora no funcionamento global"
      }
    ],
    sessions: [
      {
        id: "1",
        date: "2024-01-15",
        duration: 50,
        type: "individual",
        status: "completed",
        mood: 7,
        notes: "Paciente relata melhora no sono e diminuição dos pensamentos negativos. Demonstra maior motivação para atividades do dia a dia. Trabalhamos reestruturação cognitiva focando em distorções catastróficas.",
        interventions: ["Reestruturação Cognitiva", "Psicoeducação"],
        homework: "Continuar registro de pensamentos automáticos e praticar técnicas de respiração 2x ao dia",
        nextSession: "2024-01-22"
      },
      {
        id: "2",
        date: "2024-01-08",
        duration: 50,
        type: "individual",
        status: "completed",
        mood: 6,
        notes: "Segunda sessão do tratamento. Paciente mais aberto, compartilhou detalhes sobre os triggers de ansiedade no trabalho. Iniciamos psicoeducação sobre ansiedade e depressão.",
        interventions: ["Psicoeducação", "Técnicas de Respiração"],
        homework: "Leitura do material sobre ansiedade e início do diário de humor",
        nextSession: "2024-01-15"
      },
      {
        id: "3",
        date: "2024-01-01",
        duration: 60,
        type: "individual",
        status: "completed",
        mood: 4,
        notes: "Primeira consulta. Anamnese completa realizada. Paciente apresenta sintomas de episódio depressivo moderado com componente ansioso significativo. Histórico de estresse laboral intenso nos últimos 6 meses.",
        interventions: ["Acolhimento", "Anamnese"],
        homework: "Preenchimento de questionários de autoavaliação",
        nextSession: "2024-01-08"
      }
    ],
    treatmentPlan: {
      id: "1",
      diagnosis: ["F32.1 - Episódio Depressivo Moderado", "F41.1 - Transtorno de Ansiedade Generalizada"],
      objectives: [
        {
          goal: "Reduzir sintomas depressivos em 50% (BDI-II < 14)",
          deadline: "2024-03-01",
          achieved: false
        },
        {
          goal: "Melhorar qualidade do sono (> 7h por noite)",
          deadline: "2024-02-15",
          achieved: true
        },
        {
          goal: "Retomar atividades prazerosas (pelo menos 3x por semana)",
          deadline: "2024-02-01",
          achieved: false
        },
        {
          goal: "Desenvolver estratégias de enfrentamento para estresse laboral",
          deadline: "2024-04-01",
          achieved: false
        }
      ],
      techniques: [
        "Terapia Cognitivo-Comportamental",
        "Reestruturação Cognitiva",
        "Técnicas de Relaxamento",
        "Psicoeducação",
        "Registro de Pensamentos"
      ],
      frequency: "Semanal",
      duration: "6 meses",
      riskLevel: "medium",
      contraindications: ["Evitar técnicas de exposição intensa no início do tratamento"]
    },
    generalNotes: "Paciente colaborativo e motivado para o tratamento. Boa adesão às tarefas propostas. Apoio familiar adequado. Necessita acompanhamento próximo devido ao histórico de ideação suicida negada atualmente.",
    createdAt: "2023-10-01T08:00:00Z",
    updatedAt: "2024-01-15T16:30:00Z",
    psychologistId: "psy_001",
    avatar: "/placeholder.svg",
    documents: [
      {
        type: "Atestado Médico",
        url: "/documents/atestado_joao.pdf",
        uploadedAt: "2023-10-01T10:00:00Z"
      }
    ],
    totalSessions: 15,
    averageMood: 6.2,
    adherenceRate: 87,
    improvementRate: 45
  },
  {
    id: "2",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    phone: "(11) 88888-8888",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    birthDate: "1995-08-22",
    age: 28,
    gender: "female",
    maritalStatus: "single",
    education: "Ensino Superior Completo",
    occupation: "Analista de Marketing",
    income: "R$ 4.000 - R$ 6.000",
    address: {
      street: "Av. Paulista, 456",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    healthInsurance: {
      provider: "SulAmérica",
      cardNumber: "987654321",
      validUntil: "2024-12-31"
    },
    medicalHistory: {
      allergies: [],
      currentMedications: ["Escitalopram 10mg"],
      familyHistory: ["Transtorno Bipolar (pai)"],
      surgeries: [],
      chronicConditions: []
    },
    contacts: [
      {
        id: "1",
        name: "Maria Costa",
        relationship: "Mãe",
        phone: "(11) 99999-9999",
        email: "maria.costa@email.com",
        isEmergency: true
      }
    ],
    status: "active",
    priority: "medium",
    firstAppointment: "2023-11-15",
    lastAppointment: "2024-01-12",
    assessments: [
      {
        id: "1",
        type: "beck-depression",
        date: "2023-11-15",
        score: 18,
        maxScore: 63,
        notes: "Episódio depressivo leve"
      },
      {
        id: "2",
        type: "beck-depression",
        date: "2024-01-12",
        score: 12,
        maxScore: 63,
        notes: "Melhora significativa"
      },
      {
        id: "3",
        type: "whoqol",
        date: "2023-11-15",
        score: 55,
        maxScore: 100,
        notes: "Qualidade de vida comprometida"
      },
      {
        id: "4",
        type: "whoqol",
        date: "2024-01-12",
        score: 72,
        maxScore: 100,
        notes: "Melhora na qualidade de vida"
      }
    ],
    sessions: [
      {
        id: "1",
        date: "2024-01-12",
        duration: 50,
        type: "individual",
        status: "completed",
        mood: 7,
        notes: "Paciente demonstra progresso significativo. Relata melhora no humor e maior interesse em atividades sociais. Trabalhamos consolidação das estratégias aprendidas.",
        interventions: ["Reestruturação Cognitiva", "Técnicas de Assertividade"],
        homework: "Praticar assertividade em situação social específica",
        nextSession: "2024-01-19"
      }
    ],
    treatmentPlan: {
      id: "2",
      diagnosis: ["F32.0 - Episódio Depressivo Leve"],
      objectives: [
        {
          goal: "Eliminar sintomas depressivos (BDI-II < 10)",
          deadline: "2024-02-15",
          achieved: false
        },
        {
          goal: "Melhorar habilidades sociais e assertividade",
          deadline: "2024-03-01",
          achieved: false
        }
      ],
      techniques: [
        "Terapia Cognitivo-Comportamental",
        "Técnicas de Assertividade",
        "Mindfulness"
      ],
      frequency: "Quinzenal",
      duration: "4 meses",
      riskLevel: "low"
    },
    generalNotes: "Paciente jovem, inteligente e com boa capacidade de insight. Responde bem ao tratamento.",
    createdAt: "2023-11-15T09:00:00Z",
    updatedAt: "2024-01-12T15:00:00Z",
    psychologistId: "psy_001",
    avatar: "/placeholder.svg",
    documents: [],
    totalSessions: 8,
    averageMood: 6.8,
    adherenceRate: 95,
    improvementRate: 60
  }
];
