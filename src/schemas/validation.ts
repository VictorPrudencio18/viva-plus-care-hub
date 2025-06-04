
import { z } from 'zod';

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha muito longa'),
});

// Schema para cadastro
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
  confirmPassword: z.string(),
  type: z.enum(['servidor', 'psicologo', 'medico'], {
    required_error: 'Tipo de usuário é obrigatório',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

// Schema para perfil
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
  email: z
    .string()
    .email('Email inválido'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .max(500, 'Bio muito longa')
    .optional(),
});

// Schema para agendamento
export const appointmentSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título muito longo'),
  description: z
    .string()
    .max(500, 'Descrição muito longa')
    .optional(),
  date: z
    .string()
    .min(1, 'Data é obrigatória')
    .refine((date) => {
      const appointmentDate = new Date(date);
      const now = new Date();
      return appointmentDate > now;
    }, 'Data deve ser no futuro'),
  time: z
    .string()
    .min(1, 'Horário é obrigatório')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato: HH:MM'),
  type: z.enum(['consulta', 'retorno', 'emergencia'], {
    required_error: 'Tipo de agendamento é obrigatório',
  }),
  professional: z
    .string()
    .min(1, 'Profissional é obrigatório'),
});

// Schema para humor (termômetro)
export const moodSchema = z.object({
  mood: z.enum(['excelente', 'bom', 'regular', 'ruim', 'muito-ruim'], {
    required_error: 'Humor é obrigatório',
  }),
  notes: z
    .string()
    .max(300, 'Notas muito longas')
    .optional(),
  date: z.string().optional(),
});

// Schema para questionário de humor
export const moodQuestionnaireSchema = z.object({
  responses: z.array(
    z.object({
      questionId: z.number(),
      value: z.number().min(1).max(10),
    })
  ).min(1, 'Responda pelo menos uma pergunta'),
});

// Tipos TypeScript derivados dos schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type MoodInput = z.infer<typeof moodSchema>;
export type MoodQuestionnaireInput = z.infer<typeof moodQuestionnaireSchema>;

// Utilitários de validação
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.reduce((acc, curr) => {
          const path = curr.path.join('.');
          acc[path] = curr.message;
          return acc;
        }, {} as Record<string, string>),
      };
    }
    return {
      success: false,
      data: null,
      errors: { general: 'Erro de validação desconhecido' },
    };
  }
};

// Hook para validação de formulários
export const useFormValidation = <T>(schema: z.ZodSchema<T>) => {
  const validate = (data: unknown) => validateForm(schema, data);
  
  const validateField = (fieldName: string, value: unknown) => {
    try {
      const fieldSchema = schema.shape?.[fieldName];
      if (fieldSchema) {
        fieldSchema.parse(value);
        return { isValid: true, error: null };
      }
      return { isValid: true, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0]?.message || 'Campo inválido' };
      }
      return { isValid: false, error: 'Erro de validação' };
    }
  };

  return { validate, validateField };
};
