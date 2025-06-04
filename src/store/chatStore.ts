
import { create } from 'zustand';
import { usePatientStore } from './patientStore';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'appointment' | 'system';
  isOwn: boolean;
  isAI?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
  confidence?: number;
  fileUrl?: string;
  fileName?: string;
  appointmentData?: {
    date: string;
    time: string;
    type: string;
  };
}

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastSeen?: string;
  specialty?: string;
  isPatient?: boolean;
  patientId?: string;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

interface Conversation {
  id: string;
  contactId: string;
  messages: ChatMessage[];
  isGroup: boolean;
  isPinned: boolean;
  isArchived: boolean;
  lastActivity: string;
}

interface ChatStore {
  contacts: ChatContact[];
  conversations: Conversation[];
  selectedConversation: string | null;
  searchQuery: string;
  activeFilters: {
    online: boolean;
    role: string;
    priority: string;
  };
  
  // Actions
  setContacts: (contacts: ChatContact[]) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  setSelectedConversation: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ChatStore['activeFilters']>) => void;
  markAsRead: (conversationId: string) => void;
  togglePin: (conversationId: string) => void;
  archiveConversation: (conversationId: string) => void;
  getFilteredContacts: () => ChatContact[];
  getConversation: (id: string) => Conversation | undefined;
  initializeContactsForUser: (userType: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  contacts: [],
  conversations: [],
  selectedConversation: null,
  searchQuery: '',
  activeFilters: {
    online: false,
    role: '',
    priority: ''
  },

  setContacts: (contacts) => set({ contacts }),

  addMessage: (conversationId, message) => {
    set((state) => {
      const conversations = state.conversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            lastActivity: message.timestamp
          };
        }
        return conv;
      });

      // Update contact's last message
      const contacts = state.contacts.map(contact => {
        if (contact.id === conversationId) {
          return {
            ...contact,
            lastMessage: message.content,
            lastMessageTime: message.timestamp,
            unreadCount: message.isOwn ? contact.unreadCount : contact.unreadCount + 1
          };
        }
        return contact;
      });

      return { conversations, contacts };
    });
  },

  setSelectedConversation: (id) => set({ selectedConversation: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set((state) => ({
    activeFilters: { ...state.activeFilters, ...filters }
  })),

  markAsRead: (conversationId) => {
    set((state) => ({
      contacts: state.contacts.map(contact =>
        contact.id === conversationId
          ? { ...contact, unreadCount: 0 }
          : contact
      )
    }));
  },

  togglePin: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, isPinned: !conv.isPinned }
          : conv
      )
    }));
  },

  archiveConversation: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, isArchived: !conv.isArchived }
          : conv
      )
    }));
  },

  getFilteredContacts: () => {
    const { contacts, searchQuery, activeFilters } = get();
    
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contact.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesOnline = !activeFilters.online || contact.online;
      const matchesRole = !activeFilters.role || contact.role === activeFilters.role;
      const matchesPriority = !activeFilters.priority || contact.priority === activeFilters.priority;
      
      return matchesSearch && matchesOnline && matchesRole && matchesPriority;
    });
  },

  getConversation: (id) => {
    return get().conversations.find(conv => conv.id === id);
  },

  initializeContactsForUser: (userType) => {
    const { patients } = usePatientStore.getState();
    
    let contacts: ChatContact[] = [
      {
        id: 'ai-assistant',
        name: 'Assistente Viva',
        role: 'IA de Bem-estar',
        avatar: '/placeholder.svg',
        online: true,
        unreadCount: 0,
        lastMessage: 'Olá! Como posso ajudar você hoje?',
        lastMessageTime: new Date().toISOString(),
        priority: 'medium'
      }
    ];

    if (userType === 'psicologo' || userType === 'medico') {
      // Add patients as contacts
      const patientContacts = patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        role: 'Paciente',
        avatar: patient.avatar || '/placeholder.svg',
        online: Math.random() > 0.5, // Random online status for demo
        unreadCount: Math.floor(Math.random() * 3),
        lastMessage: 'Como está se sentindo hoje?',
        lastMessageTime: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        isPatient: true,
        patientId: patient.id,
        priority: Math.random() > 0.8 ? 'high' : 'medium' as 'low' | 'medium' | 'high' | 'urgent'
      }));

      contacts = [...contacts, ...patientContacts];

      // Add other professionals
      contacts.push(
        {
          id: 'plantao-psico',
          name: 'Plantão Psicológico',
          role: 'Psicólogo',
          avatar: '/placeholder.svg',
          online: true,
          unreadCount: 0,
          priority: 'high'
        },
        {
          id: 'coord-medica',
          name: 'Coordenação Médica',
          role: 'Médico',
          avatar: '/placeholder.svg',
          online: false,
          lastSeen: '2h atrás',
          unreadCount: 1,
          priority: 'medium'
        }
      );
    }

    // Initialize conversations
    const conversations: Conversation[] = contacts.map(contact => ({
      id: contact.id,
      contactId: contact.id,
      messages: [],
      isGroup: false,
      isPinned: false,
      isArchived: false,
      lastActivity: contact.lastMessageTime || new Date().toISOString()
    }));

    set({ contacts, conversations });
  }
}));
