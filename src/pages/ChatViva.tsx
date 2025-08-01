
import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useChatStore } from '@/store/chatStore';
import { useAuth } from '@/contexts/AuthContext';
import ContactSearch from '@/components/chat/ContactSearch';
import ContactList from '@/components/chat/ContactList';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatViva = () => {
  const { user } = useAuth();
  const { initializeContactsForUser } = useChatStore();

  useEffect(() => {
    if (user?.type) {
      initializeContactsForUser(user.type);
    }
  }, [user?.type, initializeContactsForUser]);

  useEffect(() => {
    toast.success("Chat Viva Premium ativado!", {
      description: "Sistema de comunicação inteligente com IA e recursos profissionais.",
      duration: 4000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-therapeutic p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-primary" />
            Chat Viva Premium
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Avançada
            </Badge>
          </h1>
          <p className="text-gray-600">
            Comunicação profissional com IA contextual e recursos médicos integrados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Sidebar de Conversas */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden card-solid border-0 rounded-2xl shadow-xl">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 border-b">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Conversas
              {user?.type === 'psicologo' || user?.type === 'medico' ? (
                <Badge variant="outline" className="text-xs">
                  {user.type === 'psicologo' ? 'Psicólogo' : 'Médico'}
                </Badge>
              ) : null}
            </h2>
          </div>
          
          <ContactSearch />
          <ContactList />
        </Card>

        {/* Área Principal do Chat */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden card-solid border-0 rounded-2xl shadow-xl">
          <ChatInterface />
        </Card>
      </div>
    </div>
  );
};

export default ChatViva;
