import { strFromU8, unzipSync } from 'fflate';
import { useState } from 'react';
import { Dropzone } from './components/dropzone';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { ProgressMessages } from './components/progress-messages';
import { WhyGuideJack } from './components/why-guidejack';

export function App() {
  const [messages, setMessages] = useState<{ text: string; type: 'info' | 'success' | 'error' }[]>([]);

  return (
    <div className='mx-auto max-w-4xl space-y-8 py-10'>
      <Hero />
      <Dropzone
        className='mx-auto max-w-xl'
        onFilesAccepted={async files => {
          setMessages([{ text: 'Unzipping file...', type: 'info' }]);
          try {
            const file = files[0];
            const buf = await file.arrayBuffer();
            const zip = unzipSync(new Uint8Array(buf));
            const modlistRaw = zip.modlist;
            if (!modlistRaw) {
              throw new Error('No modlist found in the zip file.');
            }
            const modlistJson = JSON.parse(strFromU8(modlistRaw));
            setMessages(prev => [...prev, { text: 'Modlist successfully unzipped.', type: 'success' }]);
          } catch (error) {
            setMessages(prev => [
              ...prev,
              {
                text: `${error instanceof Error ? error.message : String(error)}`,
                type: 'error',
              },
            ]);
          }
        }}
      />
      <ProgressMessages messages={messages} />
      <HowItWorks />
      <WhyGuideJack />
    </div>
  );
}
