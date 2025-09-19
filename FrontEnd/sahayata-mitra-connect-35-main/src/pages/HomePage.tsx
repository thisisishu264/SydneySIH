import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, User, LogOut, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This line reads the URL from your .env.local file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a type for your scheme data for type safety
interface Scheme {
  scheme_id: number;
  scheme_name: string;
  scheme_description: string;
  benefit_summary: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>('');
  
  // State for fetching schemes
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name');
    const storedUserId = localStorage.getItem('user_id');
    
    if (!storedUserName || !storedUserId) {
      navigate('/');
      return;
    }
    
    setUserName(storedUserName);
    
    const fetchSchemes = async () => {
      try {
        // --- CHANGE #1 ---
        const response = await fetch(`${API_BASE_URL}/eligibleSchemes?user_id=${storedUserId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch schemes.');
        }
        const data: Scheme[] = await response.json();
        setSchemes(data);
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setIsLoadingSchemes(false);
      }
    };
    
    fetchSchemes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    navigate('/');
  };
  
  const handleApply = async (schemeId: number, schemeName: string) => {
    const userId = localStorage.getItem('user_id');
    
    try {
      // --- CHANGE #2 ---
      const response = await fetch(`${API_BASE_URL}/submitApplication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: parseInt(userId!), scheme_id: schemeId }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      toast({
        title: "Application Submitted! ✅",
        description: `Your application for "${schemeName}" has been received.`,
      });

    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Could not submit application. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const renderSchemes = () => {
    if (isLoadingSchemes) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Finding the best schemes for you...</p>
        </div>
      );
    }
    
    if (fetchError) {
      return (
        <div className="bg-destructive/10 text-destructive flex items-center p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 mr-3" />
          <p>Error: {fetchError}</p>
        </div>
      );
    }
    
    if (schemes.length === 0) {
      return <p className="text-center text-muted-foreground p-8">No schemes found matching your profile at the moment.</p>;
    }
    
    return (
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <Card key={scheme.scheme_id} className="shadow-md transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>{scheme.scheme_name}</CardTitle>
              <CardDescription className="text-lg font-semibold text-green-700">
                {scheme.benefit_summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">{scheme.scheme_description}</p>
              <Button 
                onClick={() => handleApply(scheme.scheme_id, scheme.scheme_name)} 
                className="w-full"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-text">Sahayata Setu</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {userName}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <Card className="shadow-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                Welcome, {userName}!
              </CardTitle>
              <CardDescription>
                Based on your profile, we've found the following government schemes you may be eligible for.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card bg-white">
            <CardHeader>
              <CardTitle>Your Recommended Schemes</CardTitle>
              <CardDescription>
                Click "Apply Now" to start a simple, guided application process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderSchemes()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;