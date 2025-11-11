import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserCheck, Users, Award, CheckCircle, Gift, Star } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const StudentReferral = () => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referredName: "",
    referredEmail: "",
    referredPhone: "",
    relationship: "",
    achievementDetails: "",
    evidenceDescription: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const benefits = [
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "Referral Rewards",
      description: "Earn points and rewards for successful referrals"
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Achievement Boost",
      description: "Get additional recognition for expanding the community"
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      title: "Priority Benefits",
      description: "Early access to new features and programs"
    }
  ];

  const referralStats = [
    { label: "Active Referrers", value: "250+", color: "text-blue-600" },
    { label: "Successful Referrals", value: "1,200+", color: "text-green-600" },
    { label: "Rewards Distributed", value: "₹2.5L+", color: "text-purple-600" },
    { label: "Average Reward", value: "₹500", color: "text-orange-600" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['referrerName', 'referrerEmail', 'referredName', 'referredEmail', 'achievementDetails'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock submission success
      toast({
        title: "Referral Submitted Successfully! 🎉",
        description: "Your referral is now pending approval. We'll notify you once it's processed.",
      });
      
      // Reset form
      setFormData({
        referrerName: "",
        referrerEmail: "",
        referredName: "",
        referredEmail: "",
        referredPhone: "",
        relationship: "",
        achievementDetails: "",
        evidenceDescription: ""
      });
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your referral. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/edu-rev" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to EduRev
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserCheck className="w-4 h-4" />
              Student Referral Program
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
              Refer High-Achieving Students
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Know someone with outstanding achievements? Refer them to our platform, and earn rewards when they get verified!
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {referralStats.map((stat, index) => (
            <div key={index} className="text-center bg-card/80 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold academic-heading mb-6 text-center">Why Refer Students?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Referral Form */}
        <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Submit Student Referral
            </CardTitle>
            <CardDescription>
              Provide details about the high-achieving student you'd like to refer to our platform.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Referrer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referrerName">Your Full Name *</Label>
                    <Input 
                      id="referrerName"
                      value={formData.referrerName}
                      onChange={(e) => handleInputChange('referrerName', e.target.value)}
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referrerEmail">Your Email *</Label>
                    <Input 
                      id="referrerEmail"
                      type="email"
                      value={formData.referrerEmail}
                      onChange={(e) => handleInputChange('referrerEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Referred Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Student Being Referred</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referredName">Student's Full Name *</Label>
                    <Input 
                      id="referredName"
                      value={formData.referredName}
                      onChange={(e) => handleInputChange('referredName', e.target.value)}
                      placeholder="Enter student's full name"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referredEmail">Student's Email *</Label>
                    <Input 
                      id="referredEmail"
                      type="email"
                      value={formData.referredEmail}
                      onChange={(e) => handleInputChange('referredEmail', e.target.value)}
                      placeholder="student.email@example.com"
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referredPhone">Student's Phone (Optional)</Label>
                    <Input 
                      id="referredPhone"
                      value={formData.referredPhone}
                      onChange={(e) => handleInputChange('referredPhone', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Your Relationship</Label>
                    <Input 
                      id="relationship"
                      value={formData.relationship}
                      onChange={(e) => handleInputChange('relationship', e.target.value)}
                      placeholder="e.g., Classmate, Friend, Colleague"
                    />
                  </div>
                </div>
              </div>

              {/* Achievement Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Student's Achievements</h3>
                <div className="space-y-2">
                  <Label htmlFor="achievementDetails">Achievement Details *</Label>
                  <Textarea 
                    id="achievementDetails"
                    value={formData.achievementDetails}
                    onChange={(e) => handleInputChange('achievementDetails', e.target.value)}
                    placeholder="Describe the student's notable achievements, awards, certifications, or accomplishments..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evidenceDescription">Evidence/Proof Description</Label>
                  <Textarea 
                    id="evidenceDescription"
                    value={formData.evidenceDescription}
                    onChange={(e) => handleInputChange('evidenceDescription', e.target.value)}
                    placeholder="Describe any evidence or proof of achievements (certificates, news articles, competition results, etc.)"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Referral Process:</p>
                      <ul className="space-y-1">
              <li>• We will contact the referred student to verify their achievements</li>
              <li>• Upon successful verification, both you and the student receive rewards</li>
              <li>• You will be notified of the referral status via email</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero hover:opacity-90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <UserCheck className="mr-2 h-5 w-5" />
                      Submit Referral for Review
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12 bg-gradient-hero text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            Have More Questions?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Check out our referral guidelines or contact support for more information about the referral process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Referral Guidelines
            </Button>
            <Button asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/dashboard">
                View My Referrals
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReferral;