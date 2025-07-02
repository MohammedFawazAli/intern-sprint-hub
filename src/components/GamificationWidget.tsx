
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

const GamificationWidget = () => {
  const { userGamification, badges, loading } = useGamification();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userGamification) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Start your journey to earn XP and level up!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getXPForNextLevel = () => {
    const levelThresholds = [0, 100, 250, 500, 1000, 2000];
    const currentLevel = userGamification.current_level;
    if (currentLevel >= 6) return 0;
    return levelThresholds[currentLevel] - userGamification.total_xp;
  };

  const getProgressToNextLevel = () => {
    const levelThresholds = [0, 100, 250, 500, 1000, 2000];
    const currentLevel = userGamification.current_level;
    if (currentLevel >= 6) return 100;
    
    const currentThreshold = levelThresholds[currentLevel - 1];
    const nextThreshold = levelThresholds[currentLevel];
    const progress = ((userGamification.total_xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level and XP */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold">{userGamification.level_name}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Level {userGamification.current_level} • {userGamification.total_xp} XP
          </div>
          {userGamification.current_level < 6 && (
            <>
              <Progress value={getProgressToNextLevel()} className="w-full mb-2" />
              <div className="text-xs text-gray-500">
                {getXPForNextLevel()} XP to next level
              </div>
            </>
          )}
        </div>

        {/* Recent Badges */}
        {badges.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-sm">Recent Badges</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {badges.slice(0, 3).map((badge) => (
                <Badge
                  key={badge.id}
                  variant="secondary"
                  className="text-xs"
                  title={badge.badge_description}
                >
                  {badge.badge_icon} {badge.badge_name}
                </Badge>
              ))}
              {badges.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{badges.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GamificationWidget;
