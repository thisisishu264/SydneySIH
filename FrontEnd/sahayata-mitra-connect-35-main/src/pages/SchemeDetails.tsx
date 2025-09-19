import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  IndianRupee, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle, 
  FileText,
  Phone,
  Globe
} from 'lucide-react';
import logoImage from '@/assets/sahayata-setu-logo.png';

const SchemeDetails = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();

  const schemeData = {
    'pmay': {
      title: "Pradhan Mantri Awas Yojana",
      shortDescription: "Housing scheme for economically weaker sections",
      fullDescription: "Pradhan Mantri Awas Yojana is a flagship scheme of the Government of India to provide affordable housing to the urban poor. The scheme aims to provide pucca houses to all eligible families in urban areas by 2022. Under this scheme, eligible beneficiaries are provided financial assistance to construct or acquire a house.",
      benefitAmount: "Up to ₹2.5 Lakh",
      processingTime: "45-60 days",
      eligibility: [
        "Annual income less than ₹6 lakh",
        "No pucca house owned by family",
        "First time home buyer",
        "Family should not have availed central assistance under any housing scheme",
        "Adult member in the family should not own a house in any part of India"
      ],
      category: "Housing",
      provider: "Central Government",
      status: "eligible",
      features: [
        "Interest subsidy on home loans",
        "Direct financial assistance",
        "Partnership model with private developers",
        "In-situ slum redevelopment"
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "Domicile Certificate",
        "Caste Certificate (if applicable)",
        "Bank Account Details",
        "Property Documents (if any)"
      ],
      officialWebsite: "https://pmaymis.gov.in/",
      helpline: "1800-11-6446"
    },
    'pmkisan': {
      title: "PM Kisan Samman Nidhi",
      shortDescription: "Financial assistance for small and marginal farmers",
      fullDescription: "PM-Kisan is a Central Sector Scheme that provides income support to all landholding farmers' families to supplement their financial needs for procuring inputs related to agriculture and allied activities as well as domestic needs. Under the scheme, ₹6000 per year is provided to eligible beneficiary farmers' families in three equal installments of ₹2000 each every four months.",
      benefitAmount: "₹6,000/year",
      processingTime: "30 days",
      eligibility: [
        "Small and marginal farmer families",
        "Landholding up to 2 hectares",
        "Valid land ownership records",
        "Active bank account linked with Aadhaar",
        "Should not be an income tax payer"
      ],
      category: "Agriculture",
      provider: "Central Government",
      status: "maybe-eligible",
      features: [
        "Direct cash transfer to bank account",
        "Three installments per year",
        "No application fee",
        "Online application facility"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Account Passbook",
        "Land Ownership Documents",
        "Ration Card",
        "Voter ID Card"
      ],
      officialWebsite: "https://pmkisan.gov.in/",
      helpline: "155261"
    },
    'pmjay': {
      title: "Ayushman Bharat - PMJAY",
      shortDescription: "Health insurance for poor families",
      fullDescription: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) is the world's largest health insurance scheme fully financed by the government. It provides health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 10.74 crore poor and vulnerable families.",
      benefitAmount: "Up to ₹5 Lakh",
      processingTime: "15 days",
      eligibility: [
        "Families covered under SECC 2011",
        "Rural and urban poor families",
        "Valid Aadhaar card mandatory",
        "Family should be in the beneficiary list",
        "No age limit for coverage"
      ],
      category: "Healthcare",
      provider: "Central Government", 
      status: "eligible",
      features: [
        "Cashless treatment at empaneled hospitals",
        "Coverage for pre and post hospitalization",
        "No cap on family size and age",
        "Covers 1,393 medical packages"
      ],
      documents: [
        "Aadhaar Card",
        "Ration Card",
        "SECC 2011 verification",
        "Mobile number for OTP",
        "Address Proof"
      ],
      officialWebsite: "https://pmjay.gov.in/",
      helpline: "14555"
    }
  };

  const scheme = schemeData[schemeId as keyof typeof schemeData];

  if (!scheme) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Scheme Not Found</h2>
            <p className="text-muted-foreground mb-4">The scheme you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Go Back Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        return 'You are Eligible';
      case 'maybe-eligible':
        return 'You May Be Eligible';
      default:
        return 'Not Eligible';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Schemes
              </Button>
              <img src={logoImage} alt="Sahayata Setu" className="h-8 w-auto" />
              <h1 className="text-xl font-bold gradient-text">Sahayata Setu</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Scheme Overview */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-primary mb-2">
                  {scheme.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {scheme.provider} • {scheme.category}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(scheme.status)} variant="outline">
                {getStatusText(scheme.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-6">{scheme.fullDescription}</p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <IndianRupee className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Benefit Amount</p>
                  <p className="font-semibold">{scheme.benefitAmount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing Time</p>
                  <p className="font-semibold">{scheme.processingTime}</p>
                </div>
              </div>
            </div>

            {scheme.status !== 'not-eligible' && (
              <div className="flex gap-4">
              <Button 
                variant="government" 
                className="flex-1"
                onClick={() => navigate(`/apply/${schemeId}`)}
              >
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(scheme.officialWebsite, '_blank')}
              >
                <Globe className="h-4 w-4" />
                Official Website
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(`tel:${scheme.helpline}`)}
              >
                <Phone className="h-4 w-4" />
                Call {scheme.helpline}
              </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eligibility Criteria */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheme.eligibility.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{criteria}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheme.documents.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{doc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheme.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default SchemeDetails;