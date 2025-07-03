
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  title: string;
  description: string;
  estimated_hours: number;
  difficulty_level: string;
  category: string;
  content_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  progress_percentage: number;
  completed_at: string | null;
  started_at: string | null;
  updated_at: string;
}

interface CourseWithProgress extends Course {
  progress?: CourseProgress;
}

export const useCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    if (!user) return;

    try {
      console.log('Fetching courses for user:', user.id);
      
      // Fetch all active courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        return;
      }

      console.log('Courses fetched:', coursesData?.length || 0);

      // Fetch user progress for all courses
      const { data: progressData, error: progressError } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching course progress:', progressError);
      } else {
        console.log('Course progress fetched:', progressData?.length || 0);
      }

      // Combine courses with progress data
      const coursesWithProgress = coursesData?.map(course => ({
        ...course,
        progress: progressData?.find(p => p.course_id === course.id)
      })) || [];

      console.log('Combined courses with progress:', coursesWithProgress);
      setCourses(coursesWithProgress);
    } catch (error) {
      console.error('Error in fetchCourses:', error);
    } finally {
      setLoading(false);
    }
  };

  const startCourse = async (courseId: string) => {
    if (!user) return;

    try {
      console.log('Starting course:', courseId, 'for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          status: 'in_progress',
          progress_percentage: 0,
          started_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        })
        .select();

      if (error) {
        console.error('Error starting course:', error);
        throw error;
      }

      console.log('Course started successfully:', data);
      await fetchCourses();
    } catch (error) {
      console.error('Error in startCourse:', error);
      throw error;
    }
  };

  const updateProgress = async (courseId: string, progressPercentage: number) => {
    if (!user) return;

    try {
      console.log('Updating progress for course:', courseId, 'to', progressPercentage + '%');
      
      const isCompleted = progressPercentage >= 100;
      const updateData: any = {
        user_id: user.id,
        course_id: courseId,
        progress_percentage: progressPercentage,
        status: isCompleted ? 'completed' : 'in_progress',
        updated_at: new Date().toISOString()
      };

      if (isCompleted) {
        updateData.completed_at = new Date().toISOString();
      }

      console.log('Update data:', updateData);

      const { data, error } = await supabase
        .from('user_course_progress')
        .upsert(updateData, {
          onConflict: 'user_id,course_id'
        })
        .select();

      if (error) {
        console.error('Error updating progress:', error);
        throw error;
      }

      console.log('Progress updated successfully:', data);
      await fetchCourses();
      return data;
    } catch (error) {
      console.error('Error in updateProgress:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  return {
    courses,
    loading,
    startCourse,
    updateProgress,
    refetch: fetchCourses
  };
};
