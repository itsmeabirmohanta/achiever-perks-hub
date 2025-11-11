import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Briefcase, Award, FileText, CheckCircle, Building2 } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevInternshipsForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    courseName: "",
    
    // Internship Information
    companyName: "",
    companyWebsite: "",
    industry: "",
    customIndustry: "",
    position: "",
    department: "",
    
    // Duration
    startDate: "",
    endDate: "",
    duration: "",
    internshipType: "",
    customInternshipType: "",
    
    // Stipend
    stipendAmount: "",
    
    // Description
    description: "",
  });

  const industries = [
    "Technology/IT",
    "Finance",
    "Healthcare",
    "Marketing",
    "Manufacturing",
    "Consulting",
    "Education",
    "Non-profit",
    "Government",
    "Research & Development",
    "Any other"
  ];

  const internshipTypes = [
    "Full-time",
    "Part-time",
    "Remote",
    "Hybrid",
    "Summer Internship",
    "Winter Internship",
    "Semester-long",
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
    
    if (!formData.studentName || !formData.courseCode || !formData.companyName || !formData.position) {
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
        title: "Internship Application Submitted! 💼",
        description: "Your internship experience has been sent for faculty review.",
      });
      
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        courseName: "",
        companyName: "",
        companyWebsite: "",
        industry: "",
        customIndustry: "",
        position: "",
        department: "",
        startDate: "",
        endDate: "",
        duration: "",
        internshipType: "",
        customInternshipType: "",
        stipendAmount: "",
        description: "",
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
            ← Back to EduRev
          </Link>
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-300">
              <Briefcase className="w-4 h-4 mr-1" />
              Internship Experience
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Internship Experience Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your professional internship experiences for academic benefits
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Internship Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your internship experience
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
                      placeholder="e.g., CSE201"
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
                      placeholder="e.g., Data Structures"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input 
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="e.g., Google, Microsoft"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.industry === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify industry"
                          value={formData.customIndustry}
                          onChange={(e) => setFormData({...formData, customIndustry: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Job Title *</Label>
                    <Input 
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="e.g., Software Development Intern"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      placeholder="e.g., Engineering, Product Development"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input 
                    id="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                    placeholder="https://company.com"
                    type="url"
                  />
                </div>
              </div>

              {/* Duration & Type */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Duration & Type</h3>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (months/weeks)</Label>
                    <Input 
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 3 months, 12 weeks"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipType">Internship Type</Label>
                    <Select value={formData.internshipType} onValueChange={(value) => setFormData({...formData, internshipType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {internshipTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.internshipType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify internship type"
                          value={formData.customInternshipType}
                          onChange={(e) => setFormData({...formData, customInternshipType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stipendAmount">Stipend Amount (if applicable)</Label>
                  <Input 
                    id="stipendAmount"
                    value={formData.stipendAmount}
                    onChange={(e) => setFormData({...formData, stipendAmount: e.target.value})}
                    placeholder="e.g., ₹10,000 per month or Not Applicable"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Description</h3>
                <div className="space-y-2">
                  <Label htmlFor="description">Internship Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide comprehensive details about your internship including responsibilities, projects, skills gained, achievements, and overall experience..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-[150px]"
                  />
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Supporting Documents</h3>
                <div className="space-y-2">
                  <Label htmlFor="document">Upload Internship Certificate or Offer Letter</Label>
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
                            Click to upload internship certificate, offer letter, or completion letter
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
                    Submit Internship Experience
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Internship Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Practical experience credit</li>
                  <li>• Industry exposure recognition</li>
                  <li>• Industrial training equivalency</li>
                  <li>• Project collaboration opportunities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevInternshipsForm;

