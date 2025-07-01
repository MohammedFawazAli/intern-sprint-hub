import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, Building } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CreateHiringSessionModal from '@/components/CreateHiringSessionModal';

interface HiringSession {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: 'open' | 'closed';
}

const HiringSessions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<HiringSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchHiringSessions();
  }, []);

  const fetchHiringSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('hiring_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Cast the status to the expected type for each session
      const typedSessions = (data || []).map(session => ({
        ...session,
        status: session.status as 'open' | 'closed'
      }));
      setSessions(typedSessions);
    } catch (error) {
      console.error('Error fetching hiring sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load hiring sessions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (sessionData: { title: string; description: string }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('hiring_sessions')
        .insert([{
          ...sessionData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Cast the status to the expected type
      const typedSession = {
        ...data,
        status: data.status as 'open' | 'closed'
      };

      setSessions([typedSession, ...sessions]);
      setShowCreateModal(false);
      toast({
        title: "Success",
        description: "Hiring session created successfully"
      });
    } catch (error) {
      console.error('Error creating hiring session:', error);
      toast({
        title: "Error",
        description: "Failed to create hiring session",
        variant: "destructive"
      });
    }
  };

  const handleViewSession = (sessionId: string) => {
    navigate(`/hiring-sessions/${sessionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hiring sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hiring Sessions</h1>
            <p className="text-gray-600">Manage and view all hiring sessions</p>
          </div>
          {user && (
            <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Session
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => handleViewSession(session.id)}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {session.title}
                  </CardTitle>
                  <Badge variant={session.status === 'open' ? 'default' : 'secondary'}>
                    {session.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {session.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(session.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hiring sessions yet</h3>
            <p className="text-gray-500 mb-6">Create your first hiring session to get started</p>
            {user && (
              <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Session
              </Button>
            )}
          </div>
        )}
      </div>

      <CreateHiringSessionModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSession}
      />
    </div>
  );
};

export default HiringSessions;
