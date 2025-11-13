import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ClipboardList, Clock, FileText, CheckCircle, Users, AlertCircle, Building } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevDutyLeavesForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    semester: "",
    leaveType: "",
    customLeaveType: "",
    dutyDescription: "",
    organizingBody: "",
    appointingAuthority: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    dailySchedule: "",
    reportingTime: "",
    dutyLocation: "",
    contactPerson: "",
    contactNumber: "",
    transportationMode: "",
    accommodationDetails: "",
    emergencyContact: "",
    supervisorName: "",
    supervisorContact: "",
    academicImpact: "",
    makeupPlan: "",
    isOfficialDuty: false,
    isMandatory: false,
    isRepresentational: false,
    requiresTravel: false,
    acknowledgement: false,
    facultyApproval: false,
  });

  const leaveTypes = [
    "Student Council Duty",
    "University Representation",
    "Academic Committee Work",
    "Event Organization Duty",
    "Sports Team Duty",
    "Cultural Team Duty",
    "Research Assignment",
    "Conference Presentation",
    "Competition Participation",
    "Internship Duty",
    "Training Program",
    "Survey/Field Work",
    "Community Service Duty",
    "Government Assignment",
    "Electoral Duty",
    "Other Official Duty",
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
    
    // Auto-calculate total days when dates change
    if (field === "startDate" || field === "endDate") {
      const start = field === "startDate" ? new Date(value as string) : new Date(formData.startDate);
      const end = field === "endDate" ? new Date(value as string) : new Date(formData.endDate);
      
      if (start && end && end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setFormData(prev => ({ ...prev, totalDays: diffDays.toString() }));
      }
    }
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
        description: "Please acknowledge the terms and conditions.",
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
        description: "Your duty leave request has been submitted for approval.",
      });
      
      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        semester: "",
        leaveType: "",
        customLeaveType: "",
        dutyDescription: "",
        organizingBody: "",
        appointingAuthority: "",
        startDate: "",
        endDate: "",
        totalDays: "",
        dailySchedule: "",
        reportingTime: "",
        dutyLocation: "",
        contactPerson: "",
        contactNumber: "",
        transportationMode: "",
        accommodationDetails: "",
        emergencyContact: "",
        supervisorName: "",
        supervisorContact: "",
        academicImpact: "",
        makeupPlan: "",
        isOfficialDuty: false,
        isMandatory: false,
        isRepresentational: false,
        requiresTravel: false,
        acknowledgement: false,
        facultyApproval: false,
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
            <ClipboardList className="w-4 h-4" />
            Duty Leaves Application
          </div>
          <h1 className="text-3xl md:text-4xl font-bold academic-heading mb-4">
            Apply for Duty Leaves
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Request duty leaves for official responsibilities, representations, and mandatory assignments.
          </p>
          
          {/* Important Notice */}
          <div className="max-w-3xl mx-auto mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-800 mb-2">Application Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Submit application at least 7 days before duty commencement</li>
                  <li>• Valid appointment/duty letter required</li>
                  <li>• Faculty approval necessary for academic duty leaves</li>
                  <li>• Make-up arrangements to be planned in advance</li>
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
                  Please provide your academic details for the duty leave application.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code</Label>
                    <Input
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) => handleInputChange("courseCode", e.target.value)}
                      placeholder="Enter course code (if specific to a course)"
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
                </div>
              </CardContent>
            </Card>

            {/* Duty Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Duty Details
                </CardTitle>
                <CardDescription>
                  Provide comprehensive details about the duty assignment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaveType">Type of Duty *</Label>
                    <Select 
                      value={formData.leaveType} 
                      onValueChange={(value) => handleInputChange("leaveType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duty type" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.leaveType === "Other Official Duty" && (
                    <div className="space-y-2">
                      <Label htmlFor="customLeaveType">Specify Duty Type *</Label>
                      <Input
                        id="customLeaveType"
                        value={formData.customLeaveType}
                        onChange={(e) => handleInputChange("customLeaveType", e.target.value)}
                        placeholder="Please specify the duty type"
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dutyDescription">Duty Description *</Label>
                  <Textarea
                    id="dutyDescription"
                    value={formData.dutyDescription}
                    onChange={(e) => handleInputChange("dutyDescription", e.target.value)}
                    placeholder="Provide detailed description of the duty, responsibilities, and expected outcomes"
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
                      placeholder="Name of organizing institution"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointingAuthority">Appointing Authority *</Label>
                    <Input
                      id="appointingAuthority"
                      value={formData.appointingAuthority}
                      onChange={(e) => handleInputChange("appointingAuthority", e.target.value)}
                      placeholder="Person/Authority assigning the duty"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline and Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline & Schedule
                </CardTitle>
                <CardDescription>
                  Specify the duration and schedule of your duty assignment.
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
                    <Label htmlFor="totalDays">Total Days</Label>
                    <Input
                      id="totalDays"
                      type="number"
                      value={formData.totalDays}
                      onChange={(e) => handleInputChange("totalDays", e.target.value)}
                      placeholder="Auto-calculated"
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailySchedule">Daily Schedule</Label>
                    <Textarea
                      id="dailySchedule"
                      value={formData.dailySchedule}
                      onChange={(e) => handleInputChange("dailySchedule", e.target.value)}
                      placeholder="Describe the daily schedule and time commitments"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportingTime">Reporting Time</Label>
                    <Input
                      id="reportingTime"
                      type="time"
                      value={formData.reportingTime}
                      onChange={(e) => handleInputChange("reportingTime", e.target.value)}
                      placeholder="Daily reporting time"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location and Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Location & Contact Details
                </CardTitle>
                <CardDescription>
                  Provide location and contact information for the duty assignment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dutyLocation">Duty Location *</Label>
                  <Input
                    id="dutyLocation"
                    value={formData.dutyLocation}
                    onChange={(e) => handleInputChange("dutyLocation", e.target.value)}
                    placeholder="Complete address of duty location"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      placeholder="Name of primary contact person"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                      placeholder="Phone number of contact person"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transportationMode">Transportation Mode</Label>
                    <Input
                      id="transportationMode"
                      value={formData.transportationMode}
                      onChange={(e) => handleInputChange("transportationMode", e.target.value)}
                      placeholder="How will you reach the duty location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodationDetails">Accommodation Details</Label>
                  <Textarea
                    id="accommodationDetails"
                    value={formData.accommodationDetails}
                    onChange={(e) => handleInputChange("accommodationDetails", e.target.value)}
                    placeholder="If applicable, provide accommodation details"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academic Impact and Supervision */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Academic Impact & Supervision
                </CardTitle>
                <CardDescription>
                  Address the academic impact and supervision arrangements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supervisorName">Faculty Supervisor</Label>
                    <Input
                      id="supervisorName"
                      value={formData.supervisorName}
                      onChange={(e) => handleInputChange("supervisorName", e.target.value)}
                      placeholder="Name of supervising faculty member"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisorContact">Supervisor Contact</Label>
                    <Input
                      id="supervisorContact"
                      value={formData.supervisorContact}
                      onChange={(e) => handleInputChange("supervisorContact", e.target.value)}
                      placeholder="Email/phone of supervisor"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicImpact">Academic Impact Assessment</Label>
                  <Textarea
                    id="academicImpact"
                    value={formData.academicImpact}
                    onChange={(e) => handleInputChange("academicImpact", e.target.value)}
                    placeholder="Assess how this duty might impact your academic schedule and performance"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="makeupPlan">Make-up Plan</Label>
                  <Textarea
                    id="makeupPlan"
                    value={formData.makeupPlan}
                    onChange={(e) => handleInputChange("makeupPlan", e.target.value)}
                    placeholder="Describe your plan to make up for missed classes, assignments, and academic activities"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Duty Classification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Duty Classification
                </CardTitle>
                <CardDescription>
                  Select all applicable classifications for your duty assignment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isOfficialDuty"
                      checked={formData.isOfficialDuty}
                      onCheckedChange={(checked) => handleInputChange("isOfficialDuty", checked as boolean)}
                    />
                    <Label htmlFor="isOfficialDuty">Official University Duty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isMandatory"
                      checked={formData.isMandatory}
                      onCheckedChange={(checked) => handleInputChange("isMandatory", checked as boolean)}
                    />
                    <Label htmlFor="isMandatory">Mandatory Assignment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRepresentational"
                      checked={formData.isRepresentational}
                      onCheckedChange={(checked) => handleInputChange("isRepresentational", checked as boolean)}
                    />
                    <Label htmlFor="isRepresentational">Representational Duty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requiresTravel"
                      checked={formData.requiresTravel}
                      onCheckedChange={(checked) => handleInputChange("requiresTravel", checked as boolean)}
                    />
                    <Label htmlFor="requiresTravel">Requires Travel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="facultyApproval"
                      checked={formData.facultyApproval}
                      onCheckedChange={(checked) => handleInputChange("facultyApproval", checked as boolean)}
                    />
                    <Label htmlFor="facultyApproval">Faculty Approval Obtained</Label>
                  </div>
                </div>
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
                  Upload duty appointment letter, official invitation, or other supporting documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Appointment/Duty Letter *</Label>
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
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  Please read and acknowledge the terms and conditions.
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
                    I acknowledge that this duty leave application is subject to approval by the competent authority. 
                    I confirm that all information provided is accurate and complete. I understand that I am responsible 
                    for making up any missed academic work and maintaining my academic performance. I will adhere to 
                    all university policies and guidelines during my duty period.
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
                {isSubmitting ? "Submitting Application..." : "Submit Duty Leave Application"}
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

export default EduRevDutyLeavesForm;
