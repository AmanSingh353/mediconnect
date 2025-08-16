import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TriageBadge } from './TriageBadge';
import { Message, TriageResult } from './types';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  triageResult?: TriageResult | null;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  triageResult
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
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
  );
};