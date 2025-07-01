
-- Create the internship-documents storage bucket (private by default)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'internship-documents', 
  'internship-documents', 
  false, 
  5242880, -- 5MB limit
  '{"application/pdf"}'
);

-- Create storage policies for the internship-documents bucket
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add document_url column to user_profiles table for storing document references
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS document_url text;
