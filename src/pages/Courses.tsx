import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, GraduationCap, Target, Clock } from "lucide-react";
import Header from "@/shared/components/Header";

const Courses = () => {
  const coreSubjects = [
    {
      code: "CAP201",
      name: "Electrical Engineering",
      credits: 4,
      benefits: ["5 marks bonus in final assessment", "Lab attendance waiver", "Priority project selection"],
      difficulty: "High"
    },
    {
      code: "ENG101", 
      name: "Engineering Mathematics",
      credits: 3,
      benefits: ["Direct credit for practical component", "Assignment exemption", "Extra tutorial access"],
      difficulty: "Medium"
    },
    {
      code: "PHY102",
      name: "Physics Laboratory", 
      credits: 2,
      benefits: ["Exemption from lab attendance requirement", "Equipment priority access", "Research opportunity"],
      difficulty: "Medium"
    },
    {
      code: "CSE201",
      name: "Data Structures",
      credits: 4,
      benefits: ["Coding assessment bonus", "Internship referral", "Advanced project access"],
      difficulty: "High"
    }
  ];

  const nonCoreSubjects = [
    {
      code: "BUS101",
      name: "Business Communication",
      credits: 2,
      benefits: ["Presentation skills certification", "Leadership workshop access", "Industry mentor connect"],
      difficulty: "Low"
    },
    {
      code: "ENV201",
      name: "Environmental Studies",
      credits: 2,
      benefits: ["Field trip participation", "Research paper opportunity", "Green project funding"],
      difficulty: "Low"
    },
    {
      code: "ART101",
      name: "Creative Arts",
      credits: 1,
      benefits: ["Exhibition participation", "Creative showcase opportunity", "Art supplies subsidy"],
      difficulty: "Low"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High": return "border-red-200 text-red-700 bg-red-50";
      case "Medium": return "border-yellow-200 text-yellow-700 bg-yellow-50";
      case "Low": return "border-green-200 text-green-700 bg-green-50";
      default: return "border-gray-200 text-gray-700 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/edu-rev" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Edu Revolution
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
              Your Enrolled Courses
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the available Edu Revolution benefits for each of your courses.
            </p>
          </div>
        </div>

        {/* Core Subjects */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold academic-heading">Core Subjects</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {coreSubjects.length} Courses
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreSubjects.map((course, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.code}: {course.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.credits} Credits
                        </span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Available Benefits:
                      </h4>
                      <div className="space-y-1">
                        {course.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      View Detailed Benefits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Non-Core Subjects */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold academic-heading">Non-Core Subjects</h2>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {nonCoreSubjects.length} Courses
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonCoreSubjects.map((course, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.code}: {course.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.credits} Credits
                        </span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Available Benefits:
                      </h4>
                      <div className="space-y-1">
                        {course.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      View Detailed Benefits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Submit Your Achievement?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Now that you've seen the available benefits, submit your achievements to unlock these course-specific advantages.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/edurev-add-achievement">
              Submit Achievement
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
