import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, IndianRupee, Users, MapPin } from 'lucide-react';

interface SchemeCardProps {
  title: string;
  description: string;
  benefitAmount?: string;
  processingTime?: string;
  eligibility: string[];
  category: string;
  provider: 'Central Government' | 'State Government';
  status: 'eligible' | 'maybe-eligible' | 'not-eligible';
  onApply?: () => void;
  onLearnMore?: () => void;
  onSummary?: () => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  title,
  description,
  benefitAmount,
  processingTime,
  eligibility,
  category,
  provider,
  status,
  onApply,
  onLearnMore,
  onSummary
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible':
        return 'bg-success text-success-foreground';
      case 'maybe-eligible':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'eligible':
        return 'Eligible';
      case 'maybe-eligible':
        return 'May Be Eligible';
      default:
        return 'Not Eligible';
    }
  };

  return (
    <Card className="h-full shadow-card hover:shadow-elevated transition-all duration-300 bg-gradient-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {provider} • {category}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(status)}>
            {getStatusText(status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-foreground mb-4 line-clamp-3">
          {description}
        </p>

        {/* Benefit Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {benefitAmount && (
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Benefit</p>
                <p className="text-sm font-medium">{benefitAmount}</p>
              </div>
            </div>
          )}
          {processingTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Processing</p>
                <p className="text-sm font-medium">{processingTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Eligibility */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground">Key Eligibility</p>
          </div>
          <div className="space-y-1">
            {eligibility.slice(0, 2).map((criteria, index) => (
              <p key={index} className="text-xs text-foreground">
                • {criteria}
              </p>
            ))}
            {eligibility.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{eligibility.length - 2} more criteria
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSummary}
          className="flex-1"
        >
          Summary
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLearnMore}
          className="flex-1"
        >
          Learn More
        </Button>
        {status !== 'not-eligible' && (
          <Button 
            variant={status === 'eligible' ? 'government' : 'outline'} 
            size="sm" 
            onClick={onApply}
            className="flex-1"
          >
            Apply Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};