export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface TriageResult {
  level: 'emergency' | 'urgent' | 'routine' | 'low-priority';
  reason: string;
  recommendations: string[];
}

export interface DoctorRecommendation {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  availability: string;
}

export interface ActionPanelData {
  symptoms: string[];
  nextSteps: string[];
  suggestedTests: string[];
  selfCareGuide: string[];
}