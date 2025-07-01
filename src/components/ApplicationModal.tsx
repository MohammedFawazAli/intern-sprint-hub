
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FileUpload from '@/components/FileUpload';

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { coverLetter: string; resumeUrl?: string }) => void;
}

const ApplicationModal = ({ open, onClose, onSubmit }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coverLetter.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        coverLetter: formData.coverLetter,
        resumeUrl: formData.resumeUrl || undefined
      });
      setFormData({ coverLetter: '', resumeUrl: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ coverLetter: '', resumeUrl: '' });
    onClose();
  };

  const handleResumeUpload = (url: string) => {
    setFormData({ ...formData, resumeUrl: url });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Tell us why you're interested in this opportunity..."
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Resume (Optional)</Label>
            <FileUpload
              onFileUpload={handleResumeUpload}
              currentFile={formData.resumeUrl}
              bucketName="resumes"
              fileTypes={['pdf', 'doc', 'docx']}
              maxSizeMB={5}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !formData.coverLetter.trim()}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
