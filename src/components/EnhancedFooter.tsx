
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Linkedin, Twitter, Facebook, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EnhancedFooter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to our newsletter. You'll receive career tips and internship opportunities.",
      });
      setEmail("");
    }
  };

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Our Mission", href: "#about" },
    { label: "How It Works", href: "#features" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Careers", href: "#careers" },
    { label: "Press Kit", href: "#press" },
  ];

  const studentLinks = [
    { label: "Find Internships", href: "#internships" },
    { label: "Career Resources", href: "#blog" },
    { label: "Skill Development", href: "/courses" },
    { label: "Resume Builder", href: "#resume-builder" },
    { label: "Interview Prep", href: "#interview-prep" },
    { label: "Student Community", href: "#community" },
  ];

  const companyServices = [
    { label: "Post Internships", href: "/hiring-sessions" },
    { label: "Talent Pipeline", href: "#talent" },
    { label: "Recruitment Solutions", href: "#solutions" },
    { label: "University Partnerships", href: "#partnerships" },
    { label: "Diversity & Inclusion", href: "#diversity" },
    { label: "Enterprise Solutions", href: "#enterprise" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Data Protection", href: "/data-protection" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Security", href: "/security" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">InternSprint</span>
                <div className="text-sm text-gray-400">Accelerate Your Career</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Connecting ambitious students with world-class internship opportunities. 
              Join our community of 50,000+ students who've accelerated their careers through 
              meaningful internship experiences.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>hello@internsprint.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/internsprint"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/internsprint"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-400 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com/internsprint"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-800 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">For Students</h3>
            <ul className="space-y-3">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">For Companies</h3>
            <ul className="space-y-3">
              {companyServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Connected</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Get weekly updates on new internship opportunities, career tips, and industry insights.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 rounded-lg"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            
            <p className="text-xs text-gray-400">
              Join 25,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Footer Links */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h4>
              <div className="grid grid-cols-2 gap-2">
                {companyLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal & Privacy</h4>
              <div className="grid grid-cols-2 gap-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 InternSprint. All rights reserved. Built with ❤️ for students worldwide.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🔒 SSL Secured</span>
              <span>🌍 Global Platform</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
