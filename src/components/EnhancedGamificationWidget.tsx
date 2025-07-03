
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Award, Target, Zap, Calendar, TrendingUp } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useState } from 'react';

const EnhancedGamificationWidget = () => {
  const { userGamification, badges, loading } = useGamification();
  const [showDetails, setShowDetails] = useState(false);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Journey
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
            Start Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Level Up?</h3>
            <p className="text-gray-600 mb-4">Complete activities to earn XP and unlock achievements!</p>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Get Started
            </Button>
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

  const getLevelGradient = (level: number) => {
    const gradients = [
      'from-gray-400 to-gray-500',
      'from-green-400 to-green-500',
      'from-blue-400 to-blue-500',
      'from-purple-400 to-purple-500',
      'from-orange-400 to-orange-500',
      'from-red-400 to-red-500',
      'from-yellow-400 to-yellow-500'
    ];
    return gradients[level - 1] || gradients[0];
  };

  const getCurrentLevelRewards = () => {
    const rewards = [
      { level: 2, reward: "Profile Badge" },
      { level: 3, reward: "Advanced Features" },
      { level: 4, reward: "Priority Support" },
      { level: 5, reward: "Expert Status" },
      { level: 6, reward: "Legend Title" }
    ];
    return rewards.find(r => r.level === userGamification.current_level + 1);
  };

  const nextReward = getCurrentLevelRewards();

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${getLevelGradient(userGamification.current_level)} rounded-full flex items-center justify-center`}>
              <Trophy className="w-4 h-4 text-white" />
            </div>
            Your Journey
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs"
          >
            {showDetails ? 'Less' : 'More'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level and XP Display */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${getLevelGradient(userGamification.current_level)} rounded-full flex items-center justify-center`}>
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{userGamification.level_name}</div>
              <div className="text-sm text-gray-600">Level {userGamification.current_level}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{userGamification.total_xp} XP</span>
              {userGamification.current_level < 6 && (
                <span className="text-gray-600">{getXPForNextLevel()} XP to go</span>
              )}
            </div>
            {userGamification.current_level < 6 && (
              <Progress 
                value={getProgressToNextLevel()} 
                className="w-full h-3"
              />
            )}
          </div>
        </div>

        {/* Next Reward Preview */}
        {nextReward && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Next reward: <span className="font-semibold text-blue-600">{nextReward.reward}</span>
              </span>
            </div>
          </div>
        )}

        {/* Recent Badges */}
        {badges.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-sm text-gray-900">Recent Achievements</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {badges.slice(0, showDetails ? badges.length : 2).map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white border border-gray-200 rounded-lg p-2 text-center hover:shadow-sm transition-shadow"
                  title={badge.badge_description}
                >
                  <div className="text-lg mb-1">{badge.badge_icon}</div>
                  <div className="text-xs font-medium text-gray-900 truncate">{badge.badge_name}</div>
                </div>
              ))}
            </div>
            {badges.length > 2 && !showDetails && (
              <div className="text-center mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600"
                  onClick={() => setShowDetails(true)}
                >
                  +{badges.length - 2} more badges
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Weekly Progress (Enhanced Details) */}
        {showDetails && (
          <div className="border-t pt-3 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Calendar className="w-4 h-4 text-green-600" />
              This Week's Progress
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <div className="font-semibold text-green-700">+125 XP</div>
                <div className="text-green-600 text-xs">Earned</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <div className="font-semibold text-blue-700">3</div>
                <div className="text-blue-600 text-xs">Activities</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedGamificationWidget;
