import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  BookOpen,
  Award,
  FileText,
  CheckCircle,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevMOOCForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    courseName: "",

    // MOOC Specific Fields
    platform: "", // Coursera, edX, Udemy, etc.
    customPlatform: "",
    courseTitle: "",
    instructorName: "",
    startDate: "",
    endDate: "",
    certificateNumber: "",
    verificationUrl: "",

    // Course Details (Combined)
    courseContent: "",

    // Additional Info
    cost: "",
    language: "English",
    customLanguage: "",
  });

  const platforms = [
    "Coursera",
    "edX",
    "Udemy",
    "Udacity",
    "Cisco Networking Academy",
    "Microsoft Learn",
    "Google Digital Garage",
    "AWS Training",
    "IBM SkillsBuild",
    "LinkedIn Learning",
    "Khan Academy",
    "Any other",
  ];

  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Any other",
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
        title: "Certificate Selected",
        description: `${file.name} added successfully.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.courseCode ||
      !formData.platform ||
      !formData.courseTitle ||
      !selectedFile
    ) {
      toast({
        title: "Incomplete Information",
        description:
          "Please fill in all required fields and upload your certificate.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "MOOC Application Submitted! 🎓",
        description:
          "Your MOOC/certification application has been sent for faculty review.",
      });

      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        courseName: "",
        platform: "",
        customPlatform: "",
        courseTitle: "",
        instructorName: "",
        startDate: "",
        endDate: "",
        certificateNumber: "",
        verificationUrl: "",
        courseContent: "",
        cost: "",
        language: "English",
        customLanguage: "",
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
          <Link
            to="/edu-rev"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            ← Back to EduRev
          </Link>
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-300">
              <BookOpen className="w-4 h-4 mr-1" />
              MOOC / Certifications
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">
              MOOC & Certification Application
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your online course completion and certification for
              academic benefits
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Certification Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your MOOC or certification
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Student Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) =>
                        setFormData({ ...formData, studentId: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, courseCode: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, courseName: e.target.value })
                      }
                      placeholder="e.g., Data Structures"
                    />
                  </div>
                </div>
              </div>

              {/* Platform & Course Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                    Platform and Course Information
                  </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform *</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) =>
                        setFormData({ ...formData, platform: value })
                      }
                      required
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                        {formData.platform === "Any other" && (
                      <div className="mt-2">
                        <Input
                          placeholder="Please specify your platform"
                          value={formData.customPlatform}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customPlatform: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseTitle">Course Title *</Label>
                    <Input
                      id="courseTitle"
                      value={formData.courseTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          courseTitle: e.target.value,
                        })
                      }
                      placeholder="e.g., Machine Learning by Andrew Ng"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructorName">
                    Instructor/Organization
                  </Label>
                  <Input
                    id="instructorName"
                    value={formData.instructorName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instructorName: e.target.value,
                      })
                    }
                    placeholder="e.g., Stanford University, Andrew Ng"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Certificate Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Certificate Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">Certificate Number</Label>
                  <Input
                    id="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certificateNumber: e.target.value,
                      })
                    }
                    placeholder="Certificate serial number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationUrl">Certificate Verification URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="verificationUrl"
                      value={formData.verificationUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          verificationUrl: e.target.value,
                        })
                      }
                      placeholder="https://coursera.org/verify/..."
                      type="url"
                    />
                    {formData.verificationUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          window.open(formData.verificationUrl, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Course Content & Learning
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="courseContent">
                    Course Content, Skills & Projects
                  </Label>
                  <Textarea
                    id="courseContent"
                    placeholder="Include: Topics covered (equivalent to the course), skills and knowledge gained, and any project work or practical components completed..."
                    value={formData.courseContent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        courseContent: e.target.value,
                      })
                    }
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Certificate Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Upload Certificate
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="certificate">Certificate File *</Label>
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
                          <p className="text-sm font-medium">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload your certificate
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
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Submit Certification Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="max-w-4xl mx-auto mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  MOOC Benefits
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • 2–10 bonus marks based on certification quality.
                  </li>
                  <li>• Direct credit for relevant course components</li>
                  <li>
                    • Internship referral opportunities for certified students
                  </li>
                  <li>• Application reviewed within 7-10 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevMOOCForm;
