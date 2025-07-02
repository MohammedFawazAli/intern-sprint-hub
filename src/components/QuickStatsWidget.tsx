
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Building, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalApplications: number;
  activeSessions: number;
  completedCourses: number;
  recentActivity: number;
}

const QuickStatsWidget = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    activeSessions: 0,
    completedCourses: 0,
    recentActivity: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user) return;

    try {
      // Fetch applications count
      const { count: applicationsCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch active hiring sessions count
      const { count: sessionsCount } = await supabase
        .from('hiring_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      // Fetch completed courses count
      const { count: completedCoursesCount } = await supabase
        .from('user_course_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed');

      // Fetch recent activity (XP activities in last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentActivityCount } = await supabase
        .from('xp_activities')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString());

      setStats({
        totalApplications: applicationsCount || 0,
        activeSessions: sessionsCount || 0,
        completedCourses: completedCoursesCount || 0,
        recentActivity: recentActivityCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const statItems = [
    {
      label: 'Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Open Sessions',
      value: stats.activeSessions,
      icon: Building,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Courses Done',
      value: stats.completedCourses,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Recent Activity',
      value: stats.recentActivity,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.label} className="text-center">
                <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <IconComponent className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStatsWidget;
