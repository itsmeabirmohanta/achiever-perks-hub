import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, BookOpen, Award, FileText, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const EduRevGradeUpgradeForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    achievementType: "",
    description: "",
  });

  // Achievement type options
  const achievementTypes = [
    "Technical competition",
    "Hackathon",
    "Sports",
    "Cultural",
    "Recruitment exam",
    "Research paper/Publications",
    "NPTEL",
    "Certification",
    "Revenue generation",
    "Internship beyond campus",
    "Social media"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, JPG, or PNG file.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} (${Math.round(file.size / 1024)}KB) selected successfully.`,
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('proof') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.achievementType || !formData.description || !selectedFile) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and upload proof.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Grade Upgrade Application Submitted! 📈",
        description: "Your grade upgrade request has been sent for faculty approval.",
      });
      
      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        achievementType: "",
        description: "",
      });
      setSelectedFile(null);
      
      // Clear file input
      const fileInput = document.getElementById('proof') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
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
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-300">
              <BookOpen className="w-4 h-4 mr-1" />
              Grade Upgrade (Core/Non-Core)
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Grade Upgrade Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your achievement for grade upgrade.
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Achievement Submission
            </CardTitle>
            <CardDescription>
              Fill out the form with your achievement details and upload supporting proof
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
              </div>

              {/* Achievement Type */}
              <div className="space-y-4 border-b pb-6">
                <div className="space-y-2">
                  <Label htmlFor="achievementType">Achievement Type *</Label>
                  <Select 
                    value={formData.achievementType} 
                    onValueChange={(value) => setFormData({...formData, achievementType: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select achievement type" />
                    </SelectTrigger>
                    <SelectContent>
                      {achievementTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 border-b pb-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your achievement..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </div>

              {/* Upload Proof */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Upload Proof *</h3>
                <div className="space-y-2">
                  <Label htmlFor="proof">Supporting Document</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload proof of your achievement (certificate, document, or image)
                  </p>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input 
                      id="proof" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="proof" className="cursor-pointer">
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="h-12 w-12 text-primary mb-2" />
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 text-destructive hover:text-destructive z-10"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveFile();
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
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
                className="w-full bg-gradient-hero text-white shadow-hero hover:scale-105 transition-all duration-300"
                size="lg"
                disabled={isSubmitting || !formData.achievementType || !selectedFile}
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Submit Achievement
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevGradeUpgradeForm;
