export type RichTextBlock = {
  type: 'paragraph' | 'heading' | 'bullet';
  text: string;
};

export type Tag = {
  id: string;
  label: string;
  summary?: string;
  outline?: string;
  color?: string;
};

export type VaultFile = {
  id: string;
  name: string;
  type: 'pdf' | 'epub' | 'image' | 'audio' | 'video' | 'link' | 'other';
  localUri?: string;
  remoteUrl?: string;
  locked?: boolean;
  favorite?: boolean;
  tagIds: string[];
};

export type Shelf = {
  id: string;
  title: string;
  description: string;
  background?: string;
  files: VaultFile[];
  locked?: boolean;
  favorite?: boolean;
};

export type Workspace = {
  id: string;
  name: string;
  shelves: Shelf[];
  tags: Tag[];
};
