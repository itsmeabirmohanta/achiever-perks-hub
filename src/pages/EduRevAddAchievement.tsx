import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, BookOpen, Award, CheckCircle, FileText } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const categoryDisplay: { [key: string]: string } = {
  rpl: "Recognition of Prior Learning (RPL)",
  mooc: "MOOC / CERTIFICATIONS",
  "grade-upgradation": "Grade Upgrade (Core/Non-Core)",
  
  project: "Project",
  "extra-credits": "Extra Credits",
  "social-media": "Social Media",
  "revenue-generation": "Revenue Generation",
  internships: "Internships",
  "community-service": "Community Service",
};

// Mock courses for auto-suggestion
const courses = [
  { value: "cap201", label: "CAP201: Electrical Engineering" },
  { value: "eng101", label: "ENG101: Engineering Mathematics" },
  { value: "phy102", label: "PHY102: Physics Laboratory" },
  { value: "cse201", label: "CSE201: Data Structures" },
  { value: "mech101", label: "MECH101: Thermodynamics" },
  { value: "bus101", label: "BUS101: Business Communication" },
  { value: "env201", label: "ENV201: Environmental Studies" },
  { value: "art101", label: "ART101: Creative Arts" },
];

const EduRevAddAchievement = () => {
  const { categoryName, courseCode } = useParams<{ categoryName?: string; courseCode?: string }>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(courseCode || "");
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "");
  const [showBenefits, setShowBenefits] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
    if (courseCode) {
      setValue(courseCode.toLowerCase());
    }
  }, [categoryName, courseCode]);



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
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
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
    const fileInput = document.getElementById('certificate') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const sampleBenefits = [
    { course: "CAP201: Electrical Engineering", benefit: "5 marks bonus in final assessment" },
    { course: "ENG101: Engineering Mathematics", benefit: "Direct credit for practical component" },
    { course: "PHY102: Physics Laboratory", benefit: "Exemption from lab attendance requirement" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !title || !selectedFile) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and upload a certificate.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock submission process - in production this would use Supabase
      // 1. Simulate file upload
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 2. Mock database insertion
      const achievementData = {
        id: Date.now(), // Mock ID
        title,
        description,
        category_id: parseInt(selectedCategory),
        certificate_filename: selectedFile.name,
        file_size: Math.round(selectedFile.size / 1024), // Size in KB
        status: 'pending_review',
        submitted_at: new Date().toISOString(),
      };

      // Log the mock data (in production this would be saved to database)
      console.log('Mock Achievement Submission:', achievementData);

      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setValue("");
      setSelectedFile(null);
      
      // Clear file input
      const fileInput = document.getElementById('certificate') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      setShowBenefits(true);
      toast({
        title: "Achievement Submitted Successfully! 🎉",
        description: "Your achievement has been sent for faculty verification. You can track the status in real-time.",
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
            EduRev Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your structured achievements aligned to academic, research, or career pathways.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline" className="border-primary/20 text-primary">Academic Excellence</Badge>
            <Badge variant="outline" className="border-accent/20 text-accent">Research Focus</Badge>
            <Badge variant="outline" className="border-success/20 text-success">Career Development</Badge>
          </div>
        </div>

        {!showBenefits ? (
          /* Achievement Submission Form */
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Submit Achievement</span>
              </CardTitle>
              <CardDescription>
                Fill out the details of your achievement to get course-specific benefits.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Student Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="id">Student ID</Label>
                    <Input id="id" placeholder="Enter your student ID" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Achievement Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} required disabled={!!categoryName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select achievement category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryDisplay).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Course</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={!!courseCode}
                      >
                        {value
                          ? courses.find((course) => course.value === value)?.label
                          : "Select course..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search course..." />
                        <CommandEmpty>No course found.</CommandEmpty>
                        <CommandGroup>
                          {courses.map((course) => (
                            <CommandItem
                              key={course.value}
                              value={course.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === course.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {course.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Achievement Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., First Place in National Robotics Competition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide detailed description of your achievement..."
                    className="min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Institution</Label>
                    <Input id="organization" placeholder="e.g., IEEE, Government of India" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Achievement Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate">Upload Certificate</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input 
                      id="certificate" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="certificate" className="cursor-pointer">
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
                            Click to upload or drag and drop your certificate
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: PDF, JPG, PNG (Max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero text-white shadow-hero hover:scale-105 transition-all duration-300"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Award className="mr-2 h-5 w-5" />
                      Submit Achievement for Verification
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Course Benefits Display */
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="shadow-elegant border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-6 w-6" />
                  <span>Achievement Submitted Successfully!</span>
                </CardTitle>
                <CardDescription>
                  Based on your achievement, here are the eligible course benefits:
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-4">
                  {sampleBenefits.map((benefit, index) => (
                    <Card key={index} className="bg-gradient-card border-primary/10">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-primary mb-1">{benefit.course}</h4>
                            <p className="text-sm text-muted-foreground">{benefit.benefit}</p>
                          </div>
                          <Badge variant="outline" className="text-success border-success/20">
                            Eligible
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold text-accent">Next Steps</h4>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Your achievement is pending faculty verification</li>
                    <li>• You'll receive email notifications on status updates</li>
                    <li>• Approved benefits will be automatically applied to your courses</li>
                    <li>• Track real-time status in your dashboard</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setShowBenefits(false)}
                  variant="outline" 
                  className="w-full mt-6"
                >
                  Submit Another Achievement
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EduRevAddAchievement;