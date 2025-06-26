import { UploadCloud } from 'lucide-react';
import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Card, CardContent } from '~/components/ui/card';
import { cn } from '~/lib/utils';

type DropzoneProps = {
  onFilesAccepted: (files: File[]) => void;
  className?: string;
};

export function Dropzone({ onFilesAccepted, className }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach(rej => {
          rej.errors.forEach(err => {
            if (err.code === 'file-invalid-type') {
              toast.error('Only .wabbajack files are allowed.');
            } else if (err.code === 'too-many-files') {
              toast.error('Only one file can be uploaded.');
            } else {
              toast.error(err.message);
            }
          });
        });
        return;
      }
      onFilesAccepted(acceptedFiles);
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/wabbajack': ['.wabbajack'],
    },
    maxFiles: 1,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'cursor-pointer rounded-2xl border-2 border-muted border-dashed p-6 text-center transition-all hover:border-primary',
        isDragActive && 'border-primary bg-muted',
        className
      )}
    >
      <CardContent className='flex flex-col items-center gap-2'>
        <UploadCloud className='h-10 w-10 text-muted-foreground' />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='text-muted-foreground'>Drop the wabbajack file here...</p>
        ) : (
          <p className='text-muted-foreground'>Drag & drop wabbajack here, or click to select file</p>
        )}
      </CardContent>
    </Card>
  );
}
