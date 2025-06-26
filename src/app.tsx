import { strFromU8, unzipSync } from 'fflate';
import { Dropzone } from './components/dropzone';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { WhyGuideJack } from './components/why-guidejack';

export function App() {
  return (
    <div className='mx-auto max-w-4xl space-y-8 py-10'>
      <Hero />
      <Dropzone
        className='mx-auto max-w-xl'
        onFilesAccepted={async files => {
          const file = files[0];
          const buf = await file.arrayBuffer();
          const zip = unzipSync(new Uint8Array(buf));
          const modlistRaw = zip.modlist;
          const modlistJson = JSON.parse(strFromU8(modlistRaw));
          console.log(modlistJson);
        }}
      />
      <HowItWorks />
      <WhyGuideJack />
    </div>
  );
}
