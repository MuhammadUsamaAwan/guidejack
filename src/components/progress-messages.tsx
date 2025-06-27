import { AlertCircleIcon, CheckCircleIcon, TerminalIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import type { ProgressMessage } from '~/types';

export function ProgressMessages({
  messages,
  setShowGuide,
}: {
  messages: ProgressMessage[];
  setShowGuide: (show: boolean) => void;
}) {
  return (
    <div className='mx-auto max-w-xl space-y-2'>
      {messages.map(msg => (
        <Alert key={msg.text} variant={msg.type === 'error' ? 'destructive' : 'default'}>
          {msg.type === 'error' ? (
            <AlertCircleIcon className='size-4 text-red-500' />
          ) : msg.type === 'success' ? (
            <CheckCircleIcon className='size-4 text-green-600' />
          ) : (
            <TerminalIcon className='size-4' />
          )}
          <AlertTitle className='capitalize'>{msg.type}</AlertTitle>
          <AlertDescription>
            {msg.type === 'success' ? (
              <span>
                {msg.text}{' '}
                <button
                  type='button'
                  onClick={() => {
                    setShowGuide(true);
                    window.scrollTo({ top: 0 });
                  }}
                  className='cursor-pointer underline'
                >
                  Show Guide
                </button>
              </span>
            ) : (
              msg.text
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
