import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Shield, Info, Phone, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export type UrgencyLevel = 'emergency' | 'urgent' | 'routine' | 'low-priority';

interface TriageResult {
  level: UrgencyLevel;
  title: string;
  description: string;
  timeframe: string;
  recommendations: string[];
  symptoms: string[];
  nextSteps: {
    immediate: string[];
    followUp: string[];
  };
  warningSigns: string[];
}

interface TriageDisplayProps {
  result: TriageResult;
  onBookAppointment?: () => void;
  onCallEmergency?: () => void;
  onFindDoctor?: () => void;
}

const urgencyConfig = {
  emergency: {
    icon: AlertTriangle,
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    badgeVariant: 'destructive' as const,
    priority: 'EMERGENCY'
  },
  urgent: {
    icon: Clock,
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badgeVariant: 'secondary' as const,
    priority: 'URGENT'
  },
  routine: {
    icon: Shield,
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    badgeVariant: 'secondary' as const,
    priority: 'ROUTINE'
  },
  'low-priority': {
    icon: Info,
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badgeVariant: 'outline' as const,
    priority: 'LOW PRIORITY'
  }
};

const TriageDisplay: React.FC<TriageDisplayProps> = ({
  result,
  onBookAppointment,
  onCallEmergency,
  onFindDoctor
}) => {
  const config = urgencyConfig[result.level];
  const Icon = config.icon;

  return (
    <Card className={cn("border-l-4", config.borderColor, config.bgColor)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full text-white", config.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{result.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={config.badgeVariant} className="text-xs">
                  {config.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {result.timeframe}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {result.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Symptoms */}
        <div>
          <h4 className="font-medium text-sm mb-2">Related Symptoms</h4>
          <div className="flex flex-wrap gap-1">
            {result.symptoms.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Warning Signs (for non-emergency cases) */}
        {result.level !== 'emergency' && result.warningSigns.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h4 className="font-medium text-sm text-yellow-800 mb-2 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Seek immediate care if you experience:
            </h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              {result.warningSigns.map((sign, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">•</span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Immediate Actions */}
        <div>
          <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
          <ul className="text-sm space-y-2">
            {result.nextSteps.immediate.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={cn("mt-1 w-2 h-2 rounded-full", config.color)}></span>
                {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Follow-up Actions */}
        {result.nextSteps.followUp.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Follow-up Actions</h4>
            <ul className="text-sm space-y-2">
              {result.nextSteps.followUp.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-muted-foreground"></span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t">
          {result.level === 'emergency' && (
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={onCallEmergency}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services
            </Button>
          )}
          
          {(result.level === 'urgent' || result.level === 'routine') && (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="default"
                onClick={onBookAppointment}
                className="text-sm"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Book Appointment
              </Button>
              <Button 
                variant="outline"
                onClick={onFindDoctor}
                className="text-sm"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Find Doctor
              </Button>
            </div>
          )}

          {result.level === 'low-priority' && (
            <Button 
              variant="outline"
              onClick={onFindDoctor}
              className="w-full"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Find Healthcare Provider
            </Button>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-muted/50 rounded-lg p-3">
          <h4 className="font-medium text-sm mb-2">General Recommendations</h4>
          <ul className="text-xs space-y-1">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriageDisplay;