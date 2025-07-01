
-- Create hiring_sessions table (this is new)
CREATE TABLE public.hiring_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed'))
);

-- Add session_id to existing applications table
ALTER TABLE public.applications 
ADD COLUMN session_id UUID REFERENCES public.hiring_sessions(id) ON DELETE CASCADE;

-- Update applications table to ensure we have the right constraints
-- First, let's check if we need to update the existing structure
ALTER TABLE public.applications 
ALTER COLUMN cover_letter SET NOT NULL;

-- Add unique constraint to prevent duplicate applications per session
ALTER TABLE public.applications 
ADD CONSTRAINT unique_session_application UNIQUE(session_id, user_id);

-- Create resumes storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on hiring_sessions table
ALTER TABLE public.hiring_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hiring_sessions
-- Anyone can read all hiring sessions
CREATE POLICY "Anyone can view hiring sessions" 
ON public.hiring_sessions 
FOR SELECT 
USING (true);

-- Only authenticated users can create sessions
CREATE POLICY "Authenticated users can create sessions" 
ON public.hiring_sessions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Only the creator can update their sessions
CREATE POLICY "Creators can update their sessions" 
ON public.hiring_sessions 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

-- Only the creator can delete their sessions
CREATE POLICY "Creators can delete their sessions" 
ON public.hiring_sessions 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Update RLS Policies for existing applications table
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can view relevant applications" ON public.applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can delete their own applications" ON public.applications;

-- Users can only insert applications for themselves
CREATE POLICY "Users can create their own applications" 
ON public.applications 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own applications OR applications to their hiring sessions
CREATE POLICY "Users can view relevant applications" 
ON public.applications 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = user_id 
  OR 
  auth.uid() IN (
    SELECT created_by 
    FROM public.hiring_sessions 
    WHERE id = session_id
  )
);

-- Users can update their own applications
CREATE POLICY "Users can update their own applications" 
ON public.applications 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own applications
CREATE POLICY "Users can delete their own applications" 
ON public.applications 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Storage policies for resumes bucket
CREATE POLICY "Users can upload their own resumes" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

CREATE POLICY "Users can view resumes for their sessions or own applications" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (
  bucket_id = 'resumes' 
  AND (
    -- User can view their own uploaded resumes
    auth.uid()::text = (string_to_array(name, '/'))[2]
    OR
    -- Session creators can view resumes for applications to their sessions
    auth.uid() IN (
      SELECT hs.created_by
      FROM public.hiring_sessions hs
      JOIN public.applications a ON hs.id = a.session_id
      WHERE (string_to_array(name, '/'))[3] = hs.id::text
    )
  )
);

CREATE POLICY "Users can update their own resumes" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

CREATE POLICY "Users can delete their own resumes" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

-- Add indexes for better performance
CREATE INDEX idx_hiring_sessions_created_by ON public.hiring_sessions(created_by);
CREATE INDEX idx_hiring_sessions_status ON public.hiring_sessions(status);
CREATE INDEX idx_applications_session_id ON public.applications(session_id);
