
// Design Tokens Semânticos - Sistema Viva+ Enterprise
export const designTokens = {
  // Cores Terapêuticas - Baseadas em psicologia das cores
  colors: {
    // Cores Primárias - Confiança e Serenidade
    primary: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc', // Cor principal - transmite confiança
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
    
    // Cores Secundárias - Crescimento e Harmonia
    secondary: {
      50: '#e6fff9',
      100: '#b3ffe6',
      200: '#80ffd3',
      300: '#4dffc0',
      400: '#1affad',
      500: '#00b3a6', // Verde-azulado terapêutico
      600: '#008f85',
      700: '#006b64',
      800: '#004742',
      900: '#002321',
    },
    
    // Cores de Acentuação - Energia Positiva
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80', // Verde vibrante - esperança
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Cores de Estado Emocional
    emotional: {
      // Estados críticos - vermelhos suaves
      urgent: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      
      // Estados de alerta - laranjas terapêuticos
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      
      // Estados positivos - verdes calmantes
      positive: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      
      // Estados neutros - azuis serenos
      neutral: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
    },
    
    // Gradientes Terapêuticos
    gradients: {
      wellness: 'linear-gradient(135deg, #0066CC 0%, #00B3A6 50%, #4ADE80 100%)',
      calm: 'linear-gradient(135deg, #e6f3ff 0%, #f0fdf4 100%)',
      energy: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      focus: 'linear-gradient(135deg, #0066cc 0%, #1a8cff 100%)',
      therapeutic: 'linear-gradient(135deg, #f8fafc 0%, #e6f3ff 50%, #f0fdf4 100%)',
    },
  },
  
  // Tipografia Semântica
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'Times New Roman', 'serif'],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      therapeutic: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'], // Fontes que reduzem fadiga visual
    },
    
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px - tamanho base acessível
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    
    lineHeights: {
      tight: '1.25',
      normal: '1.5',    // Ideal para leitura confortável
      relaxed: '1.75',  // Para textos terapêuticos
      loose: '2',
    },
    
    fontWeights: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',    // Peso ideal para UI
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Espaçamento Harmônico - Baseado em proporção áurea
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px - unidade base
    lg: '1.618rem',  // 26px - proporção áurea
    xl: '2.618rem',  // 42px - proporção áurea
    '2xl': '4.236rem', // 68px
    '3xl': '6.854rem', // 110px
    '4xl': '11.09rem', // 178px
  },
  
  // Bordas e Cantos Terapêuticos
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px - ideal para componentes
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px - cantos suaves
    '2xl': '1.5rem', // 24px
    full: '9999px',  // círculo completo
    therapeutic: '0.625rem', // 10px - ideal para reduzir ansiedade
  },
  
  // Sombras Terapêuticas - Criam profundidade sem agressividade
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    therapeutic: '0 8px 32px rgba(0, 102, 204, 0.1), 0 4px 16px rgba(0, 179, 166, 0.08)',
    glow: '0 0 20px rgba(74, 222, 128, 0.3)',
  },
  
  // Animações Terapêuticas
  animations: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      therapeutic: '800ms', // Ritmo calmante
    },
    
    easings: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      therapeutic: 'cubic-bezier(0.4, 0, 0.2, 1)', // Suave e natural
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  // Breakpoints Responsivos
  breakpoints: {
    xs: '320px',   // Mobile pequeno
    sm: '640px',   // Mobile
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Desktop grande
    '2xl': '1536px', // Desktop ultra-wide
  },
};

// Tokens específicos para acessibilidade
export const accessibilityTokens = {
  // Contraste mínimo AAA
  contrastRatios: {
    normal: 4.5,
    large: 3,
    aaa: 7,
  },
  
  // Tamanhos mínimos de toque (iOS/Android guidelines)
  touchTargets: {
    minimum: '44px',
    comfortable: '48px',
    optimal: '56px',
  },
  
  // Tempos de foco para diferentes necessidades
  focusTimings: {
    fast: '100ms',
    normal: '200ms',
    slow: '500ms',
  },
};

export default designTokens;
