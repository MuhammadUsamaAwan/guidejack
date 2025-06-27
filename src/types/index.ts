export type ProgressMessage = {
  text: string;
  type: 'info' | 'success' | 'error';
};

export type Modlist = {
  Author: string;
  Description: string;
  GameType: string;
  Image: string;
  Name: string;
  Readme: string;
  WabbajackVersion: string;
  Website: string;
  Version: string;
  IsNSFW: boolean;
  Archives: Archive[];
  Directives: Directive[];
};

export type Archive = {
  Hash: string;
  Meta: string;
  Name: string;
  Size: number;
  State: {
    $type:
      | 'HttpDownloader, Wabbajack.Lib'
      | 'NexusDownloader, Wabbajack.Lib'
      | 'GameFileSourceDownloader, Wabbajack.Lib';
    Headers?: { name: string; value: string }[];
    Url?: string;
    Author?: string;
    Description?: string;
    FileID?: number;
    GameName?: string;
    ImageURL?: string;
    IsNSFW?: boolean;
    ModID?: number;
    Name?: string;
    Version?: string;
    Game?: string;
    GameFile?: string;
    GameVersion?: string;
    Hash?: string;
  };
};

export type Directive = {
  $type: 'FromArchive' | 'InlineFile' | 'PatchedFromArchive' | 'RemappedInlineFile';
  ArchiveHashPath?: string[];
  Hash: string;
  Size: number;
  To: string;
  SourceDataID?: string;
  FromHash?: string;
  PatchID?: string;
};

export type ModListInfo = {
  author: string;
  description: string;
  gameType: string;
  name: string;
  readme: string;
  website: string;
  version: string;
  isNSFW: boolean;
};

export type Mod = {
  name: string;
  type: 'separator' | 'mod';
  active?: boolean;
  index?: number;
  gameName?: string;
  modId?: number;
  fileId?: number;
  version?: string;
  directUrl?: string;
  size?: number;
  description?: string;
  files?: Files[];
};

export type Files = {
  path: string;
  sourceDataId: string;
  size: number;
};
