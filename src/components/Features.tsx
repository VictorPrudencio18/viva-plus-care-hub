
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, Clock, Plus, ArrowUp } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Termômetro de Humor",
    description: "Monitoramento contínuo do bem-estar com análise de tendências e alertas automáticos para profissionais.",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
  },
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description: "Sistema completo para plantão psicológico, psicoterapia breve, teleatendimentos e avaliações mensais.",
    color: "bg-green-50 border-green-200 hover:bg-green-100"
  },
  {
    icon: Users,
    title: "Prontuário Eletrônico",
    description: "PEP completo com IA para transcrição de voz, modelos padronizados e trilhas de auditoria seguras.",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
  },
  {
    icon: Plus,
    title: "Assistente Virtual Viva",
    description: "IA disponível 24/7 para dúvidas, orientações, agendamentos e suporte através de WhatsApp integrado.",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
  },
  {
    icon: Clock,
    title: "Telemedicina",
    description: "Videoconferências seguras para teleatendimentos, consultas remotas e acompanhamento multidisciplinar.",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
  },
  {
    icon: ArrowUp,
    title: "Gamificação e Engajamento",
    description: "Desafios, rankings, conteúdo personalizado e programas de atividade física com GPS integrado.",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100"
  }
];

const Features = () => {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funcionalidades Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta para um cuidado integral, combinando prontuário eletrônico, 
            IA e monitoramento contínuo do bem-estar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.color} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Perfis de Usuário Especializados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Servidores</h4>
                <p className="text-sm text-gray-600">Acesso completo a recursos de autocuidado</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Psicólogos</h4>
                <p className="text-sm text-gray-600">PEP, agenda e plantão psicológico</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Médicos</h4>
                <p className="text-sm text-gray-600">Prontuários e teleatendimentos</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Administradores</h4>
                <p className="text-sm text-gray-600">Gestão e análises da plataforma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
