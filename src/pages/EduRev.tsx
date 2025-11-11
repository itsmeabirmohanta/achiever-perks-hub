import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  BarChart3,
  Star,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Gift,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import Header from "@/components/Header";

const EduRev = () => {
  const benefits = [
    {
      icon: "🎓",
      title: "Recognition of Prior Learning (RPL)",
      description: "Get recognition for your prior learning and skills.",
      link: "/edurev/courses/rpl",
    },
    {
      icon: "📜",
      title: "MOOC / CERTIFICATIONS",
      description:
        "Leverage your online courses and certifications for academic benefits.",
      link: "/edurev/courses/mooc",
    },
    {
      icon: "📈",
      title: "Grade Upgrade (Core/Non-Core)",
      description: "Improve your grades in both core and non-core subjects.",
      link: "/edurev/courses/grade-upgradation",
    },
    {
      icon: "🛠️",
      title: "Project",
      description: "Get benefits for your projects and practical work.",
      link: "/edurev/courses/project",
    },
    {
      icon: "⭐",
      title: "Extra Credits",
      description: "Earn extra credits for your achievements.",
      link: "/edurev/courses/extra-credits",
    },
    {
      icon: "📱",
      title: "Social Media",
      description:
        "Get recognition for your social media achievements and content creation.",
      link: "/edurev/courses/social-media",
    },
    {
      icon: "💰",
      title: "Revenue Generation",
      description:
        "Showcase your revenue-generating projects and business ventures.",
      link: "/edurev/courses/revenue-generation",
    },
    {
      icon: "💼",
      title: "Internships Beyond the Curriculum",
      description:
        "Get academic benefits from your professional internship experiences.",
      link: "/edurev/courses/internships",
    },
    {
      icon: "🤝",
      title: "Community Service",
      description:
        "Earn credits and recognition for your community service contributions.",
      link: "/edurev/courses/community-service",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Select a Category",
      description: "Choose one of the benefit categories to get started.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      step: "2",
      title: "Choose Your Course",
      description: "Select the course you want to apply for benefits in.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      step: "3",
      title: "Submit Achievement",
      description:
        "Fill out the form with your achievement details and evidence.",
      icon: <Plus className="w-6 h-6" />,
    },
    {
      step: "4",
      title: "Get Benefits",
      description:
        "Approved benefits are automatically applied to your academic record.",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  const stats = [
    {
      label: "Active Courses",
      value: "150+",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Benefits Awarded",
      value: "2,500+",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "Students Benefited",
      value: "800+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Faculty Partners",
      value: "45+",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden">
      <Header />

      {/* Hero Section with Full Width */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-gradient-hero text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <BookOpen className="w-4 h-4" />
              EduRev Benefits Platform
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold academic-heading mb-6 md:mb-8 leading-tight">
              Transform Your Achievements into Success
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
              Unlock course-specific benefits, grade improvements, and academic
              advantages by showcasing your real achievements.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-hero hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 md:px-8 py-4 text-base md:text-lg shadow-hero"
                asChild
              >
                <Link to="#categories" className="flex items-center gap-3">
                  <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  Get Started
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 px-6 md:px-8 py-4 text-base md:text-lg"
                asChild
              >
                <Link to="/dashboard" className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
                  Track Progress
                </Link>
              </Button>
            </div>

            {/* Stats with Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-card/60 backdrop-blur-md border shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="bg-gradient-hero text-white p-2 md:p-3 rounded-full w-fit mx-auto mb-2 md:mb-3">
                      {stat.icon}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Showcase Section */}
      <section id="categories" className="py-16 px-4 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold academic-heading mb-6">
              Explore EduRev Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Select the course for which you want to claim benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Link to={benefit.link} key={index} className="block group">
                <Card className="bg-card/60 backdrop-blur-md border-0 shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-2 group h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Types Section - REMOVED */}

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold academic-heading mb-6">
              How EduRev Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              A simple 4-step process to transform your achievements into
              academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-gradient-hero text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-hero group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="bg-primary/10 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mt-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto px-4">
          <div className="text-center bg-gradient-hero text-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Boost Your Academic Performance?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-white/90 max-w-3xl mx-auto px-4">
              Start earning academic benefits from your achievements today.
              Connect your accomplishments to your courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 px-6 md:px-8 py-4 text-base md:text-lg font-semibold shadow-lg"
              >
                <Link to="#categories" className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                  Explore Categories
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 px-6 md:px-8 py-4 text-base md:text-lg font-semibold"
              >
                <Link to="/dashboard" className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
                  Track My Progress
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EduRev;
