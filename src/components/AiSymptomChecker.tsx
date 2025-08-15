import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send, Upload, FileText, AlertTriangle, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface TriageResult {
  level: 'emergency' | 'urgent' | 'routine' | 'low-priority';
  reason: string;
  recommendations: string[];
}

interface DoctorRecommendation {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  availability: string;
}

interface ActionPanelData {
  symptoms: string[];
  nextSteps: string[];
  suggestedTests: string[];
  selfCareGuide: string[];
}

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
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [doctorRecommendations, setDoctorRecommendations] = useState<DoctorRecommendation[]>([]);
  const [actionPanel, setActionPanel] = useState<ActionPanelData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triageColors = {
    'emergency': 'bg-red-500 text-white',
    'urgent': 'bg-orange-500 text-white', 
    'routine': 'bg-green-500 text-white',
    'low-priority': 'bg-muted text-muted-foreground'
  };

  const triageIcons = {
    'emergency': AlertTriangle,
    'urgent': Clock,
    'routine': Shield,
    'low-priority': MessageCircle
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with triage and recommendations
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I understand you're experiencing ${input}. Based on your symptoms, I'm analyzing the severity and will provide recommendations.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // Mock triage result
      const mockTriage: TriageResult = {
        level: input.toLowerCase().includes('chest pain') ? 'emergency' : 
               input.toLowerCase().includes('fever') ? 'urgent' : 'routine',
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
        symptoms: [input],
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file analysis
      const analysisMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `I've received your medical record: "${file.name}". I'm analyzing the document for relevant symptoms and medical history. This may take a moment.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, analysisMessage]);
    }
  };

  const TriageBadge: React.FC<{ result: TriageResult }> = ({ result }) => {
    const Icon = triageIcons[result.level];
    return (
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn(triageColors[result.level], 'flex items-center gap-1')}>
            <Icon className="h-3 w-3" />
            {result.level.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{result.reason}</p>
        <ul className="text-xs text-muted-foreground mt-1">
          {result.recommendations.map((rec, index) => (
            <li key={index}>• {rec}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {isOpen && (
          <Card className="w-96 h-[600px] flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-lg">AI Health Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] p-3 rounded-lg text-sm',
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      {message.content}
                      {message.type === 'bot' && triageResult && (
                        <TriageBadge result={triageResult} />
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Doctor Recommendations */}
              {doctorRecommendations.length > 0 && (
                <div className="border-t p-4">
                  <h4 className="font-medium mb-2 text-sm">Recommended Doctors</h4>
                  <div className="space-y-2">
                    {doctorRecommendations.slice(0, 2).map((doctor) => (
                      <div key={doctor.id} className="bg-muted rounded-lg p-2 text-xs">
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-muted-foreground">{doctor.specialty}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span>{doctor.distance}</span>
                          <span className="text-secondary">★ {doctor.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Records
                  </Button>
                  {uploadedFile && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {uploadedFile.name}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your symptoms..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.txt,.doc,.docx"
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Panel */}
      {actionPanel && (
        <div className="fixed top-20 right-4 w-80 z-40">
          <Card className="shadow-lg border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Next Steps</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActionPanel(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
                <ul className="text-xs space-y-1">
                  {actionPanel.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Suggested Tests</h4>
                <div className="flex flex-wrap gap-1">
                  {actionPanel.suggestedTests.map((test, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Self-Care Guide</h4>
                <ul className="text-xs space-y-1">
                  {actionPanel.selfCareGuide.map((guide, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      {guide}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Book Appointment</Button>
                <Button variant="outline" size="sm" className="flex-1">View Full Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AiSymptomChecker;