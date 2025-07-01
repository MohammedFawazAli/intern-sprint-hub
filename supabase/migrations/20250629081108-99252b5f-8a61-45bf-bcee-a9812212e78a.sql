
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- Create corrected storage policies for the internship-documents bucket
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

CREATE POLICY "Users can update their own documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'internship-documents' 
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);
