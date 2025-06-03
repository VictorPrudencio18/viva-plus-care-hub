
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, TrendingUp, Calendar, AlertTriangle, Sparkles, Brain, Smile } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Termometro = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    { categoria: 'Bom', valor: 45, cor: '#10b981' },
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
    { emoji: "😄", label: "Excelente", value: "excelente", color: "from-green-400 to-green-600" },
    { emoji: "😊", label: "Bom", value: "bom", color: "from-blue-400 to-blue-600" },
    { emoji: "😐", label: "Regular", value: "regular", color: "from-orange-400 to-orange-600" },
    { emoji: "😟", label: "Ruim", value: "ruim", color: "from-red-400 to-red-600" },
    { emoji: "😢", label: "Muito Ruim", value: "muito-ruim", color: "from-red-600 to-red-800" }
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
    if (lastWeek.humor >= 8) return { status: 'Excelente', color: 'from-green-400 to-green-600', textColor: 'text-green-700' };
    if (lastWeek.humor >= 6) return { status: 'Bom', color: 'from-blue-400 to-blue-600', textColor: 'text-blue-700' };
    if (lastWeek.humor >= 4) return { status: 'Regular', color: 'from-orange-400 to-orange-600', textColor: 'text-orange-700' };
    return { status: 'Atenção', color: 'from-red-400 to-red-600', textColor: 'text-red-700' };
  };

  const humorStatus = getHumorStatus();

  return (
    <div className="min-h-screen bg-gradient-therapeutic p-6 space-y-8">
      {/* Header Moderno */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Termômetro de Humor
              </h1>
              <p className="text-gray-600 text-lg">Monitore seu bem-estar emocional com elegância</p>
            </div>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-6 rounded-2xl">
              <Heart className="w-5 h-5 mr-2" />
              <Sparkles className="w-4 h-4 mr-2" />
              Responder Questionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Smile className="w-6 h-6 text-blue-500" />
                Questionário Semanal de Humor
              </DialogTitle>
              <DialogDescription className="text-base">
                Suas respostas nos ajudam a cuidar melhor do seu bem-estar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-8 py-6">
              {perguntas.map((pergunta, index) => (
                <div key={index} className="space-y-4 p-4 rounded-2xl bg-gradient-calm">
                  <Label className="text-base font-medium text-gray-800">{pergunta}</Label>
                  <RadioGroup defaultValue="" className="grid grid-cols-5 gap-2">
                    {[1, 3, 5, 7, 10].map((value, idx) => {
                      const labels = ["Muito Ruim", "Ruim", "Regular", "Bom", "Excelente"];
                      return (
                        <div key={value} className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/50 transition-colors">
                          <RadioGroupItem value={value.toString()} id={`q${index}-${value}`} className="scale-125" />
                          <Label htmlFor={`q${index}-${value}`} className="text-xs text-center font-medium">
                            {labels[idx]}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                Cancelar
              </Button>
              <Button onClick={handleSubmitQuestionario} className="bg-gradient-primary rounded-xl">
                Enviar Respostas
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Seletor de Humor Moderno */}
      <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">Como você está se sentindo hoje?</CardTitle>
          <CardDescription className="text-lg">Selecione o emoji que melhor representa seu humor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`
                  p-6 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2
                  ${selectedMood === mood.value 
                    ? `bg-gradient-to-br ${mood.color} shadow-2xl scale-105` 
                    : 'bg-white/50 hover:bg-white/80 shadow-lg'
                  }
                `}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl transition-transform duration-300 hover:scale-125">
                    {mood.emoji}
                  </div>
                  <p className={`text-sm font-medium ${selectedMood === mood.value ? 'text-white' : 'text-gray-700'}`}>
                    {mood.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cards de Status Modernos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card hover-lift rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Status Atual</CardTitle>
            <Heart className="h-5 w-5 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${humorStatus.color} text-white font-semibold shadow-lg`}>
              {humorStatus.status}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Última Avaliação</CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">8/10</div>
            <p className="text-sm text-gray-600">há 3 dias</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Tendência</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+15%</div>
            <p className="text-sm text-gray-600">melhoria nas últimas 4 semanas</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Alertas</CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-sm text-gray-600">nenhum alerta ativo</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Modernos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Evolução do Humor</CardTitle>
            <CardDescription className="text-base">
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
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="humor" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Humor"
                />
                <Line 
                  type="monotone" 
                  dataKey="estresse" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  name="Estresse"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Distribuição por Categoria</CardTitle>
            <CardDescription className="text-base">
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
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="valor" 
                  fill="url(#colorGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Metas de Bem-estar Modernizadas */}
      <Card className="glass-effect border-0 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Metas de Bem-estar</CardTitle>
          <CardDescription className="text-lg">
            Acompanhe seu progresso nas diferentes áreas da vida
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {[
            { label: "Estabilidade Emocional", value: 75, color: "from-blue-400 to-blue-600" },
            { label: "Gestão do Estresse", value: 60, color: "from-green-400 to-green-600" },
            { label: "Qualidade do Sono", value: 85, color: "from-purple-400 to-purple-600" },
            { label: "Relacionamentos", value: 90, color: "from-pink-400 to-pink-600" }
          ].map((meta, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold text-gray-800">{meta.label}</Label>
                <span className="text-lg font-bold text-gray-700">{meta.value}%</span>
              </div>
              <div className="relative">
                <Progress value={meta.value} className="h-3 rounded-full bg-gray-200" />
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${meta.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${meta.value}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Termometro;
