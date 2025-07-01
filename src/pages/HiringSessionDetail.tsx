
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Calendar, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ApplicationModal from '@/components/ApplicationModal';

interface HiringSession {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: 'open' | 'closed';
}

interface Application {
  id: string;
  user_id: string;
  cover_letter: string;
  resume_url: string | null;
  applied_at: string;
  status: string | null;
}

const HiringSessionDetail = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<HiringSession | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [userApplication, setUserApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
      fetchApplications();
    }
  }, [sessionId]);

  const fetchSessionDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('hiring_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      setSession({
        ...data,
        status: data.status as 'open' | 'closed'
      });
    } catch (error) {
      console.error('Error fetching session details:', error);
      toast({
        title: "Error",
        description: "Failed to load session details",
        variant: "destructive"
      });
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('session_id', sessionId)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
      
      if (user) {
        const userApp = data?.find(app => app.user_id === user.id);
        setUserApplication(userApp || null);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (applicationData: { coverLetter: string; resumeUrl?: string }) => {
    if (!user || !sessionId) return;

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          session_id: sessionId,
          cover_letter: applicationData.coverLetter,
          resume_url: applicationData.resumeUrl || null,
          status: 'pending',
          internship_id: sessionId
        })
        .select()
        .single();

      if (error) throw error;

      setUserApplication(data);
      setApplications([data, ...applications]);
      setShowApplicationModal(false);
      
      toast({
        title: "Success",
        description: "Application submitted successfully"
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive"
      });
    }
  };

  const downloadResume = async (resumeUrl: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(resumeUrl.replace('resumes/', ''));

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const isSessionOwner = session && user && session.created_by === user.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Session Not Found</h1>
          <p className="text-gray-600 mb-6">The hiring session you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/hiring-sessions')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sessions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/hiring-sessions')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sessions
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Job Post Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-xl shadow-sm border-0 mb-6">
              <CardHeader className="pb-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                      {session.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Created {new Date(session.created_at).toLocaleDateString()}</span>
                      </div>
                      <Badge 
                        variant={session.status === 'open' ? 'default' : 'secondary'}
                        className={`px-3 py-1 rounded-full font-medium ${
                          session.status === 'open' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {session.status === 'open' ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                  {!isSessionOwner && user && session.status === 'open' && !userApplication && (
                    <Button 
                      onClick={() => setShowApplicationModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{session.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* User's Application Status */}
            {userApplication && (
              <Card className="bg-white rounded-xl shadow-sm border-0 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Your Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="outline"
                      className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 border-gray-200"
                    >
                      Status: {userApplication.status || 'Pending'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Applied {new Date(userApplication.applied_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Cover Letter:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{userApplication.cover_letter}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Section - Applications Panel */}
          <div>
            <Card className="bg-white rounded-xl shadow-sm border-0 sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <Users className="w-5 h-5 mr-3 text-blue-600" />
                  Applications ({applications.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No applications yet</p>
                    <p className="text-gray-400 text-sm">Be the first to apply!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {applications.map((application) => (
                      <div key={application.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <Badge 
                            variant="outline" 
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 border-gray-200 rounded-full"
                          >
                            {application.status || 'Pending'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(application.applied_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                          {application.cover_letter}
                        </p>
                        {application.resume_url && isSessionOwner && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadResume(application.resume_url!)}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-gray-200 rounded-lg font-medium"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Resume
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ApplicationModal
        open={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApply}
      />
    </div>
  );
};

export default HiringSessionDetail;
