import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Star, Trophy, Award, CheckCircle, FileText, Calendar, MapPin, Users } from "lucide-react";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface Achievement {
  title: string;
  description: string;
  category: string;
  achievement_date: string;
  institution: string;
  competition_level: string;
  position_rank: string;
  certificate_url: string;
  status: string;
  type: string;
  impact?: string;
  skills?: string[];
  team_members?: string[];
  related_links?: string;
  tags?: string[];
}

const BeyondAcademicsAddAchievement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    institution: "",
    level: "",
    position: "",
    description: "",
    impact: "",
    skills: [] as string[],
    teamMembers: [] as string[],
    relatedLinks: "",
    tags: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const achievementCategories = [
    { value: "technical", label: "Technical", icon: "💻", description: "Coding competitions, hackathons, research papers" },
    { value: "sports", label: "Sports", icon: "⚽", description: "Sports competitions, tournaments, physical achievements" },
    { value: "cultural", label: "Cultural", icon: "🎭", description: "Arts, music, dance, theatrical performances" },
    { value: "leadership", label: "Leadership", icon: "👥", description: "Leadership roles, community service, organizing events" }
  ];

  const competitionLevels = [
    { value: "college", label: "College Level", description: "Competitions or events held within your college" },
    { value: "university", label: "University Level", description: "Competitions or events involving multiple colleges within the same university" },
    { value: "state", label: "State Level", description: "Competitions at the regional or state level." },
    { value: "national", label: "National Level", description: "Competitions or events involving participants from across the country" },
    { value: "international", label: "International Level", description: "Competitions or events involving participants from multiple countries" }
  ];

  const potentialBenefits = [
    { type: "Academic Credits", description: "2-10 credits based on achievement level", icon: "📊" },
    { type: "Scholarships", description: "Financial support from ₹1,000 to ₹50,000", icon: "💰" },
    { type: "Duty Leaves", description: "1-7 days excused absences", icon: "📅" },
    { type: "Recognition", description: "Featured on university platforms", icon: "🌟" },
    { type: "Certificates", description: "Official certificates of excellence", icon: "🏆" }
  ];

  const recentAchievements = [
    { title: "First Place in National Hackathon", student: "Raj Smith", date: "2 days ago" },
    { title: "Best Paper Award at Research Conference", student: "Sarah Johnson", date: "1 week ago" },
    { title: "Silver Medal in University Chess Championship", student: "David Chen", date: "2 weeks ago" }
  ];

  const verificationSteps = [
    { step: 1, title: "Submission", description: "You submit achievement details and documents", status: "active" },
    { step: 2, title: "Faculty Review", description: "Faculty verifies your submission's authenticity", status: "pending" },
    { step: 3, title: "Benefit Calculation", description: "System calculates applicable benefits", status: "pending" },
    { step: 4, title: "Approval", description: "Approved achievements are added to your profile", status: "pending" },
    { step: 5, title: "Benefit Redemption", description: "Claim your benefits through the dashboard", status: "pending" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, PNG, or JPG file.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      if (errors.file) {
        setErrors({...errors, file: ""});
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('certificate') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Achievement title is required";
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.date) newErrors.date = "Achievement date is required";
      if (!formData.level) newErrors.level = "Please select a level";
    }

    if (step === 2) {
      if (!selectedFile) newErrors.file = "Please upload a certificate or evidence";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and upload a certificate.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload file to Supabase Storage (Mock for now)
      let certificateUrl = "";
      if (selectedFile) {
        // Mock file upload - in production this would upload to Supabase Storage
        const fileName = `${uuidv4()}-${selectedFile.name}`;
        certificateUrl = `https://mock-storage.example.com/certificates/${fileName}`;
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 3. Insert achievement into the database
      const achievementData: Achievement = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        achievement_date: formData.date,
        institution: formData.institution,
        competition_level: formData.level,
        position_rank: formData.position,
        certificate_url: certificateUrl,
        status: 'pending_review',
        type: 'beyond_academic',
        impact: formData.impact,
        skills: formData.skills,
        team_members: formData.teamMembers,
        related_links: formData.relatedLinks,
        tags: formData.tags,
        // user_id: user?.id // Add when authentication is implemented
      };

      // For now, we'll use a mock submission since the database schema isn't set up yet
      // In production, this would be: const { error: insertError } = await supabase.from('achievements').insert([achievementData]);
      const mockSubmission = new Promise<{error: null}>((resolve) => {
        setTimeout(() => resolve({error: null}), 1000); // Simulate API delay
      });
      
      const { error: insertError } = await mockSubmission;

      if (insertError) {
        throw insertError;
      }

      // Reset form
      setFormData({
        title: "",
        category: "",
        date: "",
        institution: "",
        level: "",
        position: "",
        description: "",
        impact: "",
        skills: [],
        teamMembers: [],
        relatedLinks: "",
        tags: []
      });
      setSelectedFile(null);
      setCurrentStep(1);

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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Achievement Submission
          </div>
          <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
            Submit Your Achievement
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your accomplishments to gain recognition, earn academic benefits, and build your student profile.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Basic Details</span>
            </div>
            <div className="w-8 h-px bg-muted"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Supporting Info</span>
            </div>
            <div className="w-8 h-px bg-muted"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    {currentStep === 1 ? <FileText className="w-4 h-4 text-primary" /> : 
                     currentStep === 2 ? <Upload className="w-4 h-4 text-primary" /> : 
                     <CheckCircle className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {currentStep === 1 ? "Basic Achievement Details" : 
                       currentStep === 2 ? "Supporting Information" : 
                       "Review Your Submission"}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 1 ? "Tell us about your achievement" : 
                       currentStep === 2 ? "Upload proof and provide additional context" : 
                       "Verify all details before submitting"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSubmitting && (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-muted-foreground">Submitting your achievement...</span>
                      </div>
                    </div>
                  )}
                  {!isSubmitting && currentStep === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">Achievement Title *</Label>
                        <Input 
                          id="title" 
                          placeholder="e.g., First Place in National Programming Contest"
                          value={formData.title}
                          onChange={(e) => {
                            setFormData({...formData, title: e.target.value});
                            if (errors.title) {
                              setErrors({...errors, title: ""});
                            }
                          }}
                          className={`h-10 ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => setFormData({...formData, title: "Hackathon Winner"})}
                          >
                            Hackathon Winner
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => setFormData({...formData, title: "Best Coding Project"})}
                          >
                            Best Coding Project
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => setFormData({...formData, title: "Technical Paper Publication"})}
                          >
                            Technical Paper Publication
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => setFormData({...formData, title: "App Development Contest"})}
                          >
                            App Development Contest
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Achievement Category *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {achievementCategories.map((category) => (
                            <div 
                              key={category.value}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.category === category.value 
                                  ? 'border-primary bg-primary/5' 
                                  : errors.category ? 'border-red-500 hover:border-red-400' : 'border-muted hover:border-primary/50'
                              }`}
                              onClick={() => {
                                setFormData({...formData, category: category.value});
                                if (errors.category) {
                                  setErrors({...errors, category: ""});
                                }
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div>
                                  <h3 className="font-medium text-sm">{category.label}</h3>
                                  <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium">Event/Achievement Date *</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                              id="date" 
                              type="date" 
                              className={`pl-10 h-10 ${errors.date ? 'border-red-500' : ''}`}
                              value={formData.date}
                              onChange={(e) => {
                                setFormData({...formData, date: e.target.value});
                                if (errors.date) {
                                  setErrors({...errors, date: ""});
                                }
                              }}
                            />
                          </div>
                          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="institution" className="text-sm font-medium">Organizing Institution/Body</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                              id="institution" 
                              placeholder="e.g., IEEE, University Sports Council"
                              className="pl-10 h-10"
                              value={formData.institution}
                              onChange={(e) => setFormData({...formData, institution: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Competition/Achievement Level</Label>
                        <RadioGroup 
                          value={formData.level} 
                          onValueChange={(value) => {
                            setFormData({...formData, level: value});
                            if (errors.level) {
                              setErrors({...errors, level: ""});
                            }
                          }}
                        >
                          {competitionLevels.map((level) => (
                            <div key={level.value} className={`flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 ${
                              errors.level ? 'border-red-500' : ''
                            }`}>
                              <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={level.value} className="font-medium text-sm cursor-pointer">
                                  {level.label}
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-sm font-medium">Your Position/Rank/Award</Label>
                        <div className="relative">
                          <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            id="position" 
                            placeholder="e.g., 1st Place, Gold Medal, Winner"
                            className="pl-10 h-10"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button 
                        type="button" 
                        onClick={handleNext} 
                        className="w-full"
                        disabled={!formData.title || !formData.category || !formData.date || !formData.level}
                      >
                        Next
                      </Button>
                    </>
                  )}

                  {!isSubmitting && currentStep === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Achievement Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your achievement in detail. What did you do? What challenges did you overcome? What was your role?"
                          className="min-h-[100px]"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="impact" className="text-sm font-medium">Impact & Significance</Label>
                        <Textarea
                          id="impact"
                          placeholder="Explain the impact or significance of this achievement. How does it relate to your academic goals? What did you learn?"
                          className="min-h-[80px]"
                          value={formData.impact || ""}
                          onChange={(e) => setFormData({...formData, impact: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Skills Gained</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(formData.skills || []).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedSkills = [...(formData.skills || [])];
                                  updatedSkills.splice(index, 1);
                                  setFormData({...formData, skills: updatedSkills});
                                }}
                                className="ml-1 text-xs hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="skillInput"
                            placeholder="Add a skill (e.g., Leadership, Python, Public Speaking)"
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.target as HTMLInputElement;
                                const skill = input.value.trim();
                                if (skill && !(formData.skills || []).includes(skill)) {
                                  setFormData({...formData, skills: [...(formData.skills || []), skill]});
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.getElementById('skillInput') as HTMLInputElement;
                              const skill = input.value.trim();
                              if (skill && !(formData.skills || []).includes(skill)) {
                                setFormData({...formData, skills: [...(formData.skills || []), skill]});
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Team Members/Collaborators</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(formData.teamMembers || []).map((member, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              {member}
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedMembers = [...(formData.teamMembers || [])];
                                  updatedMembers.splice(index, 1);
                                  setFormData({...formData, teamMembers: updatedMembers});
                                }}
                                className="ml-1 text-xs hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="memberInput"
                            placeholder="Add a team member or collaborator"
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.target as HTMLInputElement;
                                const member = input.value.trim();
                                if (member && !(formData.teamMembers || []).includes(member)) {
                                  setFormData({...formData, teamMembers: [...(formData.teamMembers || []), member]});
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.getElementById('memberInput') as HTMLInputElement;
                              const member = input.value.trim();
                              if (member && !(formData.teamMembers || []).includes(member)) {
                                setFormData({...formData, teamMembers: [...(formData.teamMembers || []), member]});
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="relatedLinks" className="text-sm font-medium">🔗 Related Link (Optional)</Label>
                        <Input
                          id="relatedLinks"
                          placeholder="e.g., Competition website, project page, news article"
                          value={formData.relatedLinks || ""}
                          onChange={(e) => setFormData({...formData, relatedLinks: e.target.value})}
                        />
                        <p className="text-xs text-muted-foreground">
                          Add any relevant links to your achievement such as project repositories, competition websites, or news coverage
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(formData.tags || []).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              #{tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedTags = [...(formData.tags || [])];
                                  updatedTags.splice(index, 1);
                                  setFormData({...formData, tags: updatedTags});
                                }}
                                className="ml-1 text-xs hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="tagInput"
                            placeholder="Add a tag (no spaces)"
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.target as HTMLInputElement;
                                const tag = input.value.trim().replace(/\s+/g, '');
                                if (tag && !(formData.tags || []).includes(tag)) {
                                  setFormData({...formData, tags: [...(formData.tags || []), tag]});
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.getElementById('tagInput') as HTMLInputElement;
                              const tag = input.value.trim().replace(/\s+/g, '');
                              if (tag && !(formData.tags || []).includes(tag)) {
                                setFormData({...formData, tags: [...(formData.tags || []), tag]});
                                input.value = '';
                              }
                            }}
                          >
                            Add Tag
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="certificate" className="text-sm font-medium">Upload Certificate/Evidence</Label>
                        <div className="flex items-center justify-center w-full">
                          <Label
                            htmlFor="certificate"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB)</p>
                            </div>
                            <Input 
                              id="certificate" 
                              type="file" 
                              className="hidden" 
                              onChange={handleFileChange}
                              accept=".pdf,.png,.jpg,.jpeg"
                            />
                          </Label>
                        </div>
                        {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                        {selectedFile && (
                          <div className="mt-4 flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm font-medium truncate max-w-xs">{selectedFile.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Additional Supporting Documents (Optional)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center justify-center w-full">
                            <Label
                              htmlFor="additionalDocs"
                              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                            >
                              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground text-center">
                                  <span className="font-semibold">Choose File</span>
                                </p>
                                <p className="text-xs text-muted-foreground">No file chosen</p>
                              </div>
                              <Input id="additionalDocs" type="file" className="hidden" />
                            </Label>
                          </div>
                          <div className="flex items-center justify-center text-xs text-muted-foreground">
                            <div className="text-center">
                              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center mx-auto mb-1">
                                <span className="text-xs">?</span>
                              </div>
                              <p>Additional documents like certificates, project screenshots, etc.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handleNext} 
                          className="flex-1"
                          disabled={!selectedFile}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}

                  {!isSubmitting && currentStep === 3 && (
                    <>
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Review Your Submission</h3>
                        
                        {/* Basic Information */}
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                          <h4 className="font-medium text-primary">Basic Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Title:</span>
                              <p className="font-medium">{formData.title}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Category:</span>
                              <p className="font-medium">{achievementCategories.find(c => c.value === formData.category)?.label}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Date:</span>
                              <p className="font-medium">{formData.date}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Institution:</span>
                              <p className="font-medium">{formData.institution || "Not specified"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Level:</span>
                              <p className="font-medium">{competitionLevels.find(l => l.value === formData.level)?.label}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Position:</span>
                              <p className="font-medium">{formData.position}</p>
                            </div>
                          </div>
                        </div>

                        {/* Supporting Information */}
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                          <h4 className="font-medium text-primary">Supporting Information</h4>
                          
                          {formData.description && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Description:</span>
                              <p className="text-sm mt-1">{formData.description}</p>
                            </div>
                          )}
                          
                          {formData.impact && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Impact & Significance:</span>
                              <p className="text-sm mt-1">{formData.impact}</p>
                            </div>
                          )}

                          {formData.skills && formData.skills.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Skills Gained:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.teamMembers && formData.teamMembers.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Team Members:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.teamMembers.map((member, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">{member}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.relatedLinks && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Related Links:</span>
                              <p className="text-sm mt-1 text-blue-600 break-all">{formData.relatedLinks}</p>
                            </div>
                          )}

                          {formData.tags && formData.tags.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">#{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedFile && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Certificate/Evidence:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFile.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit for Verification"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Potential Benefits */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Star className="mr-2 text-primary w-5 h-5" />
                  Potential Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {potentialBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <span className="text-lg">{benefit.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm">{benefit.type}</h4>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Estimated Points */}
                <div className="border-t pt-4">
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Estimated Points</h4>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {formData.level === 'international' ? '50' :
                       formData.level === 'national' ? '40' :
                       formData.level === 'state' ? '30' :
                       formData.level === 'university' ? '20' :
                       formData.level === 'college' ? '10' : '30'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on {formData.level ? competitionLevels.find(l => l.value === formData.level)?.label : 'State Level'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Process */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="mr-2 text-primary w-5 h-5" />
                  Verification Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      step.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Trophy className="mr-2 text-primary w-5 h-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription className="text-xs">From other students in your college</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm text-primary">{achievement.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{achievement.student}</span>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeyondAcademicsAddAchievement;
