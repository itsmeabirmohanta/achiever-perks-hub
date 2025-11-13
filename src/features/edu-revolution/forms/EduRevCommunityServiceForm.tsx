import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Heart, Award, FileText, CheckCircle, Users } from "lucide-react";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevCommunityServiceForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    courseName: "",
    
    // Organization Information
    organizationName: "",
    organizationType: "",
    customOrganizationType: "",
    organizationWebsite: "",
    
    // Service Details
    serviceType: "",
    customServiceType: "",
    projectName: "",
    serviceDescription: "",
    
    // Duration
    startDate: "",
    endDate: "",
  });

  const organizationTypes = [
    "NGO",
    "Government Organization",
    "Religious Organization",
    "Educational Institution",
    "Healthcare Facility",
    "Community Center",
    "Environmental Organization",
    "Youth Organization",
    "Any other"
  ];

  const serviceTypes = [
    "Education & Tutoring",
    "Healthcare Services",
    "Environmental Conservation",
    "Community Development",
    "Disaster Relief",
    "Elderly Care",
    "Child Welfare",
    "Animal Welfare",
    "Clean-up Drives",
    "Fundraising",
    "Mentoring",
    "Any other"
  ];

  const serviceFrequencies = [
    "One-time Event",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Seasonal",
    "Ongoing",
    "Any other"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: "Document Selected",
        description: `${file.name} added successfully.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.courseCode || !formData.organizationName || !formData.serviceType) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Community Service Application Submitted! 🤝",
        description: "Your community service contribution has been sent for faculty review.",
      });
      
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        courseName: "",
        organizationName: "",
        organizationType: "",
        customOrganizationType: "",
        organizationWebsite: "",
        serviceType: "",
        customServiceType: "",
        projectName: "",
        serviceDescription: "",
        startDate: "",
        endDate: "",
      });
      setSelectedFile(null);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An error occurred. Please try again.",
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
        <div className="mb-8">
          <Link to="/edu-rev" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            ← Back to Edu Revolution
          </Link>
          <div className="text-center">
            <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-300">
              <Heart className="w-4 h-4 mr-1" />
              Community Service
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Community Service Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your community service contributions for credits and recognition
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Community Service Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your community service work
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Student Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input 
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input 
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                      placeholder="Enter your student ID"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input 
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                      placeholder="e.g., ENV201"
                      required
                      disabled={!!courseCode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input 
                      id="courseName"
                      value={formData.courseName}
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      placeholder="e.g., Environmental Studies"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Organization Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input 
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      placeholder="e.g., Red Cross, Local NGO"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <Select value={formData.organizationType} onValueChange={(value) => setFormData({...formData, organizationType: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.organizationType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify organization type"
                          value={formData.customOrganizationType}
                          onChange={(e) => setFormData({...formData, customOrganizationType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationWebsite">Organization Website</Label>
                  <Input 
                    id="organizationWebsite"
                    value={formData.organizationWebsite}
                    onChange={(e) => setFormData({...formData, organizationWebsite: e.target.value})}
                    placeholder="https://organization.org"
                    type="url"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Service Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.serviceType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify service type"
                          value={formData.customServiceType}
                          onChange={(e) => setFormData({...formData, customServiceType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project/Initiative Name</Label>
                    <Input 
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      placeholder="e.g., Clean Water Initiative"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Service Description *</Label>
                  <Textarea
                    id="serviceDescription"
                    placeholder="Provide a detailed description of your community service work, activities, and contributions..."
                    value={formData.serviceDescription}
                    onChange={(e) => setFormData({...formData, serviceDescription: e.target.value})}
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>

              {/* Duration & Location */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Duration & Location</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input 
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Supporting Documents</h3>
                <div className="space-y-2">
                  <Label htmlFor="document">Upload Certificate, Letter of Recommendation, or Proof</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input 
                      id="document" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="document" className="cursor-pointer">
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="h-12 w-12 text-primary mb-2" />
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <Button variant="ghost" size="sm" className="mt-2" onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}>
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload certificate, recommendation letter, or proof of service
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, JPG, PNG (Max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-hero text-white shadow-hero"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Submit Community Service Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-pink-50 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-pink-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-pink-900 mb-2">Community Service Benefits</h4>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• Community service credit</li>
                  <li>• Sustainability leadership recognition</li>
                  <li>• Social impact credits</li>
                  <li>• Community engagement certificate</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevCommunityServiceForm;

