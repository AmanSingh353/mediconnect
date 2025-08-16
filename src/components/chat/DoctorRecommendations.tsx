import React from 'react';
import { DoctorRecommendation } from './types';

interface DoctorRecommendationsProps {
  recommendations: DoctorRecommendation[];
}

export const DoctorRecommendations: React.FC<DoctorRecommendationsProps> = ({
  recommendations
}) => {
  return (
    <div className="border-t p-4">
      <h4 className="font-medium mb-2 text-sm">Recommended Doctors</h4>
      <div className="space-y-2">
        {recommendations.slice(0, 2).map((doctor) => (
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
  );
};