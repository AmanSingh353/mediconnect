import React, { useState } from 'react';
import { ChatWidget } from './chat/ChatWidget';
import { ActionPanel } from './chat/ActionPanel';
import { Message, TriageResult, DoctorRecommendation, ActionPanelData } from './chat/types';

const AiSymptomChecker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI health assistant. I can help you understand your symptoms and provide guidance. Please describe how you\'re feeling.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [doctorRecommendations, setDoctorRecommendations] = useState<DoctorRecommendation[]>([]);
  const [actionPanel, setActionPanel] = useState<ActionPanelData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with triage and recommendations
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I understand you're experiencing ${content}. Based on your symptoms, I'm analyzing the severity and will provide recommendations.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // Mock triage result
      const mockTriage: TriageResult = {
        level: content.toLowerCase().includes('chest pain') ? 'emergency' : 
               content.toLowerCase().includes('fever') ? 'urgent' : 'routine',
        reason: 'Based on the symptoms described',
        recommendations: [
          'Monitor symptoms closely',
          'Stay hydrated',
          'Rest as needed'
        ]
      };

      // Mock doctor recommendations
      const mockDoctors: DoctorRecommendation[] = [
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          specialty: 'Internal Medicine',
          distance: '0.5 miles',
          rating: 4.8,
          availability: 'Available today'
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          specialty: 'Family Medicine',
          distance: '1.2 miles',
          rating: 4.9,
          availability: 'Next available: Tomorrow'
        }
      ];

      // Mock action panel data
      const mockActionPanel: ActionPanelData = {
        symptoms: [content],
        nextSteps: [
          'Schedule appointment with primary care physician',
          'Monitor symptoms for 24-48 hours',
          'Contact emergency services if symptoms worsen'
        ],
        suggestedTests: [
          'Complete Blood Count (CBC)',
          'Basic Metabolic Panel'
        ],
        selfCareGuide: [
          'Get adequate rest',
          'Stay hydrated',
          'Take temperature regularly'
        ]
      };

      setTriageResult(mockTriage);
      setDoctorRecommendations(mockDoctors);
      setActionPanel(mockActionPanel);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate file analysis
    const analysisMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `I've received your medical record: "${file.name}". I'm analyzing the document for relevant symptoms and medical history. This may take a moment.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, analysisMessage]);
  };

  return (
    <>
      <ChatWidget
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        doctorRecommendations={doctorRecommendations}
        uploadedFile={uploadedFile}
      />
      
      {actionPanel && (
        <ActionPanel
          data={actionPanel}
          onClose={() => setActionPanel(null)}
        />
      )}
    </>
  );
};

export default AiSymptomChecker;