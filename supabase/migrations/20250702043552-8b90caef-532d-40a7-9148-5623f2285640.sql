
-- Create table for tracking user XP and levels
CREATE TABLE public.user_gamification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  level_name TEXT NOT NULL DEFAULT 'Explorer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create table for user badges
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_hours INTEGER NOT NULL DEFAULT 0,
  difficulty_level TEXT NOT NULL DEFAULT 'Beginner',
  category TEXT NOT NULL,
  content_url TEXT,
  thumbnail_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user course progress
CREATE TABLE public.user_course_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create table for XP activities/events
CREATE TABLE public.xp_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  xp_earned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for dashboard widget preferences
CREATE TABLE public.user_widget_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  widget_id TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, widget_id)
);

-- Insert sample courses
INSERT INTO public.courses (title, description, estimated_hours, difficulty_level, category) VALUES
('Resume Writing Masterclass', 'Learn to create compelling resumes that get noticed by recruiters', 3, 'Beginner', 'Career Development'),
('Interview Skills & Confidence', 'Master the art of interviewing with practical tips and mock sessions', 4, 'Intermediate', 'Interview Prep'),
('LinkedIn Profile Optimization', 'Build a professional LinkedIn presence that attracts opportunities', 2, 'Beginner', 'Professional Branding'),
('Networking for Introverts', 'Effective networking strategies for introverted professionals', 3, 'Beginner', 'Networking'),
('Technical Interview Prep', 'Ace technical interviews with coding challenges and system design', 8, 'Advanced', 'Technical Skills'),
('Personal Branding 101', 'Develop your unique professional brand and online presence', 5, 'Intermediate', 'Professional Branding');

-- Add RLS policies for user_gamification
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own gamification data"
  ON public.user_gamification
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own gamification data"
  ON public.user_gamification
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own gamification data"
  ON public.user_gamification
  FOR UPDATE
  USING (user_id = auth.uid());

-- Add RLS policies for user_badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges"
  ON public.user_badges
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can create badges for users"
  ON public.user_badges
  FOR INSERT
  WITH CHECK (true);

-- Add RLS policies for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active courses"
  ON public.courses
  FOR SELECT
  USING (is_active = true);

-- Add RLS policies for user_course_progress
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course progress"
  ON public.user_course_progress
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own course progress"
  ON public.user_course_progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own course progress"
  ON public.user_course_progress
  FOR UPDATE
  USING (user_id = auth.uid());

-- Add RLS policies for xp_activities
ALTER TABLE public.xp_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own XP activities"
  ON public.xp_activities
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can create XP activities"
  ON public.xp_activities
  FOR INSERT
  WITH CHECK (true);

-- Add RLS policies for user_widget_preferences
ALTER TABLE public.user_widget_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own widget preferences"
  ON public.user_widget_preferences
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Function to calculate user level based on XP
CREATE OR REPLACE FUNCTION calculate_user_level(total_xp INTEGER)
RETURNS TABLE(level INTEGER, level_name TEXT) AS $$
BEGIN
  IF total_xp < 100 THEN
    RETURN QUERY SELECT 1, 'Explorer'::TEXT;
  ELSIF total_xp < 250 THEN
    RETURN QUERY SELECT 2, 'Achiever'::TEXT;
  ELSIF total_xp < 500 THEN
    RETURN QUERY SELECT 3, 'Specialist'::TEXT;
  ELSIF total_xp < 1000 THEN
    RETURN QUERY SELECT 4, 'Expert'::TEXT;
  ELSIF total_xp < 2000 THEN
    RETURN QUERY SELECT 5, 'Master'::TEXT;
  ELSE
    RETURN QUERY SELECT 6, 'Legend'::TEXT;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to award XP and update user level
CREATE OR REPLACE FUNCTION award_xp(user_id_param UUID, xp_amount INTEGER, activity_type_param TEXT, activity_description_param TEXT)
RETURNS VOID AS $$
DECLARE
  current_xp INTEGER;
  new_total_xp INTEGER;
  new_level_data RECORD;
BEGIN
  -- Insert XP activity record
  INSERT INTO public.xp_activities (user_id, activity_type, activity_description, xp_earned)
  VALUES (user_id_param, activity_type_param, activity_description_param, xp_amount);
  
  -- Get current XP or create gamification record
  SELECT total_xp INTO current_xp
  FROM public.user_gamification
  WHERE user_id = user_id_param;
  
  IF current_xp IS NULL THEN
    current_xp := 0;
  END IF;
  
  new_total_xp := current_xp + xp_amount;
  
  -- Calculate new level
  SELECT level, level_name INTO new_level_data
  FROM calculate_user_level(new_total_xp);
  
  -- Update or insert gamification record
  INSERT INTO public.user_gamification (user_id, total_xp, current_level, level_name)
  VALUES (user_id_param, new_total_xp, new_level_data.level, new_level_data.level_name)
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_xp = new_total_xp,
    current_level = new_level_data.level,
    level_name = new_level_data.level_name,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;
