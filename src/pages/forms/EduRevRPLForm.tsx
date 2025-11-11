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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Upload,
  BookOpen,
  Award,
  FileText,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevRPLForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    priorLearningType: "",
    customPriorLearningType: "",
    webUrl: "",
    learningDuration: "",
    learningPlatform: "",
    completionDate: "",
    assessmentType: "",
    competencyLevel: "",
    equivalentTopics: "",
    learningRecord: "",
  });

  const rplTypes = [
    {
      value: "mooc",
      label: "MOOC Completion",
      weburl: "https://www.coursera.org/",
    },
    {
      value: "work",
      label: "Work Experience",
      weburl: "https://www.linkedin.com/",
    },
    { value: "self-study", label: "Self-Study", weburl: "https://github.com/" },
    {
      value: "certification",
      label: "Professional Certification",
      weburl: "https://www.credly.com/",
    },
    { value: "other", label: "Any other", weburl: "" },
  ];

  const assessmentTypes = [
    { value: "exam", label: "Written Examination" },
    { value: "project", label: "Project Submission" },
    { value: "demo", label: "Practical Demonstration" },
    { value: "portfolio", label: "Portfolio Review" },
  ];

  const competencyLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
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

    if (
      !formData.studentName ||
      !formData.courseCode ||
      !formData.priorLearningType ||
      !selectedFile
    ) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "RPL Application Submitted! 🎓",
        description:
          "Your Recognition of Prior Learning application has been sent for faculty review.",
      });

      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        priorLearningType: "",
        customPriorLearningType: "",
        webUrl: "",
        learningDuration: "",
        learningPlatform: "",
        completionDate: "",
        assessmentType: "",
        competencyLevel: "",
        equivalentTopics: "",
        learningRecord: "",
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
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-300">
              <BookOpen className="w-4 h-4 mr-1" />
              Recognition of Prior Learning (RPL)
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">
              RPL Application Form
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get course credit for your prior learning and professional
              experience
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              RPL Application Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your prior learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) =>
                        setFormData({ ...formData, courseCode: e.target.value })
                      }
                      placeholder="e.g., CAP201"
                      required
                      disabled={!!courseCode}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b pb-6">
                <Label className="text-lg font-semibold text-primary">
                  Source of Prior Learning *
                </Label>
                <RadioGroup
                  value={formData.priorLearningType}
                  onValueChange={(value) => {
                    const selectedType = rplTypes.find(
                      (type) => type.value === value
                    );
                    setFormData({
                      ...formData,
                      priorLearningType: value,
                      webUrl: selectedType?.weburl || "",
                    });
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rplTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={type.value}
                            className="font-medium cursor-pointer"
                          >
                            {type.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {formData.priorLearningType === "other" && (
                  <div className="mt-4">
                    <Input
                      placeholder="Please specify your source of prior learning"
                      value={formData.customPriorLearningType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customPriorLearningType: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {formData.priorLearningType && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="webUrl">Web URL</Label>
                    <Input
                      id="webUrl"
                      type="url"
                      placeholder="Enter the URL of your learning source"
                      value={formData.webUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          webUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Learning Evidence
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="equivalentTopics">
                    Topics Covered (Equivalent to Course)
                  </Label>
                  <Textarea
                    id="equivalentTopics"
                    placeholder="List the topics or modules you have covered..."
                    value={formData.equivalentTopics}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        equivalentTopics: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Supporting Documents
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="certificate">Upload Proof *</Label>
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
                            Click to upload certificates, transcripts,
                            completion letters (Max 10MB)
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
                    Submit RPL Application
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
                <h4 className="font-semibold text-blue-900 mb-2">
                  RPL Process
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Your application will be reviewed by faculty within 7-14
                    days
                  </li>
                  <li>
                    • If approved, you may be required to take an assessment
                  </li>
                  <li>• Successful completion grants full course credit</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevRPLForm;
