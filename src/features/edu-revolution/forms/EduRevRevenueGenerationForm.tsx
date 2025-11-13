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
  DollarSign,
  Award,
  FileText,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevRevenueGenerationForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    courseName: "",

    // Project Information
    projectName: "",
    projectType: "",
    customProjectType: "",
    businessModel: "",

    // Revenue Details
    totalRevenue: "",
    revenueCurrency: "USD",
    revenuePeriod: "",
    revenueBreakdown: "",

    // Business Details
    startDate: "",
    operationalStatus: "",
    websiteUrl: "",

    // Details
    details: "",
  });

  const projectTypes = [
    "E-commerce Store",
    "SaaS Product",
    "Mobile App",
    "Service Business",
    "Digital Product",
    "Consulting Services",
    "Online Course",
    "Freelance Work",
    "Any other",
  ];

  const businessModels = [
    "B2C (Business to Consumer)",
    "B2B (Business to Business)",
    "B2B2C (Business to Business to Consumer)",
    "Marketplace",
    "Subscription",
    "One-time Purchase",
    "Commission-based",
    "Advertising Revenue",
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
        title: "Document Selected",
        description: `${file.name} added successfully.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.courseCode ||
      !formData.projectName ||
      !formData.totalRevenue
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
        title: "Revenue Generation Project Submitted! 💰",
        description:
          "Your revenue generation project has been sent for faculty review.",
      });

      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        courseName: "",
        projectName: "",
        projectType: "",
        customProjectType: "",
        businessModel: "",
        totalRevenue: "",
        revenueCurrency: "USD",
        revenuePeriod: "",
        revenueBreakdown: "",
        startDate: "",
        operationalStatus: "",
        websiteUrl: "",
        details: "",
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
            ← Back to Edu Revolution
          </Link>
          <div className="text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-300">
              <DollarSign className="w-4 h-4 mr-1" />
              Revenue Generation
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">
              Revenue Generation Project Application
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your revenue-generating projects and business ventures for
              academic benefits
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Project & Revenue Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your revenue-generating
              project
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
                      placeholder="e.g., BUS101"
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
                      placeholder="e.g., Entrepreneurship"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Project Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project/Business Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    placeholder="e.g., TechStart Solutions"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, projectType: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.projectType === "Any other" && (
                      <div className="mt-2">
                        <Input
                          placeholder="Please specify project type"
                          value={formData.customProjectType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customProjectType: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessModel">Business Model</Label>
                    <Select
                      value={formData.businessModel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, businessModel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    <Label htmlFor="operationalStatus">
                      Operational Status
                    </Label>
                    <Select
                      value={formData.operationalStatus}
                      onValueChange={(value) =>
                        setFormData({ ...formData, operationalStatus: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website/Product URL</Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                    placeholder="https://yourproject.com"
                    type="url"
                  />
                </div>
              </div>

              {/* Revenue Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">
                  Revenue Information
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalRevenue">Total Revenue *</Label>
                    <Input
                      id="totalRevenue"
                      type="number"
                      value={formData.totalRevenue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalRevenue: e.target.value,
                        })
                      }
                      placeholder="e.g., 50000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenueCurrency">Currency</Label>
                    <Select
                      value={formData.revenueCurrency}
                      onValueChange={(value) =>
                        setFormData({ ...formData, revenueCurrency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenuePeriod">Revenue Period</Label>
                    <Input
                      id="revenuePeriod"
                      value={formData.revenuePeriod}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          revenuePeriod: e.target.value,
                        })
                      }
                      placeholder="e.g., Last 6 months, Year 2024"
                    />
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="revenueBreakdown">Revenue Breakdown</Label>
                  <Textarea
                    id="revenueBreakdown"
                    placeholder="Describe revenue sources, monthly/quarterly breakdown, growth trajectory..."
                    value={formData.revenueBreakdown}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        revenueBreakdown: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div> */}
              </div>

              {/* Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Provide comprehensive details about your project including business model, impact, technologies used, team information, growth metrics, and any other relevant information..."
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: e.target.value,
                      })
                    }
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Supporting Documents
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="document">
                    Upload Financial Statements or Proof of Revenue
                  </Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Input
                      id="document"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="document" className="cursor-pointer">
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
                            Click to upload financial statements, revenue
                            reports, or proof documents
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
                    Submit Revenue Generation Project
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  Revenue Generation Benefits
                </h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Entrepreneurship recognition and credits</li>
                  <li>• Business mentorship opportunities</li>
                  <li>• Extra credits for verified revenue projects</li>
                  <li>• Startup incubation support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevRevenueGenerationForm;
