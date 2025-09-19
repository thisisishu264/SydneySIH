import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, IndianRupee, Users, Briefcase, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This line reads the URL from your .env.local file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const IntermediatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    annual_income: '',
    caste_category: '',
    occupation: '',
    special_status: ''
  });

  useEffect(() => {
    // Get user_id from localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) {
      // If no user_id, redirect back to auth
      navigate('/');
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompleteRegistration = async () => {
    // Validate required fields
    if (!formData.annual_income || !formData.caste_category) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in annual income and caste category",
        variant: "destructive"
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Session Error",
        description: "User session not found. Please start again.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setIsLoading(true);
    try {
      // --- CHANGE ---
      const response = await fetch(`${API_BASE_URL}/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          annual_income: parseInt(formData.annual_income),
          caste_category: formData.caste_category,
          occupation: formData.occupation,
          special_status: formData.special_status
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'REGISTRATION_COMPLETE') {
          // Store user name and redirect to HomePage
          localStorage.setItem('user_name', data.name);
          toast({
            title: "Registration Complete!",
            description: `Welcome, ${data.name}!`,
          });
          navigate('/home');
        }
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Failed to complete registration",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your connection and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold gradient-text">Complete Your Profile</h1>
          <Badge variant="secondary">Step 2 of 2</Badge>
          <p className="text-muted-foreground">Help us find the best schemes for you</p>
        </div>

        {/* Profile Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Additional Information
            </CardTitle>
            <CardDescription>
              This information helps us personalize your scheme recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Annual Income */}
            <div className="space-y-2">
              <Label htmlFor="income" className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Annual Family Income (₹) *
              </Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 200000"
                value={formData.annual_income}
                onChange={(e) => handleInputChange('annual_income', e.target.value)}
              />
            </div>

            {/* Caste Category */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Caste Category *
              </Label>
              <Select onValueChange={(value) => handleInputChange('caste_category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC (Other Backward Classes)</SelectItem>
                  <SelectItem value="sc">SC (Scheduled Caste)</SelectItem>
                  <SelectItem value="st">ST (Scheduled Tribe)</SelectItem>
                  <SelectItem value="ews">EWS (Economically Weaker Section)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                placeholder="e.g., Farmer, Student, Business"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </div>

            {/* Special Status */}
            <div className="space-y-2">
              <Label htmlFor="special-status" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Special Status (if applicable)
              </Label>
              <Input
                id="special-status"
                placeholder="e.g., Widow, Disabled, Senior Citizen"
                value={formData.special_status}
                onChange={(e) => handleInputChange('special_status', e.target.value)}
              />
            </div>

            <Button
              onClick={handleCompleteRegistration}
              disabled={!formData.annual_income || !formData.caste_category || isLoading}
              className="w-full"
            >
              {isLoading ? 'Completing Registration...' : 'Complete Registration'}
            </Button>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="text-center text-sm text-muted-foreground">
          <p>* Required fields</p>
          <p>All information is kept confidential and secure</p>
        </div>
      </div>
    </div>
  );
};

export default IntermediatePage;