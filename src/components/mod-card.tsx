import { Badge } from '~/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { Separator } from '~/components/ui/separator';
import { cn, formatSize } from '~/lib/utils';
import type { Mod } from '~/types';

export function ModCard({
  mod,
  downloadFile,
}: {
  mod: Mod;
  downloadFile: (sourceDataId: string, fileName: string) => void;
}) {
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
      <div className={cn('font-medium', !mod.active && 'line-through')}>
        {mod.index}. {mod.name}
        {mod.version && <span className='text-muted-foreground'> — v{mod.version}</span>}
        {mod.size && <span className='text-muted-foreground'> ({formatSize(mod.size)})</span>}
      </div>
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
              Nexux Page
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
              Nexus Files Tab
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
              Nexus Download
            </a>
          </Badge>
        )}
      </div>
      {mod.description && <p className='mt-2 text-muted-foreground text-sm'>{mod.description}</p>}
      {mod.files?.length ? (
        <Collapsible>
          <CollapsibleTrigger className='my-2 cursor-pointer text-muted-foreground text-sm underline'>
            Show/Hide Files
          </CollapsibleTrigger>
          <CollapsibleContent>
            <code className='text-muted-foreground text-sm'>
              {mod.files?.map(f => (
                <div key={f.path}>
                  {f.path} ({formatSize(f.size)})
                  {f.sourceDataId ? (
                    <button
                      className='ml-1 cursor-pointer underline'
                      onClick={() => {
                        downloadFile(f.sourceDataId, f.path.split('\\').pop() ?? 'file');
                      }}
                      type='button'
                    >
                      Download
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </code>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
}
