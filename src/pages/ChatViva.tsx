
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Phone, Video, MoreVertical, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ChatViva = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
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

  const messages = [
    {
      id: 1,
      sender: "Dr. Ana Paula",
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
    },
    {
      id: 3,
      sender: "Dr. Ana Paula",
      content: "Entendo. Podemos conversar sobre estratégias para lidar com essa ansiedade. Você gostaria de marcar uma sessão presencial?",
      time: "14:30",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Enviando mensagem:", message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat Viva</h1>
          <p className="text-gray-600">Comunicação segura com profissionais de saúde</p>
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
                            {chat.isGroup ? 'G' : chat.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
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
                        {selectedChat.isGroup ? 'G' : selectedChat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedChat.name}</h3>
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
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.isOwn
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 opacity-70" />
                            <span className="text-xs opacity-70">{msg.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-gray-500">
                  Escolha uma conversa para começar a trocar mensagens
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatViva;
