
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pin, 
  Archive, 
  MoreVertical, 
  Calendar,
  FileText,
  Phone,
  Video,
  Bot,
  Sparkles,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useChatStore } from '@/store/chatStore';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContactList: React.FC = () => {
  const { user } = useAuth();
  const { 
    getFilteredContacts, 
    selectedConversation, 
    setSelectedConversation,
    markAsRead,
    togglePin,
    archiveConversation,
    conversations
  } = useChatStore();

  const contacts = getFilteredContacts();
  const sortedContacts = contacts.sort((a, b) => {
    // AI assistant always first
    if (a.id === 'ai-assistant') return -1;
    if (b.id === 'ai-assistant') return 1;
    
    // Then by pinned
    const conversation_a = conversations.find(c => c.contactId === a.id);
    const conversation_b = conversations.find(c => c.contactId === b.id);
    
    if (conversation_a?.isPinned && !conversation_b?.isPinned) return -1;
    if (!conversation_a?.isPinned && conversation_b?.isPinned) return 1;
    
    // Then by unread count
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    
    // Finally by last activity
    const timeA = new Date(a.lastMessageTime || 0).getTime();
    const timeB = new Date(b.lastMessageTime || 0).getTime();
    return timeB - timeA;
  });

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    if (priority === 'urgent') return <AlertTriangle className="w-3 h-3" />;
    return null;
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedConversation(contactId);
    markAsRead(contactId);
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {sortedContacts.map((contact) => {
        const conversation = conversations.find(c => c.contactId === contact.id);
        const isSelected = selectedConversation === contact.id;
        const showMedicalActions = (user?.type === 'psicologo' || user?.type === 'medico') && contact.isPatient;
        
        return (
          <div
            key={contact.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors relative group ${
              isSelected ? 'bg-blue-50 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => handleContactSelect(contact.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>
                      {contact.id === 'ai-assistant' ? (
                        <Bot className="w-6 h-6 text-purple-600" />
                      ) : (
                        contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Online status */}
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                  
                  {/* AI indicator */}
                  {contact.id === 'ai-assistant' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                  )}
                  
                  {/* Priority indicator */}
                  {contact.priority && contact.priority !== 'medium' && (
                    <div className={`absolute top-0 left-0 w-3 h-3 ${getPriorityColor(contact.priority)} rounded-full flex items-center justify-center`}>
                      {getPriorityIcon(contact.priority)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {contact.name}
                    </h4>
                    
                    {conversation?.isPinned && (
                      <Pin className="w-3 h-3 text-gray-500" />
                    )}
                    
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${contact.id === 'ai-assistant' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' : ''}`}
                    >
                      {contact.role}
                    </Badge>
                    
                    {contact.specialty && (
                      <Badge variant="outline" className="text-xs">
                        {contact.specialty}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {contact.lastMessage || 'Sem mensagens'}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    {contact.online ? (
                      <span className="text-green-600">Online</span>
                    ) : contact.lastSeen ? (
                      <span>Visto {contact.lastSeen}</span>
                    ) : (
                      <span>Offline</span>
                    )}
                    
                    {contact.lastMessageTime && (
                      <>
                        <span>•</span>
                        <span>{formatTime(contact.lastMessageTime)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {contact.unreadCount > 0 && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
                  </Badge>
                )}
                
                {/* Quick actions for medical professionals */}
                {showMedicalActions && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Calendar className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <FileText className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => togglePin(contact.id)}>
                      <Pin className="w-4 h-4 mr-2" />
                      {conversation?.isPinned ? 'Desafixar' : 'Fixar'}
                    </DropdownMenuItem>
                    
                    {showMedicalActions && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar consulta
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Ver prontuário
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Video className="w-4 h-4 mr-2" />
                          Videochamada
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => archiveConversation(contact.id)}>
                      <Archive className="w-4 h-4 mr-2" />
                      {conversation?.isArchived ? 'Desarquivar' : 'Arquivar'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        );
      })}
      
      {sortedContacts.length === 0 && (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Nenhuma conversa encontrada</h3>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros ou inicie uma nova conversa
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
