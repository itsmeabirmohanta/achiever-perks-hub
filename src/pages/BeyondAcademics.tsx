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
  Trophy,
  Plus,
  BarChart3,
  Eye,
  Star,
  Award,
  Target,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap,
  Gift,
} from "lucide-react";
import Header from "@/components/Header";

const BeyondAcademics = () => {
  const benefits = [
    {
      icon: "💰",
      title: "Scholarships",
      description: "Financial support from ₹1,000 to ₹50,000",
      color: "text-green-600",
    },
    {
      icon: "📊",
      title: "Academic Credits",
      description: "2-10 credits based on achievement level",
      color: "text-blue-600",
    },
    {
      icon: "📅",
      title: "Duty Leaves",
      description: "1-7 days excused absences",
      color: "text-purple-600",
    },
    {
      icon: "🌟",
      title: "Recognition",
      description: "Featured on university platforms",
      color: "text-yellow-600",
    },
    {
      icon: "🏆",
      title: "Certificates",
      description: "Official certificates of excellence",
      color: "text-orange-600",
    },
    {
      icon: "⚡",
      title: "Priority Access",
      description: "Early access to programs and events",
      color: "text-indigo-600",
    },
  ];

  const achievementTypes = [
    {
      icon: "💻",
      title: "Technical",
      description: "Coding competitions, hackathons, research papers",
      examples: ["Hackathons", "Coding Contests", "Research Publications"],
    },
    {
      icon: "⚽",
      title: "Sports",
      description: "Sports competitions, tournaments, physical achievements",
      examples: ["Tournaments", "Championships", "Athletic Competitions"],
    },
    {
      icon: "🎭",
      title: "Cultural",
      description: "Arts, music, dance, theatrical performances",
      examples: ["Music Competitions", "Dance Performances", "Art Exhibitions"],
    },
    {
      icon: "👥",
      title: "Leadership",
      description: "Leadership roles, community service, organizing events",
      examples: [
        "Student Leadership",
        "Community Service",
        "Event Organization",
      ],
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Submit Achievement",
      description:
        "Share your accomplishments with detailed evidence and documentation",
      icon: <Plus className="w-6 h-6" />,
    },
    {
      step: "2",
      title: "Faculty Review",
      description:
        "Our faculty panel verifies your achievements for authenticity",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      step: "3",
      title: "Points Calculation",
      description:
        "System calculates benefits based on achievement level and impact",
      icon: <Target className="w-6 h-6" />,
    },
    {
      step: "4",
      title: "Claim Benefits",
      description: "Access your earned benefits through the student dashboard",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  const stats = [
    {
      label: "Total Achievements",
      value: "2,456",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      label: "Active Students",
      value: "850",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Benefits Awarded",
      value: "₹12.5L",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "This Month",
      value: "156",
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Star className="w-4 h-4" />
            Beyond Academics Program
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold academic-heading mb-6 px-4">
            Showcase Your <span>Excellence</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            Transform your extracurricular achievements into academic rewards.
            Get recognized for your technical prowess, sports excellence,
            cultural talents, and leadership skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-hero hover:scale-105 transition-all duration-300 shadow-hero"
              asChild
            >
              <Link to="/beyond-academics-add-achievement">
                <Plus className="w-5 h-5 mr-2" />
                Add Achievement
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto hover:scale-105 transition-all duration-300 border-2"
              asChild
            >
              <Link to="/beyond-academics-leaderboard">
                <BarChart3 className="w-5 h-5 mr-2" />
                Leaderboard
              </Link>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/dashboard">
                <Eye className="w-5 h-5 mr-2" />
                View Past Achievements
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border shadow-card hover:shadow-hero transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  {stat.icon}
                  <span className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold academic-heading mb-4 px-4">
              Unlock Amazing Benefits
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Your achievements don't just showcase your talents—they earn you
              tangible rewards that enhance your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm hover:shadow-hero hover:-translate-y-1 transition-all duration-300 group border shadow-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Types */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold academic-heading mb-4 px-4">
              Achievement Categories
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We recognize excellence across diverse fields. Whatever your
              passion, we celebrate your achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementTypes.map((type, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{type.icon}</div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {type.title}
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, exampleIndex) => (
                      <Badge
                        key={exampleIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold academic-heading mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From submission to rewards—our streamlined process ensures your
              achievements are properly recognized and rewarded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-hero p-8 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Recognized?</h2>
          <p className="text-xl mb-6 opacity-90">
            Start showcasing your achievements today and unlock amazing
            benefits!
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/beyond-academics-add-achievement">
              <Zap className="w-5 h-5 mr-2" />
              Submit Your First Achievement
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeyondAcademics;
