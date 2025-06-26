import { Dropzone } from './components/dropzone';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { WhyGuideJack } from './components/why-guidejack';

export function App() {
  return (
    <div className='mx-auto max-w-4xl space-y-8 py-10'>
      <Hero />
      <Dropzone className='mx-auto max-w-xl' onFilesAccepted={() => {}} />
      <HowItWorks />
      <WhyGuideJack />
    </div>
  );
}
