
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserGamification {
  id: string;
  user_id: string;
  total_xp: number;
  current_level: number;
  level_name: string;
  created_at: string;
  updated_at: string;
}

interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  earned_at: string;
}

export const useGamification = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userGamification, setUserGamification] = useState<UserGamification | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGamificationData = async () => {
    if (!user) return;

    try {
      // Fetch user gamification data
      const { data: gamificationData, error: gamificationError } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (gamificationError && gamificationError.code !== 'PGRST116') {
        console.error('Error fetching gamification data:', gamificationError);
      } else if (gamificationData) {
        setUserGamification(gamificationData);
      }

      // Fetch user badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
      } else {
        setBadges(badgesData || []);
      }
    } catch (error) {
      console.error('Error in fetchGamificationData:', error);
    } finally {
      setLoading(false);
    }
  };

  const awardXP = async (xpAmount: number, activityType: string, activityDescription: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('award_xp', {
        user_id_param: user.id,
        xp_amount: xpAmount,
        activity_type_param: activityType,
        activity_description_param: activityDescription
      });

      if (error) {
        console.error('Error awarding XP:', error);
        return;
      }

      // Refresh gamification data
      await fetchGamificationData();

      toast({
        title: "XP Earned!",
        description: `You earned ${xpAmount} XP for ${activityDescription}`,
      });
    } catch (error) {
      console.error('Error in awardXP:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGamificationData();
    }
  }, [user]);

  return {
    userGamification,
    badges,
    loading,
    awardXP,
    refetch: fetchGamificationData
  };
};
