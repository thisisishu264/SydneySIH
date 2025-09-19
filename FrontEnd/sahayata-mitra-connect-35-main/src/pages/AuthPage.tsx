import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This line reads the URL from your .env.local file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stage, setStage] = useState<'send-otp' | 'verify-otp'>('send-otp');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  const handleSendOTP = async () => {
    if (aadhaarNumber.length !== 12 || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid 12-digit Aadhaar and 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // --- CHANGE #1 ---
      const response = await fetch(`${API_BASE_URL}/initiate-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhar_number: aadhaarNumber,
          phone_number: phoneNumber
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsNewUser(data.is_new_user);
        setStage('verify-otp');
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send OTP",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Is it running?",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // --- CHANGE #2 ---
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhar_number: aadhaarNumber,
          otp: otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'LOGIN_SUCCESS') {
          localStorage.setItem('user_name', data.name);
          localStorage.setItem('user_id', data.user_id.toString());
          navigate('/home');
        } else if (data.status === 'REGISTRATION_OTP_VERIFIED') {
          localStorage.setItem('user_id', data.user_id.toString());
          navigate('/complete-profile');
        }
        toast({
          title: "Success",
          description: data.message,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Invalid OTP",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Is it running?",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // The rest of your component's return statement (JSX) remains the same
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Sahayata Setu</h1>
          <Badge variant="secondary">Assistance Bridge</Badge>
          <p className="text-muted-foreground">Secure Authentication Portal</p>
        </div>
        {stage === 'send-otp' && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Identity Verification
              </CardTitle>
              <CardDescription>
                Enter your Aadhaar and phone number to receive an OTP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">12-digit Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="XXXX XXXX XXXX"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">10-digit Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="XXXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                />
              </div>
              <Button
                onClick={handleSendOTP}
                disabled={aadhaarNumber.length !== 12 || phoneNumber.length !== 10 || isLoading}
                className="w-full"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </CardContent>
          </Card>
        )}
        {stage === 'verify-otp' && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                OTP Verification
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to your phone ending in ****{phoneNumber.slice(-4)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">6-digit OTP</Label>
                <Input
                  id="otp"
                  placeholder="XXXXXX"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStage('send-otp')}
                disabled={isLoading}
                className="w-full"
              >
                Back to Aadhaar Entry
              </Button>
            </CardContent>
          </Card>
        )}
        <div className="text-center text-sm text-muted-foreground">
          <p>Your data is secured with end-to-end encryption</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;