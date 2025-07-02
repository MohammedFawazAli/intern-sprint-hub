
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EnhancedNotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const helpfulLinks = [
    { title: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { title: "Find Internships", href: "/#internships", icon: <Search className="w-4 h-4" /> },
    { title: "About Us", href: "/#about", icon: <RefreshCw className="w-4 h-4" /> },
    { title: "Contact", href: "/#contact", icon: <ArrowLeft className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text mb-4 animate-pulse">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Main Message */}
        <Card className="mb-8 border-0 shadow-xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              The page you're looking for seems to have wandered off. 
              Don't worry though, we'll help you find your way back to discovering amazing internship opportunities!
            </p>
            
            {/* Auto-redirect notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                Redirecting to homepage in {countdown} seconds...
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Links */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Pages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {helpfulLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="flex items-center space-x-2 p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-2">
            Still having trouble? We're here to help!
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <a href="mailto:support@internsprint.com" className="text-blue-600 hover:underline">
              support@internsprint.com
            </a>
            <span className="text-gray-300">|</span>
            <a href="tel:+15551234567" className="text-blue-600 hover:underline">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNotFound;
