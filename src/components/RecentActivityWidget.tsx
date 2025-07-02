
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, BookOpen, FileText, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  activity_type: string;
  activity_description: string;
  xp_earned: number;
  created_at: string;
}

const RecentActivityWidget = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('xp_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching activities:', error);
        return;
      }

      setActivities(data || []);
    } catch (error) {
      console.error('Error in fetchActivities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'course_completion':
        return BookOpen;
      case 'application_submitted':
        return FileText;
      case 'profile_completion':
        return Award;
      case 'session_created':
        return Briefcase;
      default:
        return Clock;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
      case 'course_completion':
        return 'text-green-600';
      case 'application_submitted':
        return 'text-blue-600';
      case 'profile_completion':
        return 'text-purple-600';
      case 'session_created':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-6 w-12 bg-gray-200 rounded ml-2"></div>
              </div>
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
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-4">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No recent activity</p>
            <p className="text-gray-400 text-xs">Complete courses or apply to sessions to see activity here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.activity_type);
              const iconColor = getActivityColor(activity.activity_type);
              
              return (
                <div key={activity.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 flex-1">
                    <IconComponent className={`w-4 h-4 ${iconColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {activity.activity_description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    +{activity.xp_earned} XP
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityWidget;
