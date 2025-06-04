
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Clock, 
  Bot, 
  Sparkles,
  Calendar,
  FileText,
  Paperclip,
  Mic,
  Smile,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { useChatStore } from '@/store/chatStore';
import { useAuth } from '@/contexts/AuthContext';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { SentimentAnalysis } from './SentimentAnalysis';

const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    selectedConversation,
    contacts,
    getConversation,
    addMessage
  } = useChatStore();

  const { generateAIResponse, getSentimentIcon, getSentimentColor } = useAIAssistant({
    onEscalate: () => {},
    onSuggestion: (suggestion) => setMessage(suggestion)
  });

  const selectedContact = contacts.find(c => c.id === selectedConversation);
  const conversation = selectedConversation ? getConversation(selectedConversation) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation || !selectedContact) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'Você',
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text' as const,
      isOwn: true
    };

    addMessage(selectedConversation, newMessage);
    setMessage("");

    // Generate AI response for AI assistant
    if (selectedContact.id === 'ai-assistant') {
      setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        const aiMessage = {
          id: `msg_${Date.now() + 1}`,
          senderId: 'ai-assistant',
          senderName: 'Assistente Viva',
          content: aiResponse.content,
          timestamp: new Date().toISOString(),
          type: 'text' as const,
          isOwn: false,
          isAI: true,
          sentiment: aiResponse.sentiment,
          confidence: aiResponse.confidence
        };

        addMessage(selectedConversation, aiMessage);
      }, 1000);
    }
  };

  const handleScheduleAppointment = () => {
    if (!selectedConversation || !selectedContact) return;

    const appointmentMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'system',
      senderName: 'Sistema',
      content: `Agendamento solicitado para ${selectedContact.name}`,
      timestamp: new Date().toISOString(),
      type: 'appointment' as const,
      isOwn: false,
      appointmentData: {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '14:00',
        type: user?.type === 'psicologo' ? 'Consulta Psicológica' : 'Consulta Médica'
      }
    };

    addMessage(selectedConversation, appointmentMessage);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!selectedContact || !conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Selecione uma conversa
          </h3>
          <p className="text-gray-500 mb-4">
            Escolha um contato para começar a conversar
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => useChatStore.getState().setSelectedConversation('ai-assistant')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Falar com a Viva
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const showMedicalActions = (user?.type === 'psicologo' || user?.type === 'medico') && selectedContact.isPatient;

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>
                {selectedContact.id === 'ai-assistant' ? (
                  <Bot className="w-5 h-5 text-purple-600" />
                ) : (
                  selectedContact.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                )}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                {selectedContact.id === 'ai-assistant' && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    IA
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {selectedContact.online ? 'Online' : selectedContact.lastSeen ? `Visto ${selectedContact.lastSeen}` : 'Offline'} • {selectedContact.role}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showMedicalActions && (
              <>
                <Button size="sm" variant="outline" onClick={handleScheduleAppointment}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Prontuário
                </Button>
              </>
            )}
            
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[70%]">
                <div
                  className={`p-3 rounded-2xl ${
                    msg.isAI 
                      ? getSentimentColor(msg.sentiment || 'neutral')
                      : msg.isOwn
                      ? 'bg-primary text-white'
                      : msg.type === 'appointment'
                      ? 'bg-blue-50 border border-blue-200'
                      : msg.type === 'system'
                      ? 'bg-gray-50 border border-gray-200'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {/* AI sentiment indicator */}
                  {msg.isAI && msg.sentiment && (
                    <div className="flex items-center gap-2 mb-2">
                      {getSentimentIcon(msg.sentiment)}
                      <SentimentAnalysis 
                        sentiment={msg.sentiment} 
                        confidence={msg.confidence || 0.7} 
                      />
                    </div>
                  )}
                  
                  {/* Appointment card */}
                  {msg.type === 'appointment' && msg.appointmentData && (
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Nova Consulta Agendada</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>Data:</strong> {new Date(msg.appointmentData.date).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Horário:</strong> {msg.appointmentData.time}</p>
                        <p><strong>Tipo:</strong> {msg.appointmentData.type}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="text-xs">
                          Confirmar
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Reagendar
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Regular message */}
                  {msg.type === 'text' && (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                  
                  {/* System message */}
                  {msg.type === 'system' && (
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-700">{msg.content}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3 opacity-70" />
                    <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                    {msg.isOwn && (
                      <CheckCircle className="w-3 h-3 opacity-70 ml-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Input
            placeholder={selectedContact.id === 'ai-assistant' ? "Digite sua mensagem para a Viva..." : `Mensagem para ${selectedContact.name}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          
          <Button size="sm" variant="outline">
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button size="sm" variant="outline">
            <Smile className="w-4 h-4" />
          </Button>
          
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick actions for AI */}
        {selectedContact.id === 'ai-assistant' && (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Como agendar uma consulta?")}
              className="text-xs"
            >
              Agendar consulta
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Preciso de técnicas de respiração")}
              className="text-xs"
            >
              Técnicas de respiração
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Como está meu termômetro de humor?")}
              className="text-xs"
            >
              Termômetro
            </Button>
          </div>
        )}
        
        {/* Quick actions for patients */}
        {showMedicalActions && (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleScheduleAppointment}
              className="text-xs"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Agendar consulta
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Como você está se sentindo hoje?")}
              className="text-xs"
            >
              Verificar humor
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Precisa de algum ajuste na medicação?")}
              className="text-xs"
            >
              Medicação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
