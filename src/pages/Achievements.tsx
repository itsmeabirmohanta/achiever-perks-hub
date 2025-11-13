import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Star, Upload, TrendingUp } from "lucide-react";
import Header from "@/shared/components/Header";
import { useToast } from "@/hooks/use-toast";

const Achievements = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();

  const categories = [
    "Sports",
    "Esports", 
    "Technical",
    "Cultural",
    "Exams",
    "Projects",
    "NPTEL / MOOCs / Certification",
    "Social Media Presence",
    "Revenue Generation"
  ];

  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", department: "Computer Science", points: 2450, achievements: 15 },
    { rank: 2, name: "Rahul Kumar", department: "Electrical Engineering", points: 2280, achievements: 12 },
    { rank: 3, name: "Ananya Patel", department: "Mechanical Engineering", points: 2150, achievements: 14 },
    { rank: 4, name: "Vikram Singh", department: "Civil Engineering", points: 1980, achievements: 11 },
    { rank: 5, name: "Shreya Gupta", department: "Electronics & Communication", points: 1875, achievements: 13 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Achievement Submitted! 🏆",
      description: "Your achievement has been submitted for verification. Points will be added upon approval.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
            Overall Achievements
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase all your achievements, earn recognition points, and climb the global leaderboard. 
            Your excellence deserves to be celebrated!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              onClick={() => setShowLeaderboard(false)}
              variant={!showLeaderboard ? "default" : "outline"}
              className={!showLeaderboard ? "bg-gradient-hero text-white shadow-hero" : ""}
            >
              <Upload className="mr-2 h-4 w-4" />
              Submit Achievement
            </Button>
            <Button 
              onClick={() => setShowLeaderboard(true)}
              variant={showLeaderboard ? "default" : "outline"}
              className={showLeaderboard ? "bg-gradient-accent text-white shadow-accent" : ""}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Leaderboard
            </Button>
          </div>
        </div>

        {!showLeaderboard ? (
          /* Achievement Submission Form */
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span>Submit Achievement</span>
              </CardTitle>
              <CardDescription>
                Share your achievement and earn recognition points for the leaderboard.
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
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="e.g., Computer Science Engineering" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Achievement Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select achievement category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Achievement Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Gold Medal in State Basketball Championship"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization/Platform</Label>
                  <Input 
                    id="organization" 
                    placeholder="e.g., State Basketball Association, Coursera, GitHub"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Achievement Details</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide comprehensive details about your achievement, its impact, and significance..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="level">Achievement Level</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="international">International</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                        <SelectItem value="institutional">Institutional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Achievement Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate">Upload Certificate/Evidence</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Upload your certificate or supporting evidence
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Multiple files supported: PDF, JPG, PNG (Max 10MB each)
                    </p>
                    <Input id="certificate" type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-2">Points System</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>• International: 500 points</div>
                    <div>• National: 300 points</div>
                    <div>• State: 200 points</div>
                    <div>• Regional: 100 points</div>
                    <div>• Institutional: 50 points</div>
                    <div>• Certifications: 25-100 points</div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero text-white shadow-hero hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Submit for Verification & Points
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Leaderboard Display */
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-accent">
                  <Trophy className="h-6 w-6" />
                  <span>Global Leaderboard</span>
                </CardTitle>
                <CardDescription>
                  Top performing students across all achievement categories
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {leaderboardData.map((student, index) => (
                  <div 
                    key={student.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-102 ${
                      student.rank <= 3 
                        ? 'bg-gradient-card border-accent/20 shadow-accent' 
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-subtle">
                        {getRankIcon(student.rank)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-muted-foreground">
                            #{student.rank}
                          </span>
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{student.department}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-xl font-bold text-primary">
                          {student.points.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {student.achievements} achievements
                      </p>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-6">
                  <Badge variant="outline" className="text-muted-foreground">
                    Updated in real-time • Last updated 2 mins ago
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
