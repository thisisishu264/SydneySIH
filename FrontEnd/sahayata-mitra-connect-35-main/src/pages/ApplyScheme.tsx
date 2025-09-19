import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import logoImage from '@/assets/sahayata-setu-logo.png';

const ApplyScheme = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({});

  const schemeData = {
    'pmay': {
      title: "Pradhan Mantri Awas Yojana",
      applicationSteps: ['Document Upload', 'Verification', 'Review & Submit'],
      documents: [
        { 
          name: "Aadhaar Card", 
          required: true, 
          description: "Valid Aadhaar card of all family members",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Income Certificate", 
          required: true, 
          description: "Income certificate from competent authority",
          format: "PDF (Max 5MB)"
        },
        { 
          name: "Domicile Certificate", 
          required: true, 
          description: "Domicile/residence proof of the state/UT",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Caste Certificate", 
          required: false, 
          description: "Caste certificate (if applicable)",
          format: "PDF (Max 5MB)"
        },
        { 
          name: "Bank Account Details", 
          required: true, 
          description: "Bank passbook first page or cancelled cheque",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Property Documents", 
          required: false, 
          description: "Existing property documents (if any)",
          format: "PDF (Max 10MB)"
        }
      ],
      prerequisites: [
        "Ensure all documents are clear and legible",
        "Documents should be in PDF, JPG, or PNG format",
        "File size should not exceed the specified limit",
        "All mandatory documents must be uploaded",
        "Information in documents should match Aadhaar details"
      ],
      estimatedTime: "45-60 days",
      applicationFee: "No application fee"
    },
    'pmkisan': {
      title: "PM Kisan Samman Nidhi",
      applicationSteps: ['Document Upload', 'Land Verification', 'Submit'],
      documents: [
        { 
          name: "Aadhaar Card", 
          required: true, 
          description: "Valid Aadhaar card of the farmer",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Bank Account Passbook", 
          required: true, 
          description: "Bank passbook first page with account details",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Land Ownership Documents", 
          required: true, 
          description: "Land records showing ownership (Khata/Khatauni)",
          format: "PDF (Max 10MB)"
        },
        { 
          name: "Ration Card", 
          required: false, 
          description: "Valid ration card",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Voter ID Card", 
          required: false, 
          description: "Voter ID card for identity verification",
          format: "PDF, JPG, PNG (Max 5MB)"
        }
      ],
      prerequisites: [
        "Land should be in farmer's name",
        "Bank account should be active and linked to Aadhaar",
        "Farmer should not be an income tax payer",
        "Land records should be up to date",
        "Mobile number should be registered with Aadhaar"
      ],
      estimatedTime: "30 days",
      applicationFee: "No application fee"
    },
    'pmjay': {
      title: "Ayushman Bharat - PMJAY",
      applicationSteps: ['Document Upload', 'SECC Verification', 'Card Generation'],
      documents: [
        { 
          name: "Aadhaar Card", 
          required: true, 
          description: "Valid Aadhaar card of all family members",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "Ration Card", 
          required: true, 
          description: "Valid ration card showing family details",
          format: "PDF, JPG, PNG (Max 5MB)"
        },
        { 
          name: "SECC 2011 Data", 
          required: true, 
          description: "SECC 2011 verification document",
          format: "PDF (Max 5MB)"
        },
        { 
          name: "Mobile Verification", 
          required: true, 
          description: "Mobile number registered with Aadhaar",
          format: "OTP verification"
        },
        { 
          name: "Address Proof", 
          required: true, 
          description: "Any government-issued address proof",
          format: "PDF, JPG, PNG (Max 5MB)"
        }
      ],
      prerequisites: [
        "Family should be in SECC 2011 beneficiary list",
        "Aadhaar should be linked with mobile number",
        "Family members should not have health insurance above ₹5 lakh",
        "Address should match with Aadhaar",
        "All family members should be included in application"
      ],
      estimatedTime: "15 days",
      applicationFee: "No application fee"
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

  const handleFileUpload = (docName: string) => {
    // Mock file upload
    setUploadedDocs(prev => ({ ...prev, [docName]: true }));
  };

  const requiredDocs = scheme.documents.filter(doc => doc.required);
  const uploadedRequiredDocs = requiredDocs.filter(doc => uploadedDocs[doc.name]);
  const uploadProgress = (uploadedRequiredDocs.length / requiredDocs.length) * 100;

  const handleSubmit = () => {
    // Mock submission - navigate to success page
    navigate('/application-success');
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
                onClick={() => navigate(`/scheme/${schemeId}`)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Details
              </Button>
              <img src={logoImage} alt="Sahayata Setu" className="h-8 w-auto" />
              <h1 className="text-xl font-bold gradient-text">Apply for Scheme</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Application Header */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Apply for {scheme.title}
            </CardTitle>
            <CardDescription>
              Complete the application process by uploading required documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Application Fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{scheme.estimatedTime}</div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{scheme.documents.length}</div>
                <div className="text-sm text-muted-foreground">Documents Required</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Upload Progress</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prerequisites */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheme.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{prereq}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Document Upload
                </CardTitle>
                <CardDescription>
                  Upload all required documents. Make sure they are clear and legible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scheme.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{doc.name}</h3>
                            {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                            {uploadedDocs[doc.name] && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doc.description}</p>
                          <p className="text-xs text-muted-foreground">{doc.format}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {uploadedDocs[doc.name] ? (
                          <>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              Replace
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => handleFileUpload(doc.name)}
                          >
                            <Upload className="h-4 w-4" />
                            Upload
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Sample
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                      I understand that any false information may lead to rejection of my application or cancellation of benefits.
                    </Label>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="government" 
                      className="flex-1"
                      disabled={!agreedToTerms || uploadProgress < 100}
                      onClick={handleSubmit}
                    >
                      Submit Application
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/scheme/${schemeId}`)}>
                      Save as Draft
                    </Button>
                  </div>

                  {uploadProgress < 100 && (
                    <p className="text-sm text-muted-foreground">
                      Please upload all required documents to proceed with submission.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplyScheme;