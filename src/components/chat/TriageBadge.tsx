import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Shield, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TriageResult } from './types';

const triageColors: Record<string, string> = {
  'emergency': 'bg-red-500 text-white',
  'urgent': 'bg-orange-500 text-white', 
  'routine': 'bg-green-500 text-white',
  'low-priority': 'bg-muted text-muted-foreground'
};

const triageIcons: Record<string, React.ElementType> = {
  'emergency': AlertTriangle,
  'urgent': Clock,
  'routine': Shield,
  'low-priority': MessageCircle
};

interface TriageBadgeProps {
  result: TriageResult;
}

export const TriageBadge: React.FC<TriageBadgeProps> = ({ result }) => {
  const Icon = triageIcons[result.level] || MessageCircle;
  
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge
          className={cn(triageColors[result.level], 'flex items-center gap-1')}
          aria-label={`Triage level: ${result.level}`}
        >
          <Icon className="h-3 w-3" />
          {result.level.replace('-', ' ').toUpperCase()}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{result.reason}</p>
      {result.recommendations?.length > 0 && (
        <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
          {result.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
