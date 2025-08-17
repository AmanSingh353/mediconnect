import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X } from 'lucide-react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { DoctorRecommendations } from './DoctorRecommendations';
import { Message, DoctorRecommendation } from './types';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onFileUpload: (file: File) => void;
  doctorRecommendations: DoctorRecommendation[];
  uploadedFile: File | null;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  messages,
  isLoading,
  onSendMessage,
  onFileUpload,
  doctorRecommendations,
  uploadedFile
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={onToggle}
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
              onClick={onToggle}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <MessageList messages={messages} isLoading={isLoading} />
            
            {doctorRecommendations.length > 0 && (
              <DoctorRecommendations recommendations={doctorRecommendations} />
            )}

            <ChatInput
              onSendMessage={onSendMessage}
              onFileUpload={onFileUpload}
              uploadedFile={uploadedFile}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};