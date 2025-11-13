import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Star, Award, FileText, CheckCircle, GraduationCap, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevExtraCreditsForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    activityType: "",
    customActivityType: "",
    activityTitle: "",
    role: "",
    customRole: "",
    startDate: "",
    endDate: "",
    impactDescription: "",
    organizingBody: "",
    certificateUrl: "",
    eventDescription: "",
    position: "",
    levelUniversity: false,
    levelState: false,
    levelNational: false,
    levelInternational: false,
    levelOther: false,
    levelOtherText: "",
  });

  const activityTypes = [
    "Workshop Organization",
    "Workshop Attendance",
    "Seminar/Conference Organization",
    "Seminar/Conference Participation",
    "Hackathon Organization",
    "Hackathon Participation",
    "Campus Event Organization",
    "Environmental Initiative",
    "Social Service Activity",
    "Technical Talk Delivery",
    "Tutorial Session Leading",
    "Student Exhibition Curator",
    "Any other"
  ];

  const roles = [
    "Organizer/Coordinator",
    "Participant",
    "Facilitator/Speaker",
    "Volunteer",
    "Team Lead",
    "Mentor",
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
    
    if (!formData.studentName || !formData.courseCode || !formData.activityType || !formData.activityTitle) {
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
        title: "Extra Credits Application Submitted! ⭐",
        description: "Your extra credits request has been sent for faculty review.",
      });
      
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        activityType: "",
        customActivityType: "",
        activityTitle: "",
        role: "",
        customRole: "",
        startDate: "",
        endDate: "",
        impactDescription: "",
        organizingBody: "",
        certificateUrl: "",
        eventDescription: "",
        position: "",
        levelUniversity: false,
        levelState: false,
        levelNational: false,
        levelInternational: false,
        levelOther: false,
        levelOtherText: "",
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
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-300">
              <Star className="w-4 h-4 mr-1" />
              Extra Credits
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Extra Credits Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Apply for extra course credits through workshops, events, and initiatives
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Extra Credits Activity Details
            </CardTitle>
            <CardDescription>
              Provide information about your workshop, event, or initiative participation
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
                      placeholder="e.g., ART101"
                      required
                      disabled={!!courseCode}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Activity Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="activityTitle">Activity/Event Title *</Label>
                  <Input 
                    id="activityTitle"
                    value={formData.activityTitle}
                    onChange={(e) => setFormData({...formData, activityTitle: e.target.value})}
                    placeholder="e.g., Python Workshop for Beginners"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Activity Type *</Label>
                    <Select value={formData.activityType} onValueChange={(value) => setFormData({...formData, activityType: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.activityType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify your activity type"
                          value={formData.customActivityType}
                          onChange={(e) => setFormData({...formData, customActivityType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.role === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify your role"
                          value={formData.customRole}
                          onChange={(e) => setFormData({...formData, customRole: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Co-curricular Section */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Co-curricular</h3>
                <div className="space-y-2">
                  <Label htmlFor="eventDescription">
                    Event Description
                    <span className="text-xs text-muted-foreground ml-2">
                      (Specify the co-curricular, extra-curricular, or cultural activities in which students can participate to obtain course equivalence.)
                    </span>
                  </Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Describe the co-curricular, extra-curricular, or cultural activities..."
                    value={formData.eventDescription}
                    onChange={(e) => setFormData({...formData, eventDescription: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">
                    Position
                    <span className="text-xs text-muted-foreground ml-2">
                      (Position in co-curricular/extra curricular/ cultural activities etc)
                    </span>
                  </Label>
                  <Input
                    id="position"
                    placeholder="Enter your position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label>
                    Level
                    <span className="text-xs text-muted-foreground ml-2">
                      (Level of co-curricular, extra-curricular, or cultural activities)
                    </span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="levelUniversity"
                        checked={formData.levelUniversity}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, levelUniversity: checked as boolean})
                        }
                      />
                      <Label htmlFor="levelUniversity" className="cursor-pointer font-normal">
                        University
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="levelState"
                        checked={formData.levelState}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, levelState: checked as boolean})
                        }
                      />
                      <Label htmlFor="levelState" className="cursor-pointer font-normal">
                        State
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="levelNational"
                        checked={formData.levelNational}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, levelNational: checked as boolean})
                        }
                      />
                      <Label htmlFor="levelNational" className="cursor-pointer font-normal">
                        National
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="levelInternational"
                        checked={formData.levelInternational}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, levelInternational: checked as boolean})
                        }
                      />
                      <Label htmlFor="levelInternational" className="cursor-pointer font-normal">
                        International
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="levelOther"
                        checked={formData.levelOther}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, levelOther: checked as boolean})
                        }
                      />
                      <Label htmlFor="levelOther" className="cursor-pointer font-normal">
                        Any other
                      </Label>
                    </div>
                  </div>
                  {formData.levelOther && (
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="levelOtherText">Please specify the level</Label>
                      <Input
                        id="levelOtherText"
                        value={formData.levelOtherText}
                        onChange={(e) => setFormData({...formData, levelOtherText: e.target.value})}
                        placeholder="Enter the level type"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Supporting Documents</h3>
                <div className="space-y-2">
                  <Label htmlFor="evidence">Upload Proof</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input 
                      id="evidence" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="evidence" className="cursor-pointer">
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
                            Click to upload certificate or supporting documents
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
                    Submit Extra Credits Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-indigo-50 border-indigo-200">
          <CardContent>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-indigo-900 mb-2">Extra Credits Benefits</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• 1-2 extra credits for approved activities</li>
                  <li>• Lead campus initiatives</li>
                  <li>• Organize workshops and events</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevExtraCreditsForm;

