import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  currentFile?: string;
  bucketName?: string;
  filePath?: string;
  fileTypes?: string[];
  maxSizeMB?: number;
}

const FileUpload = ({ 
  onFileUpload, 
  accept = ".pdf", 
  maxSize = 5,
  label = "Upload Document",
  currentFile,
  bucketName = 'internship-documents',
  filePath,
  fileTypes = ['pdf'],
  maxSizeMB = 5
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();
  const { user } = useAuth();

  // Use maxSizeMB if provided, otherwise fall back to maxSize
  const actualMaxSize = maxSizeMB || maxSize;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file size
    if (file.size > actualMaxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size should be less than ${actualMaxSize}MB`,
        variant: "destructive"
      });
      return;
    }

    // Check file type using fileTypes prop
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !fileTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file with one of these extensions: ${fileTypes.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      // Create structured file path: users/{user_id}/filename
      const fileExt = file.name.split('.').pop();
      const structuredPath = filePath || `users/${user.id}/${Date.now()}.${fileExt}`;

      console.log('Uploading file to path:', structuredPath);

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(structuredPath, file, {
          upsert: true // Allow overwriting existing files
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get the file path for storing in database
      const fileUrl = `${bucketName}/${structuredPath}`;
      console.log('File uploaded successfully, URL:', fileUrl);
      onFileUpload(fileUrl);
      
      toast({
        title: "File uploaded successfully",
        description: "Your document has been uploaded.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!currentFile || !user) return;

    try {
      // Extract bucket and path from the stored URL
      const [bucket, ...pathParts] = currentFile.split('/');
      const filePath = pathParts.join('/');

      console.log('Downloading file from bucket:', bucket, 'path:', filePath);

      const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

      if (error) {
        console.error('Download error:', error);
        throw error;
      }

      // Create download link
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filePath.split('/').pop() || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download started",
        description: "Your document is being downloaded.",
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFile = () => {
    setFileName('');
    onFileUpload('');
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-700">{label}</Label>
      {fileName || currentFile ? (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              {fileName || currentFile?.split('/').pop() || 'Current file'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {currentFile && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-blue-500 hover:text-blue-700"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <Label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : `Click to upload or drag and drop`}
            </span>
            <span className="text-xs text-gray-500">
              {fileTypes.map(type => type.toUpperCase()).join(', ')} up to {actualMaxSize}MB
            </span>
          </Label>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
