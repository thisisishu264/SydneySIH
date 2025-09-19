import React, { useState } from 'react';
import { Camera, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import sahayataMitraAvatar from '@/assets/sahayata-mitra-avatar.jpg';

interface AIAssistantProps {
  currentStep?: string;
  suggestions?: string[];
  onHighlight?: (elementId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  currentStep,
  suggestions,
  onHighlight 
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Document Upload Button */}
      <Button
        variant="assistant"
        size="icon"
        className="shadow-elevated"
        title="Upload Documents"
      >
        <Camera className="h-6 w-6" />
      </Button>
    </div>
  );
};