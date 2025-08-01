
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Award,
  Activity,
  Bell,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ServidorDashboard = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const navigate = useNavigate();

  const moodOptions = [
    { emoji: "😢", label: "Muito Ruim", value: "muito-ruim", color: "bg-red-100 hover:bg-red-200 border-red-300" },
    { emoji: "😟", label: "Ruim", value: "ruim", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
    { emoji: "😐", label: "Regular", value: "regular", color: "bg-gray-100 hover:bg-gray-200 border-gray-300" },
    { emoji: "😊", label: "Bom", value: "bom", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
    { emoji: "😄", label: "Excelente", value: "excelente", color: "bg-green-100 hover:bg-green-200 border-green-300" }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const selectedOption = moodOptions.find(option => option.value === mood);
    toast({
      title: "Humor registrado!",
      description: `Você selecionou: ${selectedOption?.label}`,
    });
  };

  const handleQuestionario = () => {
    navigate('/app/termometro');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Olá, João Silva!</h1>
              <p className="text-gray-600">Bem-vindo de volta ao Viva+</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                3 Notificações
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Humor Atual</p>
                  <p className="text-2xl font-bold text-green-600">Bom</p>
                </div>
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-blue-600">2 dias</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pontos Viva</p>
                  <p className="text-2xl font-bold text-purple-600">1.250</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Atividades</p>
                  <p className="text-2xl font-bold text-orange-600">12/15</p>
                </div>
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Termômetro de Humor Melhorado */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-gray-800">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Termômetro de Humor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">😊</div>
                  <p className="text-xl font-semibold text-gray-700 mb-6">
                    Como você está se sentindo hoje?
                  </p>
                </div>
                
                {/* Grid de Emojis Melhorado */}
                <div className="grid grid-cols-5 gap-3">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodSelect(mood.value)}
                      className={`
                        relative p-4 rounded-2xl border-2 transition-all duration-300 transform
                        ${selectedMood === mood.value 
                          ? 'scale-110 ring-4 ring-blue-300 bg-blue-200 border-blue-400' 
                          : mood.color
                        }
                        hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300
                        active:scale-95 cursor-pointer
                      `}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <p className="text-xs font-medium text-gray-700">{mood.label}</p>
                      </div>
                      
                      {/* Indicador de seleção */}
                      {selectedMood === mood.value && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Feedback visual quando selecionado */}
                {selectedMood && (
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-200 animate-fade-in">
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-2xl">
                        {moodOptions.find(m => m.value === selectedMood)?.emoji}
                      </div>
                      <p className="font-semibold text-gray-800">
                        Humor registrado: {moodOptions.find(m => m.value === selectedMood)?.label}
                      </p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✓ Salvo
                      </Badge>
                    </div>
                  </div>
                )}
                
                {/* Botão do Questionário Melhorado */}
                <Button 
                  onClick={handleQuestionario}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Responder Questionário Semanal
                </Button>
              </CardContent>
            </Card>

            {/* Atividades Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Consulta psicológica realizada</span>
                    </div>
                    <span className="text-sm text-gray-500">2 dias atrás</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Questionário de humor respondido</span>
                    </div>
                    <span className="text-sm text-gray-500">5 dias atrás</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Desafio de caminhada completado</span>
                    </div>
                    <span className="text-sm text-gray-500">1 semana atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assistente Viva */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Assistente Viva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm">
                      Olá! Posso ajudar você com dúvidas sobre saúde mental, agendamentos ou dicas de bem-estar.
                    </p>
                  </div>
                  <Button className="w-full bg-secondary">
                    Conversar com Viva
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Agendamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Próximos Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-semibold">Consulta Psicológica</p>
                    <p className="text-sm text-gray-600">15/06 às 14:00</p>
                    <p className="text-sm text-gray-600">Dr. Maria Santos</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-semibold">Avaliação Médica</p>
                    <p className="text-sm text-gray-600">22/06 às 09:30</p>
                    <p className="text-sm text-gray-600">Dr. Carlos Lima</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ver Todos os Agendamentos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progresso Semanal */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Exercícios</span>
                      <span>4/5</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Meditação</span>
                      <span>3/7</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hidratação</span>
                      <span>6/8</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServidorDashboard;
