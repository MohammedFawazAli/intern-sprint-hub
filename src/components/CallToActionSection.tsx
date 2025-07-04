
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
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
  );
};

export default CallToActionSection;
