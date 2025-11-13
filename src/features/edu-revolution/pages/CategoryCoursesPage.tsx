import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, GraduationCap, Target, Clock } from "lucide-react";
import Header from "@/shared/components/Header";
import { useEffect, useState } from "react";

interface Course {
  code: string;
  name: string;
  credits: number;
  benefits: string[];
  difficulty: string;
}

interface CategoryData {
  title: string;
  description: string;
  courses: Course[];
}

const categoryData: { [key: string]: CategoryData } = {
  rpl: {
    title: "Recognition of Prior Learning (RPL)",
    description: "Courses where you can get recognition for your prior learning and skills.",
    courses: [
      {
        code: "CAP201",
        name: "Electrical Engineering",
        credits: 4,
        benefits: ["Full course credit waiver", "Exemption from final exam"],
        difficulty: "High"
      },
    ]
  },
  mooc: {
    title: "MOOC / CERTIFICATIONS",
    description: "Courses that offer benefits for completing relevant MOOCs or certifications.",
    courses: [
      {
        code: "CSE201",
        name: "Data Structures",
        credits: 4,
        benefits: ["10 bonus marks", "Internship referral for certified students"],
        difficulty: "High"
      },
      {
        code: "BUS101",
        name: "Business Communication",
        credits: 2,
        benefits: ["Certificate of Excellence from department", "Priority for public speaking events"],
        difficulty: "Low"
      }
    ]
  },
  "grade-upgradation": {
    title: "Grade Upgrade (Core/Non-Core)",
    description: "Courses where you can improve your grades through additional work.",
    courses: [
      {
        code: "ENG101",
        name: "Engineering Mathematics",
        credits: 3,
        benefits: ["Option to re-submit one assignment", "Additional tutorial sessions"],
        difficulty: "Medium"
      },
      {
        code: "PHY102",
        name: "Physics Laboratory",
        credits: 2,
        benefits: ["Bonus experiment for extra marks", "Lab report improvement session"],
        difficulty: "Medium"
      }
    ]
  },
  project: {
    title: "Project",
    description: "Courses that offer benefits for exceptional project work.",
    courses: [
      {
        code: "CSE201",
        name: "Data Structures",
        credits: 4,
        benefits: ["Best project award", "Feature in department newsletter"],
        difficulty: "High"
      },
      {
        code: "MECH101",
        name: "Thermodynamics",
        credits: 4,
        benefits: ["Opportunity to present project to faculty", "Seed funding for project extension"],
        difficulty: "High"
      }
    ]
  },
  "extra-credits": {
    title: "Extra Credits",
    description: "Courses where you can earn extra credits for your achievements.",
    courses: [
      {
        code: "ENV201",
        name: "Environmental Studies",
        credits: 2,
        benefits: ["1 extra credit for approved environmental project", "Lead a campus green initiative"],
        difficulty: "Low"
      },
      {
        code: "ART101",
        name: "Creative Arts",
        credits: 1,
        benefits: ["1 extra credit for organizing a workshop", "Curate a student art exhibition"],
        difficulty: "Low"
      }
    ]
  },
  "social-media": {
    title: "Social Media",
    description: "Courses where you can get recognition for your social media achievements and content creation.",
    courses: [
      {
        code: "BUS101",
        name: "Business Communication",
        credits: 2,
        benefits: ["Bonus marks for verified social media achievements", "Opportunity to guest lecture on digital marketing"],
        difficulty: "Medium"
      },
      {
        code: "MKT201",
        name: "Digital Marketing",
        credits: 3,
        benefits: ["Direct credit for practical assignments", "Industry partnership opportunities"],
        difficulty: "High"
      }
    ]
  },
  "revenue-generation": {
    title: "Revenue Generation",
    description: "Courses where you can showcase your revenue-generating projects and business ventures.",
    courses: [
      {
        code: "BUS101",
        name: "Business Communication",
        credits: 2,
        benefits: ["Entrepreneurship recognition", "Business mentorship opportunities"],
        difficulty: "High"
      },
      {
        code: "ENT201",
        name: "Entrepreneurship",
        credits: 3,
        benefits: ["Extra credits for verified revenue projects", "Startup incubation support"],
        difficulty: "High"
      }
    ]
  },
  internships: {
    title: "Internships",
    description: "Courses where you can get academic benefits from your professional internship experiences.",
    courses: [
      {
        code: "CSE201",
        name: "Data Structures",
        credits: 4,
        benefits: ["Practical experience credit", "Industry exposure recognition"],
        difficulty: "Medium"
      },
      {
        code: "CAP201",
        name: "Electrical Engineering",
        credits: 4,
        benefits: ["Industrial training equivalency", "Project collaboration opportunities"],
        difficulty: "High"
      }
    ]
  },
  "community-service": {
    title: "Community Service",
    description: "Courses where you can earn credits and recognition for your community service contributions.",
    courses: [
      {
        code: "ENV201",
        name: "Environmental Studies",
        credits: 2,
        benefits: ["Community service credit", "Sustainability leadership recognition"],
        difficulty: "Low"
      },
      {
        code: "SOC101",
        name: "Social Sciences",
        credits: 2,
        benefits: ["Social impact credits", "Community engagement certificate"],
        difficulty: "Low"
      }
    ]
  }
};

const EduRevCategoryCourses = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect grade-upgradation directly to form
    if (categoryName === 'grade-upgradation') {
      navigate('/edurev/apply/grade-upgradation', { replace: true });
      return;
    }
    
    if (categoryName && categoryData[categoryName]) {
      setCategory(categoryData[categoryName]);
    }
  }, [categoryName, navigate]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High": return "border-red-200 text-red-700 bg-red-50";
      case "Medium": return "border-yellow-200 text-yellow-700 bg-yellow-50";
      case "Low": return "border-green-200 text-green-700 bg-green-50";
      default: return "border-gray-200 text-gray-700 bg-gray-50";
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold">Category not found</h1>
          <Link to="/edu-rev" className="mt-4 inline-block text-primary">
            Back to Edu Revolution
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/edu-rev" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Edu Revolution Categories
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
              {category.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold academic-heading">Eligible Courses</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {category.courses.length} Courses
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.courses.map((course: Course, index: number) => (
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
                        {course.benefits.map((benefit: string, benefitIndex: number) => (
                          <div key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button asChild className="w-full mt-4">
                      <Link to={
                        categoryName === 'rpl' 
                          ? `/edurev/apply/rpl/${course.code}`
                          : categoryName === 'mooc'
                          ? `/edurev/apply/mooc/${course.code}`
                          : categoryName === 'grade-upgradation'
                          ? `/edurev/apply/grade-upgradation/${course.code}`
                          : categoryName === 'project'
                          ? `/edurev/apply/project/${course.code}`
                          : categoryName === 'extra-credits'
                          ? `/edurev/apply/extra-credits/${course.code}`
                          : categoryName === 'social-media'
                          ? `/edurev/apply/social-media/${course.code}`
                          : categoryName === 'revenue-generation'
                          ? `/edurev/apply/revenue-generation/${course.code}`
                          : categoryName === 'internships'
                          ? `/edurev/apply/internships/${course.code}`
                          : categoryName === 'community-service'
                          ? `/edurev/apply/community-service/${course.code}`
                          : `/edurev/apply/${categoryName}/${course.code}`
                      }>Apply for Benefits</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-hero text-white rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-bold mb-4">
            Don’t See Your Course?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            If your course is not listed, it may not be eligible for this category. Check other categories or contact faculty for more information.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/edu-rev#categories">
              Explore Other Categories
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EduRevCategoryCourses;
