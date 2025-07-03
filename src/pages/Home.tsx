import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User, MessageSquare, Building, LogOut, Home as HomeIcon, FileText, Briefcase, BookOpen, Trophy } from 'lucide-react';
import EnhancedGamificationWidget from '@/components/EnhancedGamificationWidget';
import QuickStatsWidget from '@/components/QuickStatsWidget';
import RecentActivityWidget from '@/components/RecentActivityWidget';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';
import PersonalizedStats from '@/components/PersonalizedStats';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const featureCards = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Manage your profile information, upload your resume, and update your skills.',
      icon: User,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      route: '/profile'
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'Get personalized career advice and assistance with your job search.',
      icon: MessageSquare,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      route: '/ai-assistant'
    },
    {
      id: 'hiring-sessions',
      title: 'Hiring Sessions',
      description: 'Browse and apply to hiring sessions, or create your own if you\'re recruiting.',
      icon: Building,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      route: '/hiring-sessions'
    },
    {
      id: 'courses',
      title: 'Course Dashboard',
      description: 'Enhance your skills with our curated learning courses and track your progress.',
      icon: BookOpen,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      route: '/courses'
    }
  ];

  const quickActions = [
    {
      title: 'Complete Profile',
      route: '/profile',
      variant: 'default' as const,
      className: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      title: 'Browse Opportunities',
      route: '/hiring-sessions',
      variant: 'outline' as const,
      className: 'border-gray-300 text-gray-700 hover:bg-gray-50'
    },
    {
      title: 'Take Courses',
      route: '/courses',
      variant: 'outline' as const,
      className: 'border-gray-300 text-gray-700 hover:bg-gray-50'
    },
    {
      title: 'Get Career Advice',
      route: '/ai-assistant',
      variant: 'outline' as const,
      className: 'border-gray-300 text-gray-700 hover:bg-gray-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar for Large Screens */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-sm">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6">
            <h1 className="text-xl font-bold text-gray-900">InternSprint</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              <button
                onClick={() => navigate('/home')}
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 w-full text-left"
              >
                <HomeIcon className="mr-3 h-5 w-5" />
                Home
              </button>
              <button
                onClick={() => navigate('/hiring-sessions')}
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                <Building className="mr-3 h-5 w-5" />
                Sessions
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Courses
              </button>
              <button
                onClick={() => navigate('/hiring-sessions')}
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                <FileText className="mr-3 h-5 w-5" />
                Applications
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600">Here's your personalized dashboard</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Enhanced Dashboard Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <EnhancedGamificationWidget />
            <PersonalizedStats />
            <RecentActivityWidget />
          </div>

          {/* Personalized Recommendations */}
          <div className="mb-8">
            <PersonalizedRecommendations />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featureCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Card 
                  key={card.id}
                  className="bg-white rounded-xl shadow-sm border-0 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(card.route)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-sm">{card.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border-0 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
            <p className="text-gray-600 mb-6">Jump straight into the most important tasks</p>
            <div className="flex flex-wrap justify-center gap-4">
              {quickActions.map((action, index) => (
                <Button 
                  key={index}
                  onClick={() => navigate(action.route)} 
                  variant={action.variant}
                  className={`px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all ${action.className}`}
                >
                  {action.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
