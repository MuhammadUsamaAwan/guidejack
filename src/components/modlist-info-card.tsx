import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { pascalCaseToTitleCase } from '~/lib/utils';
import type { ModListInfo } from '~/types';

export function ModListInfoCard({ modlistInfo }: { modlistInfo: ModListInfo }) {
  return (
    <Card className='w-full gap-4'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-2xl'>
          {modlistInfo.name}
          {modlistInfo.isNSFW && <Badge variant='destructive'>🔞 NSFW</Badge>}
        </CardTitle>
        <p className='text-muted-foreground text-sm'>{modlistInfo.description || 'No description.'}</p>
      </CardHeader>

      <CardContent className='space-y-1'>
        <div className='text-sm'>
          <span className='font-medium'>👤 Author:</span>{' '}
          <span className='text-muted-foreground'>{modlistInfo.author}</span>
        </div>
        <div className='text-sm'>
          <span className='font-medium'>🎮 Game:</span>{' '}
          <span className='text-muted-foreground'>{pascalCaseToTitleCase(modlistInfo.gameType)}</span>
        </div>
        <div className='text-sm'>
          <span className='font-medium'>🛠️ Version:</span>{' '}
          <span className='text-muted-foreground'>{modlistInfo.version}</span>
        </div>

        <div className='flex gap-4 pt-2 text-sm'>
          {modlistInfo.website && (
            <a href={modlistInfo.website} target='_blank' rel='noopener noreferrer'>
              🌐 <span className='text-blue-500 underline'>Website</span>
            </a>
          )}
          {modlistInfo.readme && (
            <a href={modlistInfo.readme} target='_blank' rel='noopener noreferrer'>
              📘 <span className='text-blue-500 underline'>Readme</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
