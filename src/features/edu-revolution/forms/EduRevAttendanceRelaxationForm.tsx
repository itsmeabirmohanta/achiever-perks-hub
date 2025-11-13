import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Calendar, Clock, FileText, CheckCircle, Users, AlertTriangle, GraduationCap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevAttendanceRelaxationForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    currentAttendance: "",
    semester: "",
    reasonCategory: "",
    customReasonCategory: "",
    detailedReason: "",
    startDate: "",
    endDate: "",
    daysRequested: "",
    supportingActivity: "",
    activityDetails: "",
    mentorName: "",
    mentorContact: "",
    medicalReason: false,
    academicActivity: false,
    representationalDuty: false,
    familyEmergency: false,
    otherReason: false,
    otherReasonText: "",
    acknowledgement: false,
    parentConsent: false,
  });

  const reasonCategories = [
    "Medical Emergency/Treatment",
    "Academic Competition/Conference",
    "Sports/Cultural Representation",
    "Family Emergency",
    "Research Work/Project",
    "Internship/Training",
    "Community Service",
    "Official University Work",
    "Inter-college Activities",
    "Skill Development Programs",
    "Other",
  ];

  const semesterOptions = [
    "1st Semester",
    "2nd Semester", 
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
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
    
    if (!formData.acknowledgement) {
      toast({
        title: "Acknowledgement Required",
        description: "Please acknowledge that you understand the attendance policy.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Your attendance relaxation request has been submitted for review.",
      });
      
      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        currentAttendance: "",
        semester: "",
        reasonCategory: "",
        customReasonCategory: "",
        detailedReason: "",
        startDate: "",
        endDate: "",
        daysRequested: "",
        supportingActivity: "",
        activityDetails: "",
        mentorName: "",
        mentorContact: "",
        medicalReason: false,
        academicActivity: false,
        representationalDuty: false,
        familyEmergency: false,
        otherReason: false,
        otherReasonText: "",
        acknowledgement: false,
        parentConsent: false,
      });
      setSelectedFile(null);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
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
            <Calendar className="w-4 h-4" />
            10% Attendance Relaxation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold academic-heading mb-4">
            Apply for Attendance Relaxation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Request up to 10% attendance relaxation based on valid academic or personal reasons.
          </p>
          
          {/* Important Notice */}
          <div className="max-w-3xl mx-auto mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Guidelines</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Maximum 10% relaxation allowed per semester</li>
                  <li>• Valid supporting documents required</li>
                  <li>• Application must be submitted within prescribed timeline</li>
                  <li>• Approval subject to academic committee review</li>
                </ul>
              </div>
            </div>
          </div>
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
                  Please provide your academic details for the attendance relaxation request.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) => handleInputChange("courseCode", e.target.value)}
                      placeholder="Enter course code"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester *</Label>
                    <Select 
                      value={formData.semester} 
                      onValueChange={(value) => handleInputChange("semester", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesterOptions.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAttendance">Current Attendance (%) *</Label>
                    <Input
                      id="currentAttendance"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.currentAttendance}
                      onChange={(e) => handleInputChange("currentAttendance", e.target.value)}
                      placeholder="Enter current attendance percentage"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reason for Relaxation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Reason for Attendance Relaxation
                </CardTitle>
                <CardDescription>
                  Provide detailed information about why you need attendance relaxation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reasonCategory">Reason Category *</Label>
                  <Select 
                    value={formData.reasonCategory} 
                    onValueChange={(value) => handleInputChange("reasonCategory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason category" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasonCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.reasonCategory === "Other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customReasonCategory">Custom Reason Category *</Label>
                    <Input
                      id="customReasonCategory"
                      value={formData.customReasonCategory}
                      onChange={(e) => handleInputChange("customReasonCategory", e.target.value)}
                      placeholder="Please specify the reason category"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="detailedReason">Detailed Reason/Justification *</Label>
                  <Textarea
                    id="detailedReason"
                    value={formData.detailedReason}
                    onChange={(e) => handleInputChange("detailedReason", e.target.value)}
                    placeholder="Provide a detailed explanation for your attendance relaxation request"
                    required
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Timeline and Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline & Duration
                </CardTitle>
                <CardDescription>
                  Specify the period for which you need attendance relaxation.
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
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daysRequested">Total Days Requested *</Label>
                    <Input
                      id="daysRequested"
                      type="number"
                      min="1"
                      value={formData.daysRequested}
                      onChange={(e) => handleInputChange("daysRequested", e.target.value)}
                      placeholder="Number of days"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supporting Activity/Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Supporting Activity/Details
                </CardTitle>
                <CardDescription>
                  Provide details about activities or circumstances supporting your request.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supportingActivity">Supporting Activity/Event</Label>
                  <Input
                    id="supportingActivity"
                    value={formData.supportingActivity}
                    onChange={(e) => handleInputChange("supportingActivity", e.target.value)}
                    placeholder="Name of competition, conference, medical treatment, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityDetails">Activity Details</Label>
                  <Textarea
                    id="activityDetails"
                    value={formData.activityDetails}
                    onChange={(e) => handleInputChange("activityDetails", e.target.value)}
                    placeholder="Provide detailed information about the supporting activity or circumstances"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentorName">Mentor/Supervisor Name</Label>
                    <Input
                      id="mentorName"
                      value={formData.mentorName}
                      onChange={(e) => handleInputChange("mentorName", e.target.value)}
                      placeholder="Faculty mentor or supervisor (if applicable)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentorContact">Mentor Contact</Label>
                    <Input
                      id="mentorContact"
                      value={formData.mentorContact}
                      onChange={(e) => handleInputChange("mentorContact", e.target.value)}
                      placeholder="Email or phone number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reason Type Classification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Reason Classification
                </CardTitle>
                <CardDescription>
                  Select all applicable reason types for your request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medicalReason"
                      checked={formData.medicalReason}
                      onCheckedChange={(checked) => handleInputChange("medicalReason", checked as boolean)}
                    />
                    <Label htmlFor="medicalReason">Medical/Health Related</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="academicActivity"
                      checked={formData.academicActivity}
                      onCheckedChange={(checked) => handleInputChange("academicActivity", checked as boolean)}
                    />
                    <Label htmlFor="academicActivity">Academic Activity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="representationalDuty"
                      checked={formData.representationalDuty}
                      onCheckedChange={(checked) => handleInputChange("representationalDuty", checked as boolean)}
                    />
                    <Label htmlFor="representationalDuty">Representational Duty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="familyEmergency"
                      checked={formData.familyEmergency}
                      onCheckedChange={(checked) => handleInputChange("familyEmergency", checked as boolean)}
                    />
                    <Label htmlFor="familyEmergency">Family Emergency</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherReason"
                      checked={formData.otherReason}
                      onCheckedChange={(checked) => handleInputChange("otherReason", checked as boolean)}
                    />
                    <Label htmlFor="otherReason">Other</Label>
                  </div>
                </div>
                {formData.otherReason && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="otherReasonText">Please specify other reason</Label>
                    <Input
                      id="otherReasonText"
                      value={formData.otherReasonText}
                      onChange={(e) => handleInputChange("otherReasonText", e.target.value)}
                      placeholder="Specify the other reason"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>
                  Upload medical certificates, event invitations, or other supporting documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Supporting Documents *</Label>
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
                        required
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

            {/* Acknowledgements */}
            <Card>
              <CardHeader>
                <CardTitle>Acknowledgements</CardTitle>
                <CardDescription>
                  Please read and confirm the following statements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acknowledgement"
                    checked={formData.acknowledgement}
                    onCheckedChange={(checked) => handleInputChange("acknowledgement", checked as boolean)}
                    required
                  />
                  <Label htmlFor="acknowledgement" className="text-sm leading-relaxed">
                    I understand that this attendance relaxation is subject to approval by the academic committee. 
                    I confirm that all information provided is accurate and I will provide additional documentation if required. 
                    I understand that misrepresentation may result in denial of the request.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="parentConsent"
                    checked={formData.parentConsent}
                    onCheckedChange={(checked) => handleInputChange("parentConsent", checked as boolean)}
                  />
                  <Label htmlFor="parentConsent" className="text-sm">
                    I have informed my parents/guardians about this attendance relaxation request.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full max-w-md bg-gradient-hero hover:shadow-xl transition-all duration-300"
                disabled={isSubmitting || !formData.acknowledgement}
              >
                {isSubmitting ? "Submitting Request..." : "Submit Attendance Relaxation Request"}
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

export default EduRevAttendanceRelaxationForm;
