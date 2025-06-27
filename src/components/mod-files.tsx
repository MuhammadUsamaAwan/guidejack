import type { ModFile } from '~/types';
import { Badge } from './ui/badge';

export function ModFiles({
  modFiles,
  downloadFile,
}: {
  modFiles: ModFile[];
  downloadFile: (sourceDataId: string, fileName: string) => void;
}) {
  return (
    <div className='flex flex-wrap gap-4'>
      {modFiles.map(file => (
        <Badge
          key={file.sourceDataId}
          className='cursor-pointer'
          onClick={() => downloadFile(file.sourceDataId, file.name)}
          variant='outline'
        >
          {file.name}
        </Badge>
      ))}
    </div>
  );
}
