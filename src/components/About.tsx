
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Brain, Activity } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Cuidado Integral",
    description: "Abordagem biopsicossocial completa para o bem-estar do servidor público.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Brain,
    title: "Inovação com IA",
    description: "Assistente virtual, otimização de processos e suporte inteligente nos prontuários.",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    icon: Activity,
    title: "Monitoramento Contínuo",
    description: "Acompanhamento do humor e bem-estar através de análises avançadas.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Suporte Multidisciplinar",
    description: "Atendimento especializado com psicólogos, médicos e outros profissionais.",
    gradient: "from-blue-500 to-cyan-500"
  }
];

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sobre o Viva+
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            O Viva+ é a evolução do projeto "Se Cuida", uma plataforma inovadora de saúde e bem-estar 
            especialmente desenvolvida para servidores públicos do Piauí, com foco inicial nos 
            operadores de segurança pública (SSP) e justiça (SEJUS).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nossa Missão</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Proporcionar uma plataforma completa que combina tecnologia de ponta com cuidado humano, 
              oferecendo prontuário eletrônico robusto, monitoramento inteligente de humor, 
              e suporte 24/7 através da nossa assistente virtual "Viva".
            </p>
            <p className="text-gray-600 leading-relaxed">
              Inspirado nas melhores práticas do SWClinic, o Viva+ integra funcionalidades 
              avançadas de gestão de clínica, agendamento e teleatendimento, tudo em uma 
              interface moderna e intuitiva.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
            <Card className="relative bg-white border-2 border-gray-100 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-gray-600 mb-4">Digital e Seguro</div>
                  <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-gray-600 mb-4">Disponibilidade</div>
                  <div className="text-4xl font-bold text-accent mb-2">360°</div>
                  <div className="text-gray-600">Cuidado Completo</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <Card key={index} className="bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${principle.gradient} flex items-center justify-center`}>
                  <principle.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {principle.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Tecnologia e Inovação
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Desenvolvido com arquitetura de microsserviços para máxima escalabilidade, 
              o Viva+ utiliza as mais modernas tecnologias para garantir segurança, 
              performance e uma experiência excepcional do usuário.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">LGPD</div>
                <div className="text-sm text-gray-600">Conformidade Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-2">SSL</div>
                <div className="text-sm text-gray-600">Criptografia Avançada</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">API</div>
                <div className="text-sm text-gray-600">Integração WhatsApp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500 mb-2">IA</div>
                <div className="text-sm text-gray-600">Assistente Virtual</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
