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
  const [modInfo, setModInfo] = useState<ModListInfo>();

  if (messages.some(m => m.type === 'success')) {
    return (
      <div className='mx-auto max-w-4xl space-y-8 py-10'>
        <ModListInfoCard modlistInfo={modInfo!} />
        {mods.map(mod => (
          <ModCard key={mod.name + mod.modId} mod={mod} />
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
          try {
            setMessages([{ text: 'Processing file...', type: 'info' }]);
            const file = files[0];
            const buf = await file.arrayBuffer();

            setMessages(prev => [...prev, { text: 'Unzipping file...', type: 'info' }]);
            const zip = unzipSync(new Uint8Array(buf));

            setMessages(prev => [...prev, { text: 'Searching for modlist.json...', type: 'info' }]);
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

            setMessages(prev => [...prev, { text: 'Searching for modlist...', type: 'info' }]);
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
            for (const modName of modlist) {
              if (modName.endsWith('_separator')) {
                setMods(prev => [...prev, { name: modName.slice(1).replace('_separator', ''), type: 'separator' }]);
              } else {
                const directives = modlistJson.Directives.filter(d => d.To.startsWith(`mods\\${modName.slice(1)}\\`));
                const archiveHash = directives.find(d => d.$type === 'FromArchive')?.ArchiveHashPath?.[0];
                if (archiveHash) {
                  const archive = modlistJson.Archives.find(a => a.Hash === archiveHash);
                  if (archive) {
                    setMods(prev => [
                      ...prev,
                      {
                        name: modName.slice(1),
                        type: 'mod',
                        index: modIndex++,
                        active: modName.startsWith('+'),
                        gameName: archive.State.GameName,
                        version: archive.State.Version,
                        directUrl: archive.State.Url,
                        modId: archive.State.ModID,
                        fileId: archive.State.FileID,
                        size: archive.Size,
                      },
                    ]);
                  }
                } else {
                  setMods(prev => [
                    ...prev,
                    {
                      name: modName.slice(1),
                      index: modIndex++,
                      type: 'mod',
                      active: modName.startsWith('+'),
                    },
                  ]);
                }
              }
            }

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
      <ProgressMessages messages={messages} />
      <HowItWorks />
      <WhyGuideJack />
    </div>
  );
}
