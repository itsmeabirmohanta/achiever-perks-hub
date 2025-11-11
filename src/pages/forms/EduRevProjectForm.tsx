import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Code, Award, FileText, CheckCircle, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevProjectForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    projectTitle: "",
    projectType: "",
    customProjectType: "",
    toolsTechnologies: "",
    startDate: "",
    completionDate: "",
    details: "",
    repositoryUrl: "",
    liveDemoUrl: "",
    teamMembers: "",
    role: ""
  });

  const projectTypes = [
    "Course Project",
    "Personal Capstone Project",
    "Competition Entry",
    "Research Project",
    "Startup Idea",
    "Open Source Contribution",
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.courseCode || !formData.projectTitle || !formData.projectType) {
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
        title: "Project Application Submitted! 🚀",
        description: "Your project application has been sent for faculty review.",
      });
      
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        projectTitle: "",
        projectType: "",
        customProjectType: "",
        toolsTechnologies: "",
        startDate: "",
        completionDate: "",
        details: "",
        repositoryUrl: "",
        liveDemoUrl: "",
        teamMembers: "",
        role: ""
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
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-300">
              <Code className="w-4 h-4 mr-1" />
              Project Application
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Project Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your exceptional project work for course benefits
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Project Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your project
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>
              </div>

              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Project Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="projectTitle">Project Title *</Label>
                  <Input 
                    id="projectTitle"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                    placeholder="e.g., AI-Powered Student Analytics Platform"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.projectType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify your project type"
                          value={formData.customProjectType}
                          onChange={(e) => setFormData({...formData, customProjectType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toolsTechnologies">Tools & Technologies</Label>
                    <Input 
                      id="toolsTechnologies"
                      value={formData.toolsTechnologies}
                      onChange={(e) => setFormData({...formData, toolsTechnologies: e.target.value})}
                      placeholder="e.g., React, Python, PostgreSQL"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Input 
                      id="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Provide comprehensive details about your project including goals, deliverables, methodology, results, achievements, impact, and any other relevant information..."
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="min-h-[150px]"
                  />
                </div>
              </div>

              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Links & Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="repositoryUrl">Repository URL (GitHub, etc.)</Label>
                    <Input 
                      id="repositoryUrl"
                      value={formData.repositoryUrl}
                      onChange={(e) => setFormData({...formData, repositoryUrl: e.target.value})}
                      placeholder="https://github.com/..."
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liveDemoUrl">Live Demo URL</Label>
                    <Input 
                      id="liveDemoUrl"
                      value={formData.liveDemoUrl}
                      onChange={(e) => setFormData({...formData, liveDemoUrl: e.target.value})}
                      placeholder="https://yourproject.demo.com"
                      type="url"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Supporting Documents</h3>
                <div className="space-y-2">
                  <Label htmlFor="projectDocument">Upload Project Documentation</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input 
                      id="projectDocument" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="projectDocument" className="cursor-pointer">
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
                            Click to upload project documentation or screenshots
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
                    Submit Project Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900 mb-2">Project Benefits</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Best project award and recognition</li>
                  <li>• Featured in department newsletter</li>
                  <li>• Opportunity to present to faculty</li>
                  <li>• Seed funding for project extension (if eligible)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevProjectForm;

