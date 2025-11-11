import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Share2, Award, FileText, CheckCircle, Users } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link } from "react-router-dom";

const EduRevSocialMediaForm = () => {
  const { courseCode } = useParams<{ courseCode?: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseCode: courseCode || "",
    courseName: "",
    
    // Platform Information
    platform: "",
    customPlatform: "",
    profileUrl: "",
    username: "",
    
    // Metrics
    followers: "",
    totalViews: "",
    totalLikes: "",
    totalShares: "",
    
    // Content Details
    contentType: "",
    customContentType: "",
    contentTheme: "",
    contentDescription: "",
    
    // Details
    details: "",
  });

  const platforms = [
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Twitter/X",
    "TikTok",
    "Facebook",
    "Pinterest",
    "Snapchat",
    "Any other"
  ];

  const contentTypes = [
    "Educational Content",
    "Entertainment",
    "Product Reviews",
    "Tutorials",
    "Brand Partnerships",
    "Social Causes",
    "Tech Reviews",
    "Lifestyle",
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
      toast({
        title: "Document Selected",
        description: `${file.name} added successfully.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.courseCode || !formData.platform || !formData.profileUrl) {
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
        title: "Social Media Achievement Submitted! 📱",
        description: "Your social media achievement has been sent for faculty review.",
      });
      
      setFormData({
        studentName: "",
        studentId: "",
        courseCode: courseCode || "",
        courseName: "",
        platform: "",
        customPlatform: "",
        profileUrl: "",
        username: "",
        followers: "",
        totalViews: "",
        totalLikes: "",
        totalShares: "",
        contentType: "",
        customContentType: "",
        contentTheme: "",
        contentDescription: "",
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
          <Link to="/edu-rev" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            ← Back to EduRev
          </Link>
          <div className="text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-300">
              <Share2 className="w-4 h-4 mr-1" />
              Social Media Achievement
            </Badge>
            <h1 className="text-4xl font-bold academic-heading mb-4">Social Media Achievement Application</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your social media achievements and content creation for academic benefits
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-6 h-6 text-primary" />
              Social Media Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your social media achievement
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
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
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input 
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      placeholder="e.g., Business Communication"
                    />
                  </div>
                </div>
              </div>

              {/* Platform Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Platform Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Social Media Platform *</Label>
                    <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                              <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                        {formData.platform === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify your platform"
                          value={formData.customPlatform}
                          onChange={(e) => setFormData({...formData, customPlatform: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username/Handle</Label>
                    <Input 
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder="e.g., @yourhandle"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileUrl">Profile URL *</Label>
                  <Input 
                    id="profileUrl"
                    value={formData.profileUrl}
                    onChange={(e) => setFormData({...formData, profileUrl: e.target.value})}
                    placeholder="https://instagram.com/yourprofile"
                    type="url"
                    required
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Performance Metrics</h3>
                <div className="space-y-2">
                  <Label htmlFor="followers">Followers/Subscribers Count</Label>
                  <Input 
                    id="followers"
                    type="number"
                    value={formData.followers}
                    onChange={(e) => setFormData({...formData, followers: e.target.value})}
                    placeholder="e.g., 10000"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalViews">Total Views</Label>
                    <Input 
                      id="totalViews"
                      type="number"
                      value={formData.totalViews}
                      onChange={(e) => setFormData({...formData, totalViews: e.target.value})}
                      placeholder="e.g., 500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalLikes">Total Likes</Label>
                    <Input 
                      id="totalLikes"
                      type="number"
                      value={formData.totalLikes}
                      onChange={(e) => setFormData({...formData, totalLikes: e.target.value})}
                      placeholder="e.g., 50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalShares">Total Shares</Label>
                    <Input 
                      id="totalShares"
                      type="number"
                      value={formData.totalShares}
                      onChange={(e) => setFormData({...formData, totalShares: e.target.value})}
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Content Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contentType">Content Type</Label>
                    <Select value={formData.contentType} onValueChange={(value) => setFormData({...formData, contentType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.contentType === "Any other" && (
                      <div className="mt-2">
                        <Input 
                          placeholder="Please specify content type"
                          value={formData.customContentType}
                          onChange={(e) => setFormData({...formData, customContentType: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contentTheme">Content Theme/Topic</Label>
                    <Input 
                      id="contentTheme"
                      value={formData.contentTheme}
                      onChange={(e) => setFormData({...formData, contentTheme: e.target.value})}
                      placeholder="e.g., Tech Reviews, Educational Tutorials"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contentDescription">Content Description</Label>
                  <Textarea
                    id="contentDescription"
                    placeholder="Describe your content strategy, themes, and key topics..."
                    value={formData.contentDescription}
                    onChange={(e) => setFormData({...formData, contentDescription: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold text-primary">Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Provide comprehensive details including notable achievements, awards, recognitions, viral content, campaigns run, brand partnerships, collaborations, monetization details, timeline information, and any other relevant information about your social media achievement..."
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Supporting Documents</h3>
                <div className="space-y-2">
                  <Label htmlFor="document">Upload Screenshots or Analytics Report</Label>
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
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <Button variant="ghost" size="sm" className="mt-2" onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}>
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload screenshots or analytics reports
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
                    Submit Social Media Achievement
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Social Media Benefits</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Bonus marks for verified social media achievements</li>
                  <li>• Opportunity to guest lecture on digital marketing</li>
                  <li>• Direct credit for practical assignments</li>
                  <li>• Industry partnership opportunities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduRevSocialMediaForm;

