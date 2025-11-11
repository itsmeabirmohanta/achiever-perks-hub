import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, Users, Mail, ExternalLink, Plus, 
  Code, Lightbulb, Calendar, MapPin, Star 
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const { toast } = useToast();

  const projects = [
    {
      id: 1,
      title: "AI-Powered Student Analytics Platform",
      description: "Develop a comprehensive analytics dashboard for tracking student performance, engagement, and predictive insights using machine learning algorithms.",
      mentor: "Dr. Sarah Chen",
      department: "Computer Science",
      duration: "6 months",
      difficulty: "Advanced",
      positions: 3,
      skills: ["Python", "Machine Learning", "React", "PostgreSQL"],
      applications: 12
    },
    {
      id: 2,
      title: "Smart Campus IoT Infrastructure",
      description: "Design and implement IoT sensors across campus for energy optimization, security monitoring, and environmental data collection.",
      mentor: "Prof. Michael Rodriguez",
      department: "Electronics & Communication",
      duration: "4 months",
      difficulty: "Intermediate",
      positions: 4,
      skills: ["Arduino", "Raspberry Pi", "C++", "Cloud Computing"],
      applications: 8
    },
    {
      id: 3,
      title: "Sustainable Energy Management System",
      description: "Create an automated system for optimizing renewable energy usage in university buildings with real-time monitoring and control.",
      mentor: "Dr. Priya Malhotra",
      department: "Electrical Engineering",
      duration: "5 months",
      difficulty: "Advanced",
      positions: 2,
      skills: ["MATLAB", "Power Systems", "Control Theory", "Python"],
      applications: 6
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Professor, Computer Science",
      expertise: ["Artificial Intelligence", "Machine Learning", "Data Science", "Software Engineering"],
      rating: 4.9,
      students: 24,
      projects: 8,
      email: "sarah.chen@university.edu",
      image: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      title: "Associate Professor, ECE",
      expertise: ["IoT Systems", "Embedded Programming", "Robotics", "Signal Processing"],
      rating: 4.8,
      students: 18,
      projects: 6,
      email: "m.rodriguez@university.edu",
      image: "/api/placeholder/64/64"
    },
    {
      id: 3,
      name: "Dr. Priya Malhotra",
      title: "Assistant Professor, Electrical",
      expertise: ["Renewable Energy", "Power Systems", "Control Systems", "Smart Grids"],
      rating: 4.7,
      students: 15,
      projects: 5,
      email: "priya.malhotra@university.edu",
      image: "/api/placeholder/64/64"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Professor, Mechanical Engineering",
      expertise: ["Robotics", "Automation", "CAD/CAM", "Manufacturing"],
      rating: 4.9,
      students: 22,
      projects: 9,
      email: "james.wilson@university.edu",
      image: "/api/placeholder/64/64"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-primary/10 text-primary border-primary/20";
      case "Advanced": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleApplyProject = (projectId: number) => {
    toast({
      title: "Application Submitted! 🚀",
      description: "Your project application has been sent to the mentor. You will hear back within 48 hours.",
    });
  };

  const handleContactMentor = (mentorName: string) => {
    toast({
      title: "Contact Request Sent! 📧",
      description: "The mentor will respond to schedule a consultation.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold academic-heading mb-4 px-4">
            Projects & Mentors
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Engage in cutting-edge research projects and connect with expert faculty mentors. 
            Build your skills while contributing to impactful innovations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
            <Button 
              onClick={() => setActiveTab("projects")}
              variant={activeTab === "projects" ? "default" : "outline"}
              className={activeTab === "projects" ? "bg-gradient-hero text-white shadow-hero hover:scale-105 transition-all duration-300" : "border-2 hover:scale-105 transition-all duration-300"}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Available Projects
            </Button>
            <Button 
              onClick={() => setActiveTab("mentors")}
              variant={activeTab === "mentors" ? "default" : "outline"}
              className={activeTab === "mentors" ? "bg-gradient-accent text-white shadow-accent hover:scale-105 transition-all duration-300" : "border-2 hover:scale-105 transition-all duration-300"}
            >
              <Users className="mr-2 h-4 w-4" />
              Faculty Mentors
            </Button>
          </div>
        </div>

        {activeTab === "projects" ? (
          /* Projects Section */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Available Projects</h2>
                <p className="text-muted-foreground">Choose from ongoing research projects across departments</p>
              </div>
              <Button className="bg-gradient-accent text-white shadow-accent hover:scale-105 transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" />
                Propose New Project
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-elegant hover:shadow-hero transition-all duration-300 hover:scale-102">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        {project.applications} applications
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{project.mentor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{project.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span>{project.positions} positions</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={() => handleApplyProject(project.id)}
                        className="flex-1 bg-gradient-hero text-white shadow-hero hover:scale-105 transition-all duration-300"
                      >
                        <Code className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Mentors Section */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Faculty Mentors</h2>
                <p className="text-muted-foreground">Connect with expert faculty members for guidance and collaboration</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search mentors..." className="w-64" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="shadow-elegant hover:shadow-accent transition-all duration-300 hover:scale-102">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback className="bg-gradient-hero text-white text-lg font-bold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{mentor.name}</CardTitle>
                        <CardDescription className="text-base mb-2">
                          {mentor.title}
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{mentor.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{mentor.students} students</span>
                          <span>•</span>
                          <span>{mentor.projects} projects</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={() => handleContactMentor(mentor.name)}
                        className="flex-1 bg-gradient-accent text-white shadow-accent hover:scale-105 transition-all duration-300"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Mentor
                      </Button>
                      <Button variant="outline" size="icon">
                        <Lightbulb className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;