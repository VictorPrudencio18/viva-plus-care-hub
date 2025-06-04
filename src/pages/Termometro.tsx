import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, TrendingUp, Calendar, AlertTriangle, Sparkles, Brain, Smile, Activity, Target, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { TherapeuticCard } from "@/design-system/components/TherapeuticCard";
import { TherapeuticButton } from "@/design-system/components/TherapeuticButton";
import { TherapeuticBadge } from "@/design-system/components/TherapeuticBadge";
import { TherapeuticProgress } from "@/design-system/components/TherapeuticProgress";

const Termometro = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredEmoji, setHoveredEmoji] = useState("");

  const humorData = [
    { semana: 'S1', humor: 7, estresse: 4 },
    { semana: 'S2', humor: 6, estresse: 6 },
    { semana: 'S3', humor: 8, estresse: 3 },
    { semana: 'S4', humor: 5, estresse: 7 },
    { semana: 'S5', humor: 7, estresse: 5 },
    { semana: 'S6', humor: 6, estresse: 6 },
    { semana: 'S7', humor: 8, estresse: 4 },
    { semana: 'S8', humor: 9, estresse: 2 },
  ];

  const categoriaData = [
    { categoria: 'Excelente', valor: 25, cor: '#22c55e' },
    { categoria: 'Bom', valor: 45, cor: '#3b82f6' },
    { categoria: 'Regular', valor: 20, cor: '#f97316' },
    { categoria: 'Ruim', valor: 10, cor: '#ef4444' },
  ];

  const perguntas = [
    "Como você se sente em relação ao seu trabalho hoje?",
    "Qual é o seu nível de estresse nesta semana?",
    "Como está sua qualidade de sono?",
    "Como você avalia seu relacionamento com colegas?",
    "Qual é sua motivação para atividades pessoais?"
  ];

  const moodEmojis = [
    { 
      emoji: "😄", 
      label: "Excelente", 
      value: "excelente", 
      gradient: "from-emerald-400 via-green-500 to-emerald-600",
      shadow: "shadow-emerald-500/25",
      glow: "shadow-emerald-400/40",
      description: "Sentindo-me fantástico!",
      color: "emerald"
    },
    { 
      emoji: "😊", 
      label: "Bom", 
      value: "bom", 
      gradient: "from-blue-400 via-cyan-500 to-blue-600",
      shadow: "shadow-blue-500/25",
      glow: "shadow-blue-400/40",
      description: "Estou bem hoje",
      color: "blue"
    },
    { 
      emoji: "😐", 
      label: "Regular", 
      value: "regular", 
      gradient: "from-slate-400 via-gray-500 to-slate-600",
      shadow: "shadow-gray-500/25",
      glow: "shadow-gray-400/40",
      description: "Nem bem, nem mal",
      color: "gray"
    },
    { 
      emoji: "😟", 
      label: "Ruim", 
      value: "ruim", 
      gradient: "from-orange-400 via-amber-500 to-orange-600",
      shadow: "shadow-orange-500/25",
      glow: "shadow-orange-400/40",
      description: "Não estou bem",
      color: "orange"
    },
    { 
      emoji: "😢", 
      label: "Muito Ruim", 
      value: "muito-ruim", 
      gradient: "from-red-400 via-rose-500 to-red-600",
      shadow: "shadow-red-500/25",
      glow: "shadow-red-400/40",
      description: "Preciso de ajuda",
      color: "red"
    }
  ];

  const handleSubmitQuestionario = () => {
    toast({
      title: "Questionário enviado!",
      description: "Suas respostas foram registradas com sucesso.",
    });
    setIsDialogOpen(false);
  };

  const getHumorStatus = () => {
    const lastWeek = humorData[humorData.length - 1];
    if (lastWeek.humor >= 8) return { 
      status: 'Excelente', 
      gradient: 'from-emerald-400 to-green-600', 
      textColor: 'text-emerald-700',
      icon: '🌟'
    };
    if (lastWeek.humor >= 6) return { 
      status: 'Bom', 
      gradient: 'from-blue-400 to-cyan-600', 
      textColor: 'text-blue-700',
      icon: '😊'
    };
    if (lastWeek.humor >= 4) return { 
      status: 'Regular', 
      gradient: 'from-slate-400 to-gray-600', 
      textColor: 'text-gray-700',
      icon: '😐'
    };
    return { 
      status: 'Atenção', 
      gradient: 'from-orange-400 to-red-600', 
      textColor: 'text-red-700',
      icon: '⚠️'
    };
  };

  const humorStatus = getHumorStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="relative z-10 p-6 space-y-8 max-w-7xl mx-auto">
        {/* Header Modernizado */}
        <TherapeuticCard variant="glass" padding="lg" className="backdrop-blur-2xl border-white/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg animate-float">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                    Termômetro de Humor
                  </h1>
                  <p className="text-gray-600 text-xl mt-2">Monitore seu bem-estar emocional com inteligência</p>
                </div>
              </div>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <TherapeuticButton 
                  variant="therapeutic" 
                  size="lg"
                  leftIcon={<Heart className="w-6 h-6" />}
                  rightIcon={<Sparkles className="w-5 h-5" />}
                  className="text-lg px-8 py-6"
                >
                  Responder Questionário
                </TherapeuticButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] rounded-3xl border-0 bg-white/95 backdrop-blur-xl">
                <DialogHeader className="text-center space-y-4">
                  <DialogTitle className="text-3xl flex items-center justify-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-emerald-400">
                      <Smile className="w-8 h-8 text-white" />
                    </div>
                    Questionário Semanal de Humor
                  </DialogTitle>
                  <DialogDescription className="text-lg text-gray-600">
                    Suas respostas nos ajudam a cuidar melhor do seu bem-estar emocional
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-8 py-6 max-h-96 overflow-y-auto">
                  {perguntas.map((pergunta, index) => (
                    <div key={index} className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-emerald-50/50 border border-white/30">
                      <Label className="text-lg font-semibold text-gray-800 block">{pergunta}</Label>
                      <RadioGroup defaultValue="" className="grid grid-cols-5 gap-3">
                        {[1, 3, 5, 7, 10].map((value, idx) => {
                          const labels = ["Muito Ruim", "Ruim", "Regular", "Bom", "Excelente"];
                          const colors = ["bg-red-100 hover:bg-red-200", "bg-orange-100 hover:bg-orange-200", "bg-gray-100 hover:bg-gray-200", "bg-blue-100 hover:bg-blue-200", "bg-emerald-100 hover:bg-emerald-200"];
                          return (
                            <div key={value} className={`flex flex-col items-center space-y-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${colors[idx]}`}>
                              <RadioGroupItem value={value.toString()} id={`q${index}-${value}`} className="scale-125" />
                              <Label htmlFor={`q${index}-${value}`} className="text-sm text-center font-medium cursor-pointer">
                                {labels[idx]}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)} 
                    className="rounded-xl px-6 py-3 hover:bg-gray-50"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSubmitQuestionario} 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    Enviar Respostas
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TherapeuticCard>

        {/* Card Principal de Seleção de Humor Modernizado */}
        <TherapeuticCard variant="therapeutic" padding="lg">
          <CardHeader className="text-center pb-8 relative z-10">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Como você está se sentindo hoje?
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Selecione o emoji que melhor representa seu humor atual
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pb-8">
            <div className="grid grid-cols-5 gap-6">
              {moodEmojis.map((mood) => (
                <div
                  key={mood.value}
                  className="relative group"
                  onMouseEnter={() => setHoveredEmoji(mood.value)}
                  onMouseLeave={() => setHoveredEmoji("")}
                >
                  <TherapeuticButton
                    variant={selectedMood === mood.value ? "primary" : "ghost"}
                    size="xl"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`
                      relative w-full p-8 rounded-3xl transition-all duration-500 transform-gpu will-change-transform
                      ${selectedMood === mood.value 
                        ? `bg-gradient-to-br ${mood.gradient} shadow-2xl scale-110 ${mood.glow} shadow-2xl` 
                        : 'bg-white/60 hover:bg-white/80 shadow-lg hover:shadow-xl hover:scale-105'
                      }
                      ${hoveredEmoji === mood.value ? 'animate-bounce' : ''}
                      group-hover:-translate-y-3 backdrop-blur-sm border border-white/30
                    `}
                  >
                    <div className="text-center space-y-4 relative z-10">
                      <div className={`text-6xl transition-all duration-300 ${hoveredEmoji === mood.value ? 'animate-pulse scale-125' : ''}`}>
                        {mood.emoji}
                      </div>
                      <div>
                        <p className={`text-lg font-bold transition-colors duration-300 ${
                          selectedMood === mood.value ? 'text-white' : 'text-gray-800'
                        }`}>
                          {mood.label}
                        </p>
                        <p className={`text-sm transition-colors duration-300 ${
                          selectedMood === mood.value ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {mood.description}
                        </p>
                      </div>
                    </div>

                    {/* Indicador de seleção */}
                    {selectedMood === mood.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      </div>
                    )}
                  </TherapeuticButton>
                </div>
              ))}
            </div>

            {/* Feedback dinâmico */}
            {selectedMood && (
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 to-emerald-50/50 border border-white/30 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center justify-center gap-3">
                  <div className="text-2xl">
                    {moodEmojis.find(m => m.value === selectedMood)?.emoji}
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    Humor registrado: {moodEmojis.find(m => m.value === selectedMood)?.label}
                  </p>
                  <TherapeuticBadge variant="positive" size="sm">
                    ✓ Registrado
                  </TherapeuticBadge>
                </div>
              </div>
            )}
          </CardContent>
        </TherapeuticCard>

        {/* Cards de Status Modernizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Status Atual", 
              icon: Heart, 
              content: "Excelente", 
              subtitle: "humor estável",
              variant: "positive" as const,
              emoji: "🌟"
            },
            { 
              title: "Última Avaliação", 
              icon: Calendar, 
              content: "8/10", 
              subtitle: "há 3 dias",
              variant: "primary" as const,
              emoji: "📅"
            },
            { 
              title: "Tendência", 
              icon: TrendingUp, 
              content: "+15%", 
              subtitle: "melhoria nas últimas 4 semanas",
              variant: "secondary" as const,
              emoji: "📈"
            },
            { 
              title: "Alertas", 
              icon: AlertTriangle, 
              content: "0", 
              subtitle: "nenhum alerta ativo",
              variant: "neutral" as const,
              emoji: "🔔"
            }
          ].map((card, index) => (
            <TherapeuticCard key={index} variant="elevated" padding="md" className="hover:-translate-y-2 hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {card.title}
                </CardTitle>
                <div className="relative">
                  <card.icon className="h-5 w-5 text-gray-500" />
                  <div className="absolute -top-1 -right-1 text-xs">
                    {card.emoji}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <TherapeuticBadge variant={card.variant} size="lg" className="mb-2">
                  {card.content}
                </TherapeuticBadge>
                {card.subtitle && (
                  <p className="text-sm text-gray-600">
                    {card.subtitle}
                  </p>
                )}
              </CardContent>
            </TherapeuticCard>
          ))}
        </div>

        {/* Gráficos Modernos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TherapeuticCard variant="glass" padding="lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-500" />
                Evolução do Humor
              </CardTitle>
              <CardDescription className="text-lg">
                Acompanhe a variação do seu humor e estresse ao longo das semanas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={humorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="semana" stroke="#64748b" />
                  <YAxis domain={[0, 10]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humor" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    dot={{ fill: '#3b82f6', strokeWidth: 3, r: 8 }}
                    name="Humor"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="estresse" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    dot={{ fill: '#10b981', strokeWidth: 3, r: 8 }}
                    name="Estresse"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </TherapeuticCard>

          <TherapeuticCard variant="glass" padding="lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-500" />
                Distribuição por Categoria
              </CardTitle>
              <CardDescription className="text-lg">
                Porcentagem de tempo em cada categoria de humor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={categoriaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="categoria" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="url(#colorGradient)" 
                    radius={[12, 12, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </TherapeuticCard>
        </div>

        {/* Metas de Bem-estar Modernizadas */}
        <TherapeuticCard variant="therapeutic" padding="lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Target className="w-8 h-8 text-emerald-500" />
              Metas de Bem-estar
            </CardTitle>
            <CardDescription className="text-xl">
              Acompanhe seu progresso nas diferentes áreas da vida
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              { label: "Estabilidade Emocional", value: 75, emotion: "calm" as const, emoji: "🧠" },
              { label: "Gestão do Estresse", value: 60, emotion: "positive" as const, emoji: "🌱" },
              { label: "Qualidade do Sono", value: 85, emotion: "neutral" as const, emoji: "😴" },
              { label: "Relacionamentos", value: 90, emotion: "positive" as const, emoji: "❤️" }
            ].map((meta, index) => (
              <div key={index} className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meta.emoji}</span>
                    <Label className="text-lg font-bold text-gray-800">
                      {meta.label}
                    </Label>
                  </div>
                  <TherapeuticBadge variant="primary" size="sm">
                    {meta.value}%
                  </TherapeuticBadge>
                </div>
                <TherapeuticProgress 
                  value={meta.value} 
                  emotion={meta.emotion}
                  variant="therapeutic"
                  animated
                  glow
                  className="h-3"
                />
              </div>
            ))}
          </CardContent>
        </TherapeuticCard>
      </div>
    </div>
  );
};

export default Termometro;
