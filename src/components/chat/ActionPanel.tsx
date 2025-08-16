import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ActionPanelData } from './types';

interface ActionPanelProps {
  data: ActionPanelData;
  onClose: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ data, onClose }) => {
  return (
    <div className="fixed top-20 right-4 w-80 z-40">
      <Card className="shadow-lg border-l-4 border-l-secondary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Next Steps</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
            <ul className="text-xs space-y-1">
              {data.nextSteps.map((step, index) => (
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
              {data.suggestedTests.map((test, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {test}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Self-Care Guide</h4>
            <ul className="text-xs space-y-1">
              {data.selfCareGuide.map((guide, index) => (
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
  );
};