
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path: string) => {
    const breadcrumbMap: { [key: string]: string } = {
      'auth': 'Authentication',
      'signup': 'Sign Up',
      'login': 'Sign In',
      'forgot-password': 'Forgot Password',
      'reset-password': 'Reset Password',
      'profile': 'Profile',
      'home': 'Dashboard',
      'ai-assistant': 'AI Assistant',
      'hiring-sessions': 'Hiring Sessions',
      'courses': 'Courses'
    };
    return breadcrumbMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Don't show breadcrumb on homepage
  if (location.pathname === '/') return null;

  return (
    <nav className="bg-gray-50 py-3 px-4 border-b border-gray-200">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <li key={name} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {isLast ? (
                  <span className="text-gray-900 font-medium">
                    {getBreadcrumbName(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {getBreadcrumbName(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
