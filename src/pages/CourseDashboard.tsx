import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, PlayCircle, CheckCircle, Filter, Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourses } from '@/hooks/useCourses';
import { useGamification } from '@/hooks/useGamification';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const CourseDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courses, loading, startCourse, updateProgress } = useCourses();
  const { awardXP } = useGamification();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [completingCourses, setCompletingCourses] = useState<Set<string>>(new Set());

  const handleStartCourse = async (courseId: string, courseTitle: string) => {
    await startCourse(courseId);
    await awardXP(10, 'course_started', `Started course: ${courseTitle}`);
    toast({
      title: "Course Started!",
      description: `You've started "${courseTitle}" and earned 10 XP!`,
    });
  };

  const handleCompleteCourse = async (courseId: string, courseTitle: string) => {
    // Prevent multiple completions by checking if already completing or completed
    const course = courses.find(c => c.id === courseId);
    if (!course || course.progress?.status === 'completed' || completingCourses.has(courseId)) {
      return;
    }

    // Add to completing set to prevent double-clicking
    setCompletingCourses(prev => new Set([...prev, courseId]));

    try {
      await updateProgress(courseId, 100);
      await awardXP(50, 'course_completion', `Completed course: ${courseTitle}`);
      toast({
        title: "Course Completed!",
        description: `Congratulations! You completed "${courseTitle}" and earned 50 XP!`,
      });
    } catch (error) {
      console.error('Error completing course:', error);
      toast({
        title: "Error",
        description: "Failed to complete course. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Remove from completing set after completion attempt
      setCompletingCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || course.difficulty_level === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [...new Set(courses.map(c => c.category))];
  const difficulties = [...new Set(courses.map(c => c.difficulty_level))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/home')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Dashboard</h1>
              <p className="text-gray-600">Enhance your skills with our curated courses</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isCompleted = course.progress?.status === 'completed';
            const isCompleting = completingCourses.has(course.id);
            
            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(course.difficulty_level)}>
                      {course.difficulty_level}
                    </Badge>
                    {course.progress && (
                      <Badge className={getStatusColor(course.progress.status)}>
                        {course.progress.status === 'completed' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </div>
                        ) : course.progress.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.estimated_hours}h
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.category}
                    </div>
                  </div>

                  {course.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress.progress_percentage}%</span>
                      </div>
                      <Progress value={course.progress.progress_percentage} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!course.progress ? (
                      <Button 
                        onClick={() => handleStartCourse(course.id, course.title)}
                        className="flex-1"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    ) : isCompleted ? (
                      <Button variant="secondary" className="flex-1" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="flex-1">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                        <Button 
                          onClick={() => handleCompleteCourse(course.id, course.title)}
                          size="sm"
                          disabled={isCompleting}
                          className="whitespace-nowrap"
                        >
                          {isCompleting ? 'Completing...' : 'Mark Complete'}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more courses.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;
