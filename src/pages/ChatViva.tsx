
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Phone, Video, MoreVertical, Clock, Users, Bot, Sparkles, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useAIAssistant } from "@/hooks/useAIAssistant";
import { SentimentAnalysis } from "@/components/chat/SentimentAnalysis";
import { EscalationSystem } from "@/components/chat/EscalationSystem";

interface Chat {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  isAI?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
  confidence?: number;
}

const ChatViva = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEscalation, setShowEscalation] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { generateAIResponse, getSentimentIcon, getSentimentColor } = useAIAssistant({
    onEscalate: () => setShowEscalation(true),
    onSuggestion: (suggestion) => setMessage(suggestion)
  });

  const chats: Chat[] = [
    {
      id: 0,
      name: "Assistente Viva",
      role: "IA de Bem-estar",
      lastMessage: "Olá! Como posso ajudar você hoje?",
      time: "Agora",
      unread: 0,
      online: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 1,
      name: "Dr. Ana Paula",
      role: "Psicóloga",
      lastMessage: "Como você está se sentindo hoje?",
      time: "14:30",
      unread: 2,
      online: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Carlos Santos",
      role: "Médico",
      lastMessage: "Vou revisar seus exames",
      time: "13:45",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Grupo de Apoio",
      role: "Grupo",
      lastMessage: "João: Obrigado pelo apoio de todos",
      time: "12:20",
      unread: 5,
      online: true,
      isGroup: true,
      avatar: "/placeholder.svg"
    }
  ];

  const initialMessages: Message[] = [
    {
      id: 1,
      sender: "Assistente Viva",
      content: "Olá! Sou a Viva, sua assistente virtual de bem-estar. Estou aqui para ajudar você com informações sobre saúde mental, agendamentos e suporte emocional. Como posso ajudar você hoje?",
      time: "14:20",
      isOwn: false,
      isAI: true,
      sentiment: 'neutral',
      confidence: 0.9
    }
  ];

  useEffect(() => {
    if (selectedChat?.id === 0) {
      setMessages(initialMessages);
    } else {
      setMessages([
        {
          id: 1,
          sender: selectedChat?.name || "",
          content: "Olá! Como você está se sentindo hoje?",
          time: "14:25",
          isOwn: false
        },
        {
          id: 2,
          sender: "Você",
          content: "Estou me sentindo um pouco ansioso com o trabalho",
          time: "14:27",
          isOwn: true
        }
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "Você",
      content: message,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Se for o chat da IA, gerar resposta automática
    if (selectedChat.id === 0 && aiEnabled) {
      setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: "Assistente Viva",
          content: aiResponse.content,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          isAI: true,
          sentiment: aiResponse.sentiment,
          confidence: aiResponse.confidence
        };

        setMessages(prev => [...prev, aiMessage]);

        // Verificar se precisa escalar
        if (aiResponse.sentiment === 'urgent') {
          setShowEscalation(true);
        }

        // Mostrar sugestões como toast
        if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
          toast({
            title: "Sugestões disponíveis:",
            description: aiResponse.suggestions.join(" • "),
          });
        }
      }, 1000);
    }
  };

  const handleEscalation = (professionalType: string) => {
    setShowEscalation(false);
    toast({
      title: "Conectando...",
      description: `Transferindo para ${professionalType}`,
    });
  };

  const getUrgencyLevel = (sentiment?: string) => {
    switch (sentiment) {
      case 'urgent': return 'critical';
      case 'negative': return 'high';
      case 'positive': return 'low';
      default: return 'medium';
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-primary" />
            Chat Viva
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Ativada
            </Badge>
          </h1>
          <p className="text-gray-600">Comunicação inteligente com IA e profissionais de saúde</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Users className="w-4 h-4 mr-2" />
              Novo Chat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar Nova Conversa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Selecione um profissional para iniciar uma conversa
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setSelectedChat(chats[0])}>
                  <Bot className="w-4 h-4 mr-2" />
                  Assistente Viva - IA de Bem-estar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Dr. Maria Silva - Psicóloga
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Dr. João Costa - Médico
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Plantão Psicológico
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Lista de Chats */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Conversas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-full">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>
                            {chat.id === 0 ? <Bot className="w-4 h-4" /> : 
                             chat.isGroup ? 'G' : chat.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        {chat.id === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 border-2 border-white rounded-full flex items-center justify-center">
                            <Sparkles className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{chat.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {chat.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-500">{chat.time}</span>
                      {chat.unread > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Área de Chat */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>
                        {selectedChat.id === 0 ? <Bot className="w-4 h-4" /> : 
                         selectedChat.isGroup ? 'G' : selectedChat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {selectedChat.name}
                        {selectedChat.id === 0 && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.online ? 'Online' : 'Offline'} • {selectedChat.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[70%]">
                          <div
                            className={`p-3 rounded-lg ${
                              msg.isAI 
                                ? getSentimentColor(msg.sentiment || 'neutral')
                                : msg.isOwn
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {msg.isAI && msg.sentiment && (
                              <div className="flex items-center gap-2 mb-2">
                                {getSentimentIcon(msg.sentiment)}
                                <SentimentAnalysis 
                                  sentiment={msg.sentiment} 
                                  confidence={msg.confidence || 0.7} 
                                />
                              </div>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 opacity-70" />
                              <span className="text-xs opacity-70">{msg.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={selectedChat.id === 0 ? "Digite sua mensagem para a Viva..." : "Digite sua mensagem..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  {selectedChat.id === 0 && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setMessage("Como agendar uma consulta?")}
                      >
                        Agendar consulta
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setMessage("Preciso de técnicas de respiração")}
                      >
                        Técnicas de respiração
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setMessage("Como está meu termômetro de humor?")}
                      >
                        Termômetro
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Comece uma conversa
                </h3>
                <p className="text-gray-500 mb-4">
                  Converse com a Viva (IA) ou escolha um profissional para começar
                </p>
                <Button onClick={() => setSelectedChat(chats[0])}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Falar com a Viva
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Sistema de Escalonamento */}
      {showEscalation && (
        <Dialog open={showEscalation} onOpenChange={setShowEscalation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Sistema de Escalonamento Ativado
              </DialogTitle>
            </DialogHeader>
            <EscalationSystem
              urgencyLevel={getUrgencyLevel(messages[messages.length - 1]?.sentiment)}
              onEscalate={handleEscalation}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ChatViva;
