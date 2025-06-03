
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, WhatsApp } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pronto para transformar o cuidado com a saúde dos servidores públicos? 
            Fale com nossa equipe e descubra como o Viva+ pode fazer a diferença.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Chat com Viva</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Converse com nossa assistente virtual para tirar dúvidas e conhecer melhor a plataforma.
              </p>
              <Button className="bg-primary hover:bg-primary/90 w-full">
                Iniciar Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Agendar Demonstração</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Agende uma demonstração personalizada para sua instituição e veja o Viva+ em ação.
              </p>
              <Button className="bg-secondary hover:bg-secondary/90 w-full">
                Agendar Demo
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <WhatsApp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Fale conosco diretamente pelo WhatsApp para suporte rápido e atendimento personalizado.
              </p>
              <Button className="bg-accent hover:bg-accent/90 w-full">
                Abrir WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Implemente o Viva+ na Sua Instituição
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Junte-se às instituições que já confiam no Viva+ para cuidar da saúde e 
              bem-estar de seus servidores. Nossa equipe está pronta para uma implementação 
              completa e personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Solicitar Proposta
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4">
                Baixar Apresentação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
