
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users, TrendingUp, CheckCircle, Target, Zap, BarChart3, UserPlus, Search, Send, Sparkles, Rocket, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import InternshipPreview from "@/components/InternshipPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import EnhancedFooter from "@/components/EnhancedFooter";
import TrustSection from "@/components/TrustSection";
import CookieConsent from "@/components/CookieConsent";
import Breadcrumb from "@/components/Breadcrumb";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate metrics
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { icon: Users, value: "50,000+", label: "Students Placed", color: "text-blue-600" },
    { icon: Briefcase, value: "2,500+", label: "Partner Companies", color: "text-green-600" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Enhanced Navigation */}
      <EnhancedNavigation />
      <Breadcrumb />

      {/* Hero Section with enhanced visuals */}
      <section className="container mx-auto px-4 py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className={`text-center space-y-8 transition-all duration-1000 relative z-10 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 text-sm font-medium text-blue-700 mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Acceleration
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent leading-tight">
              Launch Your
              <br />
              <span className="text-blue-500 relative">
                Internship Journey
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with top companies, manage applications, and accelerate your career growth with InternSprint's comprehensive internship platform.
            </p>
          </div>

          {/* Enhanced 3-Step Process Visual */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: UserPlus, title: "Create Profile", description: "Build your professional profile with skills and preferences", color: "blue" },
                { icon: Search, title: "Get Matched", description: "Our AI finds internships that align with your goals", color: "green" },
                { icon: Send, title: "Apply", description: "Submit applications and track your progress", color: "purple" }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#features">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:border-blue-300"
              >
                <Globe className="mr-2 w-5 h-5" />
                Learn More
              </Button>
            </a>
          </div>

          {/* Enhanced Hero Image */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=600&fit=crop"
              alt="Students working on internships"
              className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full relative z-10"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Animated Key Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const isActive = currentMetric === index;
              return (
                <div 
                  key={index}
                  className={`text-center transition-all duration-500 transform ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`flex items-center justify-center mb-4 transition-all duration-300 ${
                    isActive ? 'animate-pulse' : ''
                  }`}>
                    <div className={`w-12 h-12 bg-gradient-to-br from-${metric.color.split('-')[1]}-100 to-${metric.color.split('-')[1]}-200 rounded-full flex items-center justify-center mr-3`}>
                      <IconComponent className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className={`text-4xl font-bold ${metric.color} transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-gray-600 font-medium">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Core Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-3 text-sm font-medium text-purple-700 mb-4">
            <Rocket className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to land your dream internship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Target className="w-12 h-12 text-blue-500" />,
              title: "Application Tracking",
              description: "Keep track of all your internship applications with our intuitive dashboard.",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Users className="w-12 h-12 text-green-500" />,
              title: "Smart Matchmaking",
              description: "AI-powered system matches you with companies that align with your goals.",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              icon: <BarChart3 className="w-12 h-12 text-purple-500" />,
              title: "Career Analytics",
              description: "Track your progress with detailed analytics and personalized recommendations.",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: <Zap className="w-12 h-12 text-orange-500" />,
              title: "Smart Recommendations",
              description: "Discover internships and companies with our recommendation engine.",
              gradient: "from-orange-500 to-red-500"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 rounded-xl group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-4 flex justify-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Simplified Internship Preview */}
      <InternshipPreview />
      <TestimonialsSection />
      <BlogSection />

      {/* Enhanced Call-to-Action Banner */}
      <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-6 py-3 text-sm font-medium text-white mb-4">
              <Sparkles className="w-4 h-4" />
              Join the Community
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Sprint Ahead?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of students who have already accelerated their careers with InternSprint. 
              Start your journey today and unlock opportunities you never knew existed.
            </p>
            <div className="flex items-center justify-center space-x-6 text-blue-100 mb-8 flex-wrap">
              {["Free to start", "No credit card required", "Instant setup"].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/auth/signup">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg group"
                >
                  Create Your Free Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <EnhancedFooter />
      <CookieConsent />
    </div>
  );
};

export default Index;
