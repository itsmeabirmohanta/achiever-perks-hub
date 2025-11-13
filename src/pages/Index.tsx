import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Award, Users, ArrowRight, Target, 
  TrendingUp, Lightbulb, GraduationCap, Star,
  CheckCircle, Trophy, FileText, MessageCircle
} from "lucide-react";
import Header from "@/shared/components/Header";

const Index = () => {
  const pathways = [
    {
      title: "Edu Revolution",
      subtitle: "Academic Excellence Pathway",
      description: "Submit structured achievements tied to academic, research, and career pathways. Get verified and unlock course-specific benefits automatically.",
      icon: BookOpen,
      href: "/edu-rev",
      color: "primary",
      features: [
        "Course-specific benefits",
        "Academic perks & scholarships",
        "Automatic policy mapping",
        "Faculty verification system"
      ],
      gradient: "bg-gradient-hero bg-orange-500"
    },
    {
      title: "Beyond Academics",
      subtitle: "Holistic Achievement Pathway",
      description: "Showcase achievements beyond the classroom - sports, cultural activities, competitions, and extracurricular excellence with direct academic benefits.",
      icon: Trophy,
      href: "/beyond-academics",
      color: "secondary",
      features: [
        "Sports & cultural achievements",
        "Competition recognition",
        "Scholarship opportunities",
        "Holistic development rewards"
      ],
      gradient: "bg-gradient-secondary bg-green-500"
    },
    {
      title: "Projects & Mentors",
      subtitle: "Innovation & Collaboration",
      description: "Engage in cutting-edge research projects and connect with expert faculty mentors. Build skills while contributing to impactful innovations.",
      icon: Users,
      href: "/projects",
      color: "success",
      features: [
        "Research project opportunities",
        "Expert faculty mentorship",
        "Skill development programs",
        "Industry collaboration"
      ],
      gradient: "bg-gradient-subtle bg-blue-500"
    }
  ];

  const quickLinks = [
    { name: "Policies & Guidelines", icon: FileText, href: "#" },
    { name: "Submit Achievement", icon: Target, href: "/edu-rev" },
    { name: "Beyond Academics", icon: Trophy, href: "/beyond-academics" },
    { name: "Contact Support", icon: MessageCircle, href: "#" }
  ];

  const stats = [
    { label: "Active Students", value: "2,847", icon: Users },
    { label: "Achievements Verified", value: "12,453", icon: CheckCircle },
    { label: "Benefits Unlocked", value: "8,921", icon: Star },
    { label: "Success Rate", value: "94.7%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] transform -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/wdzPDWAehn0?autoplay=1&mute=1&loop=1&playlist=wdzPDWAehn0&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&playsinline=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
              🎓 Excellence Recognition Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              EDU REVOLUTION
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              Revolutionizing the way student achievements are recognized and rewarded.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button variant="hero" size="lg" asChild className="shadow-2xl">
                <Link to="/edu-rev">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Pathways
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300 bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-white hover:text-primary">
                <Lightbulb className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Pathways */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold academic-heading mb-4 px-4">
              Choose Your Path to Excellence
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We offer three specialized pathways designed to capture, verify, and reward your achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <Card 
                  key={index} 
                  className="relative shadow-card hover:shadow-hero transition-all duration-500 hover:scale-105 group overflow-hidden border"
                >
                  <div className={`absolute inset-0 ${pathway.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10 p-6">
                    <div className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl ${pathway.gradient} shadow-hero mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-sm" />
                    </div>
                    
                    <CardTitle className="text-xl md:text-2xl mb-2">{pathway.title}</CardTitle>
                    <CardDescription className="text-base md:text-lg font-medium text-primary">
                      {pathway.subtitle}
                    </CardDescription>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {pathway.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4 p-6 pt-0">
                    <div className="space-y-2">
                      {pathway.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full mt-6 group-hover:scale-105 transition-all duration-300 shadow-lg"
                      variant={index === 0 ? "hero" : index === 1 ? "academic" : "default"}
                    >
                      <Link to={pathway.href}>
                        Explore {pathway.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold academic-heading mb-4">
              Quick Access
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Frequently used features and important resources
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-hero transition-all duration-300 hover:scale-105 cursor-pointer shadow-card border"
                >
                  <CardContent className="flex items-center space-x-3 p-4 md:p-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm md:text-base">{link.name}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-4xl mx-auto shadow-elegant bg-gradient-card border-primary/10">
            <CardContent className="p-8 md:p-12">
              <GraduationCap className="mx-auto h-12 w-12 md:h-16 md:w-16 text-primary mb-6" />
              
              <h3 className="text-2xl md:text-3xl font-bold academic-heading mb-4 px-4">
                Ready to Unlock Your Potential?
              </h3>
              
              <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                Join thousands of students who have already transformed their academic journey. 
                Start submitting your achievements today and unlock the benefits you deserve.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto shadow-hero">
                  <Link to="/edu-rev">
                    <Award className="mr-2 h-5 w-5" />
                    Submit First Achievement
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 border-2" asChild>
                  <Link to="/projects">
                    <Users className="mr-2 h-5 w-5" />
                    Browse Projects
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
