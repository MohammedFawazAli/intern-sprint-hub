
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users, TrendingUp, CheckCircle, Target, Zap, BarChart3, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import GlobalNavigation from "@/components/GlobalNavigation";
import InternshipPreview from "@/components/InternshipPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Global Navigation */}
      <GlobalNavigation />

      {/* Hero Section */}
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
              Connect with top companies, manage applications, and accelerate your career growth with InternSprint's comprehensive internship platform. Join thousands of students who've transformed their careers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
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
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need to land your dream internship and accelerate your career growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Target className="w-12 h-12 text-blue-500" />,
              title: "Smart Application Tracking",
              description: "Keep track of all your internship applications with our intuitive dashboard. Never miss a deadline or follow-up again."
            },
            {
              icon: <Users className="w-12 h-12 text-blue-500" />,
              title: "Company Matchmaking Engine",
              description: "Our AI-powered system matches you with companies that align with your skills, interests, and career goals."
            },
            {
              icon: <BarChart3 className="w-12 h-12 text-blue-500" />,
              title: "Career Growth Analytics",
              description: "Track your progress with detailed analytics and get personalized recommendations to improve your profile."
            },
            {
              icon: <Zap className="w-12 h-12 text-blue-500" />,
              title: "Personalized Recommendations",
              description: "Discover internships and companies you never knew existed with our smart recommendation engine."
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-blue-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Internship Preview Section */}
      <InternshipPreview />

      {/* Success Stories / Testimonials */}
      <TestimonialsSection />

      {/* Blog & Resources Teaser */}
      <BlogSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-800">About InternSprint</h2>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Founded by former students who understand the challenges of finding the perfect internship, 
              InternSprint is dedicated to bridging the gap between ambitious students and innovative companies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize access to internship opportunities and empower the next generation of professionals.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where every student has access to meaningful internship experiences that shape their career.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Innovation, transparency, student-first approach, and building lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              {["Free to start", "No credit card required", "Instant setup", "24/7 support"].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Link to="/auth/signup">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Create Your Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
