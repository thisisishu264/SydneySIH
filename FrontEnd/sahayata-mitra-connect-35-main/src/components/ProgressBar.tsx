import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProgressBarProps {
  steps: ProgressStep[];
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              {/* Step Icon */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${step.status === 'completed' 
                  ? 'bg-success border-success text-success-foreground' 
                  : step.status === 'current' 
                  ? 'bg-secondary border-secondary text-secondary-foreground animate-pulse-gentle'
                  : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                }
              `}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : step.status === 'current' ? (
                  <Clock className="h-5 w-5" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>

              {/* Step Label */}
              <div className="text-center mt-2 max-w-24">
                <p className={`text-xs font-medium ${
                  step.status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-all duration-500
                ${steps[index + 1].status !== 'pending' ? 'bg-success' : 'bg-muted'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};