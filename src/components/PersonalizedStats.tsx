
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PersonalizedStats {
  weeklyGoal: number;
  weeklyProgress: number;
  streak: number;
  topSkill: string;
  completionRate: number;
  nextMilestone: string;
}

const PersonalizedStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<PersonalizedStats>({
    weeklyGoal: 200,
    weeklyProgress: 125,
    streak: 5,
    topSkill: 'React',
    completionRate: 78,
    nextMilestone: 'Complete 5 applications'
  });
  const [loading, setLoading] = useState(true);

  const fetchPersonalizedStats = async () => {
    if (!user) return;

    try {
      // Get weekly XP progress
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      
      const { data: weeklyXP } = await supabase
        .from('xp_activities')
        .select('xp_earned')
        .eq('user_id', user.id)
        .gte('created_at', weekStart.toISOString());

      const weeklyTotal = weeklyXP?.reduce((sum, activity) => sum + activity.xp_earned, 0) || 0;

      // Get user profile for skills
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('skills')
        .eq('user_id', user.id)
        .single();

      // Calculate streak (mock for now)
      const currentStreak = 5;

      setStats(prev => ({
        ...prev,
        weeklyProgress: weeklyTotal,
        streak: currentStreak,
        topSkill: profile?.skills?.[0] || 'JavaScript'
      }));
    } catch (error) {
      console.error('Error fetching personalized stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPersonalizedStats();
    }
  }, [user]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Your Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const weeklyPercentage = Math.min((stats.weeklyProgress / stats.weeklyGoal) * 100, 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Your Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weekly Goal Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Weekly XP Goal</span>
            <span className="font-medium text-gray-900">
              {stats.weeklyProgress}/{stats.weeklyGoal} XP
            </span>
          </div>
          <Progress value={weeklyPercentage} className="h-3" />
          <div className="text-xs text-gray-500 text-center">
            {weeklyPercentage >= 100 ? '🎉 Goal achieved!' : `${Math.round(weeklyPercentage)}% complete`}
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-orange-600 text-xs font-medium">Streak</span>
            </div>
            <div className="text-xl font-bold text-orange-700">{stats.streak}</div>
            <div className="text-xs text-orange-600">days</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-purple-600 text-xs font-medium">Success Rate</span>
            </div>
            <div className="text-xl font-bold text-purple-700">{stats.completionRate}%</div>
            <div className="text-xs text-purple-600">completion</div>
          </div>
        </div>

        {/* Top Skill & Next Milestone */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Top Skill</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {stats.topSkill}
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Next Milestone</span>
            </div>
            <p className="text-sm text-green-700">{stats.nextMilestone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedStats;
