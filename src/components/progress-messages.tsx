import { AlertCircleIcon, CheckCircleIcon, TerminalIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import type { ProgressMessage } from '~/types';

export function ProgressMessages({ messages }: { messages: ProgressMessage[] }) {
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
          <AlertDescription>{msg.text}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
