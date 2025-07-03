
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Building, BookOpen, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface RecommendationItem {
  id: string;
  type: 'session' | 'course' | 'company';
  title: string;
  description: string;
  relevanceScore: number;
  tags: string[];
  actionUrl: string;
}

const PersonalizedRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    if (!user) return;

    try {
      // Get user profile to understand preferences
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('skills, major, university')
        .eq('user_id', user.id)
        .single();

      // Get user's recent activity
      const { data: activities } = await supabase
        .from('xp_activities')
        .select('activity_type, activity_description')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Generate personalized recommendations based on profile and activity
      const mockRecommendations: RecommendationItem[] = [
        {
          id: '1',
          type: 'session',
          title: 'Frontend Developer Hiring Session',
          description: 'Perfect match for your React and JavaScript skills',
          relevanceScore: 95,
          tags: ['React', 'JavaScript', 'Remote'],
          actionUrl: '/hiring-sessions'
        },
        {
          id: '2',
          type: 'course',
          title: 'Advanced React Patterns',
          description: 'Take your React skills to the next level',
          relevanceScore: 88,
          tags: ['React', 'Advanced', 'Frontend'],
          actionUrl: '/courses'
        },
        {
          id: '3',
          type: 'session',
          title: 'Startup Internship Program',
          description: 'Great for gaining diverse experience',
          relevanceScore: 82,
          tags: ['Startup', 'Full-time', 'Growth'],
          actionUrl: '/hiring-sessions'
        }
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'session':
        return Building;
      case 'course':
        return BookOpen;
      case 'company':
        return Users;
      default:
        return TrendingUp;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'session':
        return 'text-blue-600';
      case 'course':
        return 'text-green-600';
      case 'company':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Complete your profile to get personalized recommendations</p>
          </div>
        ) : (
          recommendations.map((item) => {
            const IconComponent = getTypeIcon(item.type);
            const iconColor = getTypeColor(item.type);
            
            return (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-green-600 font-medium">
                          {item.relevanceScore}% match
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-3 text-blue-600 hover:text-blue-700"
                        >
                          View <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
