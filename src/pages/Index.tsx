
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users, TrendingUp, CheckCircle, Target, Zap, BarChart3, UserPlus, Search, Send } from "lucide-react";
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Enhanced Navigation */}
      <EnhancedNavigation />
      <Breadcrumb />

      {/* Hero Section with 3-step visual */}
      <section className="container mx-auto px-4 py-20">
        <div className={`text-center space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent leading-tight">
              Launch Your
              <br />
              <span className="text-blue-500">Internship Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with top companies, manage applications, and accelerate your career growth with InternSprint's comprehensive internship platform.
            </p>
          </div>

          {/* 3-Step Process Visual */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Profile</h3>
                <p className="text-gray-600">Build your professional profile with skills and preferences</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Matched</h3>
                <p className="text-gray-600">Our AI finds internships that align with your goals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Apply</h3>
                <p className="text-gray-600">Submit applications and track your progress</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* Hero Background Image */}
          <div className="mt-16">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=600&fit=crop"
              alt="Students working on internships"
              className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Key Metrics with icons and horizontal layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div className="text-4xl font-bold text-blue-600">50,000+</div>
              </div>
              <div className="text-gray-600 font-medium">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                <div className="text-4xl font-bold text-blue-600">2,500+</div>
              </div>
              <div className="text-gray-600 font-medium">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <div className="text-4xl font-bold text-blue-600">95%</div>
              </div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - 4-icon grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
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
              description: "Keep track of all your internship applications with our intuitive dashboard."
            },
            {
              icon: <Users className="w-12 h-12 text-blue-500" />,
              title: "Smart Matchmaking",
              description: "AI-powered system matches you with companies that align with your goals."
            },
            {
              icon: <BarChart3 className="w-12 h-12 text-blue-500" />,
              title: "Career Analytics",
              description: "Track your progress with detailed analytics and personalized recommendations."
            },
            {
              icon: <Zap className="w-12 h-12 text-blue-500" />,
              title: "Smart Recommendations",
              description: "Discover internships and companies with our recommendation engine."
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-blue-100 rounded-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
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

      {/* Simplified Testimonials */}
      <TestimonialsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Call-to-Action Banner */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6">
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
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg"
                >
                  Create Your Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Simplified Footer */}
      <EnhancedFooter />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
};

export default Index;
