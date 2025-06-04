
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Wifi, 
  Users, 
  AlertTriangle,
  X
} from "lucide-react";
import { useChatStore } from '@/store/chatStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContactSearch: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    activeFilters, 
    setFilters 
  } = useChatStore();

  const handleClearFilters = () => {
    setFilters({ online: false, role: '', priority: '' });
    setSearchQuery('');
  };

  const hasActiveFilters = activeFilters.online || activeFilters.role || activeFilters.priority || searchQuery;

  return (
    <div className="p-4 border-b space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="w-4 h-4" />
              {hasActiveFilters && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filtros</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.online}
              onCheckedChange={(checked) => setFilters({ online: checked })}
            >
              <Wifi className="w-4 h-4 mr-2" />
              Apenas online
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Por função</DropdownMenuLabel>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.role === 'Paciente'}
              onCheckedChange={(checked) => setFilters({ role: checked ? 'Paciente' : '' })}
            >
              <Users className="w-4 h-4 mr-2" />
              Pacientes
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.role === 'Psicólogo'}
              onCheckedChange={(checked) => setFilters({ role: checked ? 'Psicólogo' : '' })}
            >
              Psicólogos
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.role === 'Médico'}
              onCheckedChange={(checked) => setFilters({ role: checked ? 'Médico' : '' })}
            >
              Médicos
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Por prioridade</DropdownMenuLabel>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.priority === 'urgent'}
              onCheckedChange={(checked) => setFilters({ priority: checked ? 'urgent' : '' })}
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
              Urgente
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.priority === 'high'}
              onCheckedChange={(checked) => setFilters({ priority: checked ? 'high' : '' })}
            >
              Alta prioridade
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="text-xs">
              "{searchQuery}"
            </Badge>
          )}
          {activeFilters.online && (
            <Badge variant="secondary" className="text-xs">
              Online
            </Badge>
          )}
          {activeFilters.role && (
            <Badge variant="secondary" className="text-xs">
              {activeFilters.role}
            </Badge>
          )}
          {activeFilters.priority && (
            <Badge variant="secondary" className="text-xs">
              {activeFilters.priority}
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="h-6 px-2 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactSearch;
