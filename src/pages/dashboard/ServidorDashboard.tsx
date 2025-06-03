
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

const ServidorDashboard = () => {
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
            {/* Termômetro de Humor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Termômetro de Humor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">😊</div>
                    <p className="text-lg font-semibold">Como você está se sentindo hoje?</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {['😢', '😟', '😐', '😊', '😄'].map((emoji, index) => (
                      <Button 
                        key={index}
                        variant="outline"
                        className="h-16 text-2xl hover:bg-primary hover:text-white"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full bg-primary">
                    Responder Questionário Semanal
                  </Button>
                </div>
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
