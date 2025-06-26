import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '~/app';
import { Toaster } from '~/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
