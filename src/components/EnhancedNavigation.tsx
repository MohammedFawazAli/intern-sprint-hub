
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const EnhancedNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { 
      label: "About", 
      href: "#about",
      subItems: [
        { label: "Our Mission", href: "#about" },
        { label: "How It Works", href: "#features" },
        { label: "Success Stories", href: "#testimonials" }
      ]
    },
    { 
      label: "For Students", 
      href: "#internships",
      subItems: [
        { label: "Find Internships", href: "#internships" },
        { label: "Career Resources", href: "#blog" },
        { label: "Skill Development", href: "/courses" }
      ]
    },
    { 
      label: "For Companies", 
      href: "#hiring",
      subItems: [
        { label: "Post Internships", href: "/hiring-sessions" },
        { label: "Talent Pipeline", href: "#talent" },
        { label: "Recruitment Solutions", href: "#solutions" }
      ]
    },
    { label: "Resources", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>hello@internsprint.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/home" className="hover:text-blue-300 transition-colors">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="hover:text-blue-300 transition-colors">
                  Sign In
                </Link>
                <span>|</span>
                <Link to="/auth/signup" className="hover:text-blue-300 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-md' 
          : 'bg-white/95 backdrop-blur-md border-b border-blue-100'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  InternSprint
                </span>
                <div className="text-xs text-gray-500 font-medium">Accelerate Your Career</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.subItems && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                  >
                    {link.label}
                    {link.subItems && (
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>
                  
                  {/* Dropdown Menu */}
                  {link.subItems && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      {link.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-sm"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <Link to="/home">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg px-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 rounded-lg px-6">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg px-6">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 animate-fade-in">
              <nav className="flex flex-col space-y-1 mt-4">
                {navigationLinks.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                    {link.subItems && (
                      <div className="ml-4 space-y-1">
                        {link.subItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 mt-4">
                  {user ? (
                    <Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 rounded-lg">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg">
                          Get Started Free
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default EnhancedNavigation;
