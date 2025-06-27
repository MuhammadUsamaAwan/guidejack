import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { formatSize } from '~/lib/utils';
import type { Mod } from '~/types';

export function ModCard({ mod }: { mod: Mod }) {
  if (mod.type === 'separator') {
    return (
      <div>
        <Separator />
        <h2 className='my-4 font-bold text-2xl'>{mod.name}</h2>
        <Separator />
      </div>
    );
  }

  return (
    <div>
      <h3>
        {mod.index}. {mod.name}
        {mod.version ? `- v${mod.version}` : ''}
        {mod.size ? ` (${formatSize(mod.size)})` : ''}
      </h3>
      <div className='flex gap-2'>
        {mod.directUrl && (
          <Badge variant='secondary'>
            <a href={mod.directUrl} target='_blank' rel='noopener noreferrer'>
              Direct Download
            </a>
          </Badge>
        )}
        {mod.modId && mod.fileId && (
          <Badge variant='secondary'>
            <a
              href={`https://www.nexusmods.com/${mod.gameName?.toLowerCase()}/mods/${mod.modId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Mod Page
            </a>
          </Badge>
        )}
        {mod.modId && mod.fileId && (
          <Badge variant='secondary'>
            <a
              href={`https://www.nexusmods.com/${mod.gameName?.toLowerCase()}/mods/${mod.modId}?tab=files`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Files Page
            </a>
          </Badge>
        )}
        {mod.modId && mod.fileId && (
          <Badge variant='secondary'>
            <a
              href={`https://www.nexusmods.com/${mod.gameName?.toLowerCase()}/mods/${mod.modId}?tab=files&file_id=${mod.fileId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Mod Page
            </a>
          </Badge>
        )}
      </div>
    </div>
  );
}
