
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Search, Send, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
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
  );
};

export default HeroSection;
