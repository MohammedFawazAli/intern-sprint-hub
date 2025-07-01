
-- Fix the foreign key constraint issue in applications table
-- Remove the foreign key constraint to internship_listings since we're using session_id
ALTER TABLE public.applications 
DROP CONSTRAINT IF EXISTS applications_internship_id_fkey;

-- Make internship_id nullable since we're using session_id for hiring sessions
ALTER TABLE public.applications 
ALTER COLUMN internship_id DROP NOT NULL;

-- Add a check constraint to ensure either internship_id or session_id is provided
ALTER TABLE public.applications 
ADD CONSTRAINT applications_either_internship_or_session_check 
CHECK (internship_id IS NOT NULL OR session_id IS NOT NULL);

-- Update existing records to set internship_id to NULL where session_id exists
UPDATE public.applications 
SET internship_id = NULL 
WHERE session_id IS NOT NULL;
