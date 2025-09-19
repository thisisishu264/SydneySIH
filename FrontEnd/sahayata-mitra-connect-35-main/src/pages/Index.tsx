import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AIAssistant } from '@/components/AIAssistant';
import { ProgressBar } from '@/components/ProgressBar';
import { SchemeCard } from '@/components/SchemeCard';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  User, 
  MapPin, 
  IndianRupee, 
  Search,
  Filter,
  Home,
  GraduationCap,
  Heart,
  Briefcase,
  Users,
  Phone,
  Clock
} from 'lucide-react';
import heroImage from '@/assets/hero-government-digital.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('onboarding');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    gender: '',
    address: '',
    income: '',
    caste: ''
  });

  const progressSteps = [
    { id: 'verify', title: 'Verify Identity', status: (currentStep === 'onboarding' ? 'current' : 'completed') as 'current' | 'completed' | 'pending' },
    { id: 'profile', title: 'Complete Profile', status: (currentStep === 'profile' ? 'current' : currentStep === 'onboarding' ? 'pending' : 'completed') as 'current' | 'completed' | 'pending' },
    { id: 'schemes', title: 'Discover Schemes', status: (currentStep === 'schemes' ? 'current' : ['onboarding', 'profile'].includes(currentStep) ? 'pending' : 'completed') as 'current' | 'completed' | 'pending' },
    { id: 'apply', title: 'Apply & Track', status: (currentStep === 'apply' ? 'current' : 'pending') as 'current' | 'completed' | 'pending' }
  ];

  const mockSchemes = [
    {
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing scheme for economically weaker sections and low-income groups to own a pucca house with basic amenities.",
      summary: "Get up to ₹2.5 lakh financial assistance for purchasing your first home. Ideal for families with annual income below ₹6 lakh who don't own any property.",
      benefitAmount: "Up to ₹2.5 Lakh",
      processingTime: "45-60 days",
      eligibility: ["Annual income < ₹6 lakh", "No pucca house owned", "First time home buyer"],
      category: "Housing",
      provider: "Central Government" as const,
      status: "eligible" as const
    },
    {
      title: "PM Kisan Samman Nidhi",
      description: "Financial assistance scheme for small and marginal farmers providing ₹6000 per year in three installments.",
      summary: "Receive ₹6,000 annually in your bank account as a small farmer. Perfect for landowners with less than 2 hectares who need financial support for agricultural activities.",
      benefitAmount: "₹6,000/year",
      processingTime: "30 days",
      eligibility: ["Small/marginal farmer", "Landholding < 2 hectares", "Valid land records"],
      category: "Agriculture",
      provider: "Central Government" as const,
      status: "maybe-eligible" as const
    },
    {
      title: "Ayushman Bharat - PMJAY",
      description: "Health insurance scheme providing coverage up to ₹5 lakh per family per year for secondary and tertiary care.",
      summary: "Get free medical treatment worth up to ₹5 lakh per year at empaneled hospitals. Covers your entire family with no age restrictions for cashless healthcare.",
      benefitAmount: "Up to ₹5 Lakh",
      processingTime: "15 days",
      eligibility: ["SECC 2011 beneficiary", "Rural/urban poor family", "Valid Aadhaar card"],
      category: "Healthcare",
      provider: "Central Government" as const,
      status: "eligible" as const
    }
  ];

  const getAIMessage = () => {
    switch (currentStep) {
      case 'onboarding':
        return "Welcome to Sahayata Setu! I'm here to help you discover government schemes. Let's start by verifying your identity with Aadhaar.";
      case 'profile':
        return "Great! Now let's complete your profile with income and caste information to find the best schemes for you.";
      case 'schemes':
        return `Perfect! I found ${mockSchemes.length} schemes you might be eligible for. Click on any scheme to learn more or apply directly.`;
      default:
        return "I'm here to help you at every step. Feel free to ask any questions!";
    }
  };

  const handleAadhaarVerification = () => {
    // Mock Aadhaar verification
    setUserProfile({
      name: 'राम कुमार शर्मा',
      gender: 'Male',
      address: 'Village Rampur, District Varanasi, Uttar Pradesh - 221001',
      income: '',
      caste: ''
    });
    setCurrentStep('profile');
  };

  const handleProfileComplete = () => {
    setCurrentStep('schemes');
  };

  const handleSchemeSummary = (scheme: any) => {
    setSelectedScheme(scheme);
    setShowSummary(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-text">Sahayata Setu</h1>
              <Badge variant="secondary" className="hidden sm:block">
                Assistance Bridge
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{userProfile.name ? 'Verified' : 'Guest'}</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar steps={progressSteps} />
        </div>

        {currentStep === 'onboarding' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="Government Digital Services"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 flex items-center">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Welcome to Sahayata Setu</h2>
                  <p className="text-lg opacity-90">Your gateway to government schemes and benefits</p>
                  <p className="text-sm mt-2 opacity-75">Discover schemes • Apply online • Track applications</p>
                </div>
              </div>
            </div>


            {/* Aadhaar Verification */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Aadhaar Verification
                </CardTitle>
                <CardDescription>
                  Verify your identity securely to access personalized scheme recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div>
                      <Label htmlFor="aadhaar">12-digit Aadhaar Number</Label>
                      <Input
                        id="aadhaar"
                        placeholder="XXXX XXXX XXXX"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        maxLength={12}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">10-digit Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="XXXXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={10}
                      />
                    </div>
                    <Button 
                      variant="aadhaar" 
                      className="w-full"
                      onClick={handleAadhaarVerification}
                      disabled={aadhaarNumber.length !== 12 || phoneNumber.length !== 10}
                    >
                      Verify with OTP
                    </Button>
                  </div>
                  
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'profile' && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Complete Your Profile
                </CardTitle>
                <CardDescription>
                  This information helps us find the most relevant schemes for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auto-filled from Aadhaar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name (from Aadhaar)</Label>
                    <Input value={userProfile.name} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Gender (from Aadhaar)</Label>
                    <Input value={userProfile.gender} disabled className="bg-muted" />
                  </div>
                </div>

                <div>
                  <Label>Address (from Aadhaar)</Label>
                  <Input value={userProfile.address} disabled className="bg-muted" />
                </div>

                <Separator />

                {/* Manual entry required */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="income">Annual Family Income (₹)</Label>
                    <Input
                      id="income"
                      placeholder="e.g., 200000"
                      value={userProfile.income}
                      onChange={(e) => setUserProfile({...userProfile, income: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="caste">Caste Category</Label>
                    <Select onValueChange={(value) => setUserProfile({...userProfile, caste: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                </div>

                <Button 
                  variant="government" 
                  className="w-full"
                  onClick={handleProfileComplete}
                  disabled={!userProfile.income || !userProfile.caste}
                >
                  Find My Schemes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'schemes' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      <Home className="h-3 w-3 mr-1" />
                      Housing
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Education
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      <Heart className="h-3 w-3 mr-1" />
                      Healthcare
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      <Briefcase className="h-3 w-3 mr-1" />
                      Employment
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schemes List */}
            <div className="max-w-3xl mx-auto space-y-6">
              {mockSchemes.map((scheme, index) => {
                const schemeId = scheme.title.toLowerCase().includes('pmay') ? 'pmay' 
                  : scheme.title.toLowerCase().includes('kisan') ? 'pmkisan' 
                  : 'pmjay';
                
                return (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 mx-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {scheme.category === 'Housing' && <Home className="h-6 w-6 text-primary" />}
                          {scheme.category === 'Agriculture' && <Briefcase className="h-6 w-6 text-primary" />}
                          {scheme.category === 'Healthcare' && <Heart className="h-6 w-6 text-primary" />}
                        </div>
                      </div>
                      
                      {/* Center: Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{scheme.title}</h3>
                          <Badge className={`ml-2 flex-shrink-0 ${
                            scheme.status === 'eligible' ? 'bg-success text-success-foreground' :
                            scheme.status === 'maybe-eligible' ? 'bg-warning text-warning-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {scheme.status === 'eligible' ? 'Eligible' :
                             scheme.status === 'maybe-eligible' ? 'May Be Eligible' :
                             'Not Eligible'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{scheme.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-4 w-4 text-success" />
                            <span>{scheme.benefitAmount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{scheme.processingTime}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {scheme.provider}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSchemeSummary(scheme)}
                        >
                          Summary
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/scheme/${schemeId}`)}
                        >
                          Learn More
                        </Button>
                        {(scheme.status === 'eligible' || scheme.status === 'maybe-eligible') && (
                          <Button 
                            variant={scheme.status === 'eligible' ? 'government' : 'outline'} 
                            size="sm"
                            onClick={() => navigate(`/apply/${schemeId}`)}
                          >
                            Apply Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 'apply' && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Application Submitted Successfully! 🎉</CardTitle>
                <CardDescription>
                  Your application for Pradhan Mantri Awas Yojana has been submitted and is being processed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <p className="text-success font-medium">Application ID: PMAY-2024-UP-123456</p>
                    <p className="text-sm text-muted-foreground mt-1">Expected completion: 45-60 days</p>
                  </div>
                  
                  <ProgressBar 
                    steps={[
                      { id: '1', title: 'Submitted', status: 'completed' },
                      { id: '2', title: 'Initial Review', status: 'current' },
                      { id: '3', title: 'Document Verification', status: 'pending' },
                      { id: '4', title: 'Field Verification', status: 'pending' },
                      { id: '5', title: 'Approved', status: 'pending' }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Summary Modal */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedScheme?.title}</DialogTitle>
            <DialogDescription>Quick Summary</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">{selectedScheme?.summary}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Benefit Amount</p>
                <p className="font-medium">{selectedScheme?.benefitAmount}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Processing Time</p>
                <p className="font-medium">{selectedScheme?.processingTime}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowSummary(false);
                  const schemeId = selectedScheme?.title.toLowerCase().includes('pmay') ? 'pmay' 
                    : selectedScheme?.title.toLowerCase().includes('kisan') ? 'pmkisan' 
                    : 'pmjay';
                  navigate(`/scheme/${schemeId}`);
                }}
                className="flex-1"
              >
                Learn More
              </Button>
              {selectedScheme?.status !== 'not-eligible' && (
                <Button 
                  variant="government" 
                  size="sm"
                  onClick={() => {
                    setShowSummary(false);
                    const schemeId = selectedScheme?.title.toLowerCase().includes('pmay') ? 'pmay' 
                      : selectedScheme?.title.toLowerCase().includes('kisan') ? 'pmkisan' 
                      : 'pmjay';
                    navigate(`/apply/${schemeId}`);
                  }}
                  className="flex-1"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Assistant */}
      <AIAssistant
        currentStep={getAIMessage()}
        suggestions={[
          "How does Aadhaar verification work?",
          "What documents do I need?",
          "How long does approval take?",
          "Can I check my application status?"
        ]}
      />
    </div>
  );
};

export default Index;