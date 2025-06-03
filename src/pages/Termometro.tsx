
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

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
    { categoria: 'Bom', valor: 45, cor: '#84cc16' },
    { categoria: 'Regular', valor: 20, cor: '#eab308' },
    { categoria: 'Ruim', valor: 10, cor: '#ef4444' },
  ];

  const perguntas = [
    "Como você se sente em relação ao seu trabalho hoje?",
    "Qual é o seu nível de estresse nesta semana?",
    "Como está sua qualidade de sono?",
    "Como você avalia seu relacionamento com colegas?",
    "Qual é sua motivação para atividades pessoais?"
  ];

  const handleSubmitQuestionario = () => {
    toast.success("Questionário enviado com sucesso!");
    setIsDialogOpen(false);
  };

  const getHumorStatus = () => {
    const lastWeek = humorData[humorData.length - 1];
    if (lastWeek.humor >= 8) return { status: 'Excelente', color: 'bg-green-100 text-green-800' };
    if (lastWeek.humor >= 6) return { status: 'Bom', color: 'bg-blue-100 text-blue-800' };
    if (lastWeek.humor >= 4) return { status: 'Regular', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Atenção', color: 'bg-red-100 text-red-800' };
  };

  const humorStatus = getHumorStatus();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Termômetro de Humor</h1>
          <p className="text-gray-600">Monitore seu bem-estar emocional ao longo do tempo</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Heart className="w-4 h-4 mr-2" />
              Responder Questionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Questionário Semanal de Humor</DialogTitle>
              <DialogDescription>
                Responda as perguntas abaixo para ajudar no monitoramento do seu bem-estar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {perguntas.map((pergunta, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-sm font-medium">{pergunta}</Label>
                  <RadioGroup defaultValue="" className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id={`q${index}-1`} />
                      <Label htmlFor={`q${index}-1`} className="text-xs">Muito Ruim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`q${index}-3`} />
                      <Label htmlFor={`q${index}-3`} className="text-xs">Ruim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id={`q${index}-5`} />
                      <Label htmlFor={`q${index}-5`} className="text-xs">Regular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7" id={`q${index}-7`} />
                      <Label htmlFor={`q${index}-7`} className="text-xs">Bom</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id={`q${index}-10`} />
                      <Label htmlFor={`q${index}-10`} className="text-xs">Excelente</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmitQuestionario}>
                Enviar Respostas
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Atual</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge className={humorStatus.color}>
              {humorStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Avaliação</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground">
              há 3 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+15%</div>
            <p className="text-xs text-muted-foreground">
              melhoria nas últimas 4 semanas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              nenhum alerta ativo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Humor</CardTitle>
            <CardDescription>
              Acompanhe a variação do seu humor e estresse ao longo das semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={humorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="humor" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Humor"
                />
                <Line 
                  type="monotone" 
                  dataKey="estresse" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Estresse"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>
              Porcentagem de tempo em cada categoria de humor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Metas de Bem-estar</CardTitle>
          <CardDescription>
            Acompanhe seu progresso nas diferentes áreas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Estabilidade Emocional</Label>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Gestão do Estresse</Label>
              <span className="text-sm text-muted-foreground">60%</span>
            </div>
            <Progress value={60} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Qualidade do Sono</Label>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Relacionamentos</Label>
              <span className="text-sm text-muted-foreground">90%</span>
            </div>
            <Progress value={90} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Termometro;
