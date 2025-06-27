import { strFromU8, unzipSync } from 'fflate';
import { useState } from 'react';
import { Dropzone } from './components/dropzone';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { ModCard } from './components/mod-card';
import { ModListInfoCard } from './components/modlist-info-card';
import { ProgressMessages } from './components/progress-messages';
import { WhyGuideJack } from './components/why-guidejack';
import type { Mod, ModListInfo, Modlist } from './types';

export function App() {
  const [messages, setMessages] = useState<{ text: string; type: 'info' | 'success' | 'error' }[]>([]);
  const [mods, setMods] = useState<Mod[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [modInfo, setModInfo] = useState<ModListInfo>();
  const [zip, setZip] = useState<Record<string, Uint8Array>>({});

  function downloadFile(sourceDataId: string, fileName: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([strFromU8(zip[sourceDataId])], { type: 'application/octet-stream' }));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (showGuide) {
    return (
      <div className='mx-auto max-w-4xl space-y-8 py-10'>
        <button
          className='cursor-pointer text-muted-foreground text-sm underline'
          type='button'
          onClick={() => setShowGuide(false)}
        >
          Hide Guide
        </button>
        <ModListInfoCard modlistInfo={modInfo!} />
        {mods.map(mod => (
          <ModCard key={mod.name + mod.modId} mod={mod} downloadFile={downloadFile} />
        ))}
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl space-y-8 py-10'>
      <Hero />
      <Dropzone
        className='mx-auto max-w-xl'
        onFilesAccepted={async files => {
          setMessages([]);
          setModInfo(undefined);
          setMods([]);
          try {
            setMessages([{ text: 'Processing file...', type: 'info' }]);
            const file = files[0];
            const buf = await file.arrayBuffer();

            setMessages(prev => [...prev, { text: 'Unzipping file...', type: 'info' }]);
            const zip = unzipSync(new Uint8Array(buf));
            setZip(zip);

            setMessages(prev => [...prev, { text: 'Collecting information...', type: 'info' }]);
            const modlistRaw = zip.modlist;
            if (!modlistRaw) {
              throw new Error('No modlist.json found in the wabbajack file.');
            }
            const modlistJson = JSON.parse(strFromU8(modlistRaw)) as Modlist;
            setModInfo({
              author: modlistJson.Author,
              description: modlistJson.Description,
              gameType: modlistJson.GameType,
              name: modlistJson.Name,
              readme: modlistJson.Readme,
              website: modlistJson.Website,
              version: modlistJson.Version,
              isNSFW: modlistJson.IsNSFW,
            });

            setMessages(prev => [...prev, { text: 'Searching modlist...', type: 'info' }]);
            const modlistSource = modlistJson.Directives.find(d => d.To.endsWith('modlist.txt'))?.SourceDataID;
            if (!modlistSource) {
              throw new Error('No modlist found in the directives.');
            }
            const sourceFile = zip[modlistSource];
            if (!sourceFile) {
              throw new Error("Couldn't find modlist source");
            }
            const modlist = strFromU8(sourceFile)
              .split('\n')
              .map(line => line.trim())
              .filter(Boolean)
              .reverse();

            setMessages(prev => [...prev, { text: 'Modlist found, processing...', type: 'info' }]);
            let modIndex = 1;
            const newMods: Mod[] = [];
            for (const modName of modlist) {
              if (modName.endsWith('_separator')) {
                newMods.push({
                  name: modName.slice(1).replace('_separator', ''),
                  type: 'separator',
                });
              } else {
                const directives = modlistJson.Directives.filter(d => d.To.startsWith(`mods\\${modName.slice(1)}\\`));
                const archiveHash = directives.find(d => d.$type === 'FromArchive')?.ArchiveHashPath?.[0];
                const archive = modlistJson.Archives.find(a => a.Hash === archiveHash);
                newMods.push({
                  name: modName.slice(1),
                  type: 'mod',
                  index: modIndex++,
                  active: modName.startsWith('+'),
                  gameName: archive?.State.GameName,
                  version: archive?.State.Version,
                  directUrl: archive?.State.Url,
                  modId: archive?.State.ModID,
                  fileId: archive?.State.FileID,
                  size: archive?.Size,
                  description: archive?.State.Description,
                  files: directives
                    .filter(d => !d.To.endsWith('meta.ini'))
                    .map(d => ({
                      path: d.To.replace(`mods\\${modName.slice(1)}\\`, ''),
                      sourceDataId: (d.SourceDataID || d.PatchID) as string,
                      size: d.Size,
                    })),
                });
              }
            }
            setMods(newMods);

            setMessages(prev => [...prev, { text: 'Success!', type: 'success' }]);
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
      <ProgressMessages messages={messages} setShowGuide={setShowGuide} />
      <HowItWorks />
      <WhyGuideJack />
    </div>
  );
}
