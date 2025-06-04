
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComprehensivePatient } from '@/types/enhanced-patient';
import { FileText, FileImage, FilePlus, Download, File, FileSearch, X, AlertTriangle } from 'lucide-react';

interface DocumentsTabProps {
  patient: ComprehensivePatient;
  onUpdatePatient: (patient: ComprehensivePatient) => void;
}

type Document = {
  id: string;
  type: 'report' | 'exam' | 'prescription' | 'legal' | 'other';
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
  tags: string[];
};

const DocumentsTab: React.FC<DocumentsTabProps> = ({ patient, onUpdatePatient }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');
  
  // Mock documents - in a real app, these would come from patient data
  const patientDocuments: Document[] = patient.documents ? 
    patient.documents.map(doc => ({
      id: doc.url.split('/').pop() || `doc_${Date.now()}`,
      type: doc.type as any,
      title: doc.type,
      description: `${doc.type} uploaded on ${new Date(doc.uploadedAt).toLocaleDateString()}`,
      fileUrl: doc.url,
      fileType: doc.url.split('.').pop() || 'pdf',
      uploadedAt: doc.uploadedAt,
      tags: [doc.type]
    })) : [];
  
  // Filter documents based on search and filters
  const filteredDocuments = patientDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = documentTypeFilter === 'all' || doc.type === documentTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Group documents by type for the tabs
  const reportDocuments = filteredDocuments.filter(doc => doc.type === 'report');
  const examDocuments = filteredDocuments.filter(doc => doc.type === 'exam');
  const prescriptionDocuments = filteredDocuments.filter(doc => doc.type === 'prescription');
  const legalDocuments = filteredDocuments.filter(doc => doc.type === 'legal');
  
  // Mock function for file upload - in a real app this would handle actual file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Create a new document from the uploaded file
    const file = files[0];
    const newDocument = {
      type: 'other',
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString()
    };

    // Update patient with the new document
    const updatedPatient = {
      ...patient,
      documents: [...patient.documents, newDocument]
    };

    onUpdatePatient(updatedPatient);
  };

  // Function to render document card
  const renderDocumentCard = (document: Document) => {
    const getFileIcon = () => {
      switch(document.fileType.toLowerCase()) {
        case 'pdf': return <FileText className="w-10 h-10 text-red-500" />;
        case 'jpg':
        case 'jpeg':
        case 'png': return <FileImage className="w-10 h-10 text-blue-500" />;
        default: return <File className="w-10 h-10 text-gray-500" />;
      }
    };

    return (
      <Card key={document.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-gray-100 rounded-lg p-3">
              {getFileIcon()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{document.title}</h3>
                  <p className="text-sm text-gray-600">{document.description}</p>
                </div>
                <Badge className="capitalize">
                  {document.type}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {document.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileSearch className="w-4 h-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Arquivos e Documentos</h3>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FilePlus className="w-4 h-4 mr-2" />
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload de Arquivo
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="report">Relatórios</SelectItem>
                <SelectItem value="exam">Exames</SelectItem>
                <SelectItem value="prescription">Prescrições</SelectItem>
                <SelectItem value="legal">Documentos Legais</SelectItem>
                <SelectItem value="other">Outros</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setDocumentTypeFilter('all');
            }}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents display */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            Todos ({filteredDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="reports">
            Relatórios ({reportDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="exams">
            Exames ({examDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="prescriptions">
            Prescrições ({prescriptionDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="legal">
            Documentos Legais ({legalDocuments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredDocuments.length > 0 ? (
            <div className="space-y-4">
              {filteredDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum documento encontrado
              </h3>
              <p className="text-gray-500">
                Faça upload de documentos para o prontuário do paciente
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {reportDocuments.length > 0 ? (
            <div className="space-y-4">
              {reportDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum relatório encontrado
              </h3>
              <p className="text-gray-500">
                Adicione relatórios ao prontuário deste paciente
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          {examDocuments.length > 0 ? (
            <div className="space-y-4">
              {examDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum exame encontrado
              </h3>
              <p className="text-gray-500">
                Adicione resultados de exames ao prontuário
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          {prescriptionDocuments.length > 0 ? (
            <div className="space-y-4">
              {prescriptionDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma prescrição encontrada
              </h3>
              <p className="text-gray-500">
                Adicione prescrições médicas ao prontuário
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          {legalDocuments.length > 0 ? (
            <div className="space-y-4">
              {legalDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum documento legal encontrado
              </h3>
              <p className="text-gray-500">
                Adicione documentos legais ao prontuário
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsTab;
