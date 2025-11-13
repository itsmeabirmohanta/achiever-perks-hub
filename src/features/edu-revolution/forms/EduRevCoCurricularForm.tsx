import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trophy, Award, FileText, CheckCircle, Users, Calendar, Target } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevCoCurricularForm = () => {
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
    activityDescription: "",
    organizingBody: "",
    role: "",
    customRole: "",
    startDate: "",
    endDate: "",
    hoursInvolved: "",
    achievements: "",
    certificateUrl: "",
    eventLocation: "",
    participantCount: "",
    mentorTeacher: "",
    skillsDeveloped: "",
    levelInstitute: false,
    levelUniversity: false,
    levelState: false,
    levelNational: false,
    levelInternational: false,
    levelOther: false,
    levelOtherText: "",
  });

  const activityTypes = [
    "Sports Activities",
    "Cultural Events",
    "Student Club Activities",
    "Student Government",
    "Debate/Quiz Competitions",
    "Drama/Theatre",
    "Music/Dance Performances",
    "Art Exhibitions",
    "Photography Competitions",
    "Literary Events",
    "Technical Competitions",
    "Science Fair",
    "Model UN",
    "Volunteer Work",
    "Leadership Programs",
    "Mentorship Activities",
    "Peer Tutoring",
    "Event Management",
    "Social Awareness Campaigns",
    "Environmental Activities",
    "Other",
  ];

  const roleTypes = [
    "Participant",
    "Organizer",
    "Coordinator",
    "Team Leader",
    "Team Member",
    "Volunteer",
    "Mentor",
    "Judge/Evaluator",
    "MC/Host",
    "Technical Support",
    "Logistics Support",
    "Marketing/Publicity",
    "Other",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Your co-curricular/extra-curricular activity application has been submitted for review.",
      });
      
      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        activityType: "",
        customActivityType: "",
        activityTitle: "",
        activityDescription: "",
        organizingBody: "",
        role: "",
        customRole: "",
        startDate: "",
        endDate: "",
        hoursInvolved: "",
        achievements: "",
        certificateUrl: "",
        eventLocation: "",
        participantCount: "",
        mentorTeacher: "",
        skillsDeveloped: "",
        levelInstitute: false,
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
        description: "There was an error submitting your application. Please try again.",
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
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-hero text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Co-Curricular/Extra-Curricular Activities
          </div>
          <h1 className="text-3xl md:text-4xl font-bold academic-heading mb-4">
            Submit Co-Curricular/Extra-Curricular Activity
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get recognition and benefits for your co-curricular and extra-curricular achievements and activities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Information
                </CardTitle>
                <CardDescription>
                  Please provide your basic information for the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                      placeholder="Enter your student ID"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code *</Label>
                  <Input
                    id="courseCode"
                    value={formData.courseCode}
                    onChange={(e) => handleInputChange("courseCode", e.target.value)}
                    placeholder="Enter course code for benefit application"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Activity Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Activity Details
                </CardTitle>
                <CardDescription>
                  Provide details about your co-curricular/extra-curricular activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Activity Type *</Label>
                    <Select 
                      value={formData.activityType} 
                      onValueChange={(value) => handleInputChange("activityType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.activityType === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="customActivityType">Custom Activity Type *</Label>
                      <Input
                        id="customActivityType"
                        value={formData.customActivityType}
                        onChange={(e) => handleInputChange("customActivityType", e.target.value)}
                        placeholder="Please specify the activity type"
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleTypes.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.role === "Other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customRole">Custom Role *</Label>
                    <Input
                      id="customRole"
                      value={formData.customRole}
                      onChange={(e) => handleInputChange("customRole", e.target.value)}
                      placeholder="Please specify your role"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="activityTitle">Activity Title/Name *</Label>
                  <Input
                    id="activityTitle"
                    value={formData.activityTitle}
                    onChange={(e) => handleInputChange("activityTitle", e.target.value)}
                    placeholder="Enter the name/title of the activity"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityDescription">Activity Description *</Label>
                  <Textarea
                    id="activityDescription"
                    value={formData.activityDescription}
                    onChange={(e) => handleInputChange("activityDescription", e.target.value)}
                    placeholder="Provide a detailed description of the activity, its objectives, and outcomes"
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizingBody">Organizing Body/Institution *</Label>
                    <Input
                      id="organizingBody"
                      value={formData.organizingBody}
                      onChange={(e) => handleInputChange("organizingBody", e.target.value)}
                      placeholder="Name of organizing institution/body"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventLocation">Event Location</Label>
                    <Input
                      id="eventLocation"
                      value={formData.eventLocation}
                      onChange={(e) => handleInputChange("eventLocation", e.target.value)}
                      placeholder="Location where the activity took place"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline and Involvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline & Involvement
                </CardTitle>
                <CardDescription>
                  Provide timeline details and your level of involvement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hoursInvolved">Hours Involved</Label>
                    <Input
                      id="hoursInvolved"
                      type="number"
                      value={formData.hoursInvolved}
                      onChange={(e) => handleInputChange("hoursInvolved", e.target.value)}
                      placeholder="Total hours of involvement"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="participantCount">Number of Participants</Label>
                    <Input
                      id="participantCount"
                      type="number"
                      value={formData.participantCount}
                      onChange={(e) => handleInputChange("participantCount", e.target.value)}
                      placeholder="Approximate number of participants"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentorTeacher">Mentor/Supervising Teacher</Label>
                    <Input
                      id="mentorTeacher"
                      value={formData.mentorTeacher}
                      onChange={(e) => handleInputChange("mentorTeacher", e.target.value)}
                      placeholder="Name of supervising faculty/teacher"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements and Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements & Impact
                </CardTitle>
                <CardDescription>
                  Describe your achievements and the impact of your involvement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="achievements">Achievements & Awards</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => handleInputChange("achievements", e.target.value)}
                    placeholder="List any awards, recognitions, or achievements from this activity"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillsDeveloped">Skills Developed</Label>
                  <Textarea
                    id="skillsDeveloped"
                    value={formData.skillsDeveloped}
                    onChange={(e) => handleInputChange("skillsDeveloped", e.target.value)}
                    placeholder="Describe the skills you developed through this activity"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Activity Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Activity Level
                </CardTitle>
                <CardDescription>
                  Select the level(s) at which the activity was conducted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelInstitute"
                      checked={formData.levelInstitute}
                      onCheckedChange={(checked) => handleInputChange("levelInstitute", checked as boolean)}
                    />
                    <Label htmlFor="levelInstitute">Institute Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelUniversity"
                      checked={formData.levelUniversity}
                      onCheckedChange={(checked) => handleInputChange("levelUniversity", checked as boolean)}
                    />
                    <Label htmlFor="levelUniversity">University Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelState"
                      checked={formData.levelState}
                      onCheckedChange={(checked) => handleInputChange("levelState", checked as boolean)}
                    />
                    <Label htmlFor="levelState">State Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelNational"
                      checked={formData.levelNational}
                      onCheckedChange={(checked) => handleInputChange("levelNational", checked as boolean)}
                    />
                    <Label htmlFor="levelNational">National Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelInternational"
                      checked={formData.levelInternational}
                      onCheckedChange={(checked) => handleInputChange("levelInternational", checked as boolean)}
                    />
                    <Label htmlFor="levelInternational">International Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="levelOther"
                      checked={formData.levelOther}
                      onCheckedChange={(checked) => handleInputChange("levelOther", checked as boolean)}
                    />
                    <Label htmlFor="levelOther">Other</Label>
                  </div>
                </div>
                {formData.levelOther && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="levelOtherText">Please specify other level</Label>
                    <Input
                      id="levelOtherText"
                      value={formData.levelOtherText}
                      onChange={(e) => handleInputChange("levelOtherText", e.target.value)}
                      placeholder="Specify the level"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Evidence Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>
                  Upload certificates, photos, or other supporting documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateUrl">Certificate/Document URL</Label>
                  <Input
                    id="certificateUrl"
                    type="url"
                    value={formData.certificateUrl}
                    onChange={(e) => handleInputChange("certificateUrl", e.target.value)}
                    placeholder="https://example.com/certificate.pdf"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Supporting File</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
                      </div>
                      <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      File selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full max-w-md bg-gradient-hero hover:shadow-xl transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>

        {/* Back to Categories */}
        <div className="text-center mt-8">
          <Link to="/edurev" className="text-primary hover:underline">
            ← Back to Edu Revolution Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EduRevCoCurricularForm;
