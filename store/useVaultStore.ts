import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as DocumentPicker from 'expo-document-picker';
import { Workspace, VaultFile } from '@/types/models';

const uid = () => Math.random().toString(36).slice(2, 10);

const initialWorkspace: Workspace = {
  id: 'workspace-1',
  name: 'Workspace 1',
  shelves: [
    {
      id: 'shelf-1',
      title: 'Favorites',
      description: 'Starred books and quick grabs.',
      favorite: true,
      files: []
    }
  ],
  tags: []
};

type VaultState = {
  workspace: Workspace;
  createShelf: (title: string) => void;
  updateShelf: (shelfId: string, patch: Partial<Workspace['shelves'][number]>) => void;
  addFileToShelf: (shelfId: string, file: VaultFile) => void;
  toggleFavorite: (shelfId: string, fileId: string) => void;
  importFile: (shelfId: string) => Promise<void>;
};

export const useVaultStore = create<VaultState>()(
  persist(
    (set, get) => ({
      workspace: initialWorkspace,
      createShelf: (title) =>
        set((state) => ({
          workspace: {
            ...state.workspace,
            shelves: [
              ...state.workspace.shelves,
              { id: uid(), title, description: '', files: [] }
            ]
          }
        })),
      updateShelf: (shelfId, patch) =>
        set((state) => ({
          workspace: {
            ...state.workspace,
            shelves: state.workspace.shelves.map((s) =>
              s.id === shelfId ? { ...s, ...patch } : s
            )
          }
        })),
      addFileToShelf: (shelfId, file) =>
        set((state) => ({
          workspace: {
            ...state.workspace,
            shelves: state.workspace.shelves.map((s) =>
              s.id === shelfId ? { ...s, files: [...s.files, file] } : s
            )
          }
        })),
      toggleFavorite: (shelfId, fileId) =>
        set((state) => ({
          workspace: {
            ...state.workspace,
            shelves: state.workspace.shelves.map((s) =>
              s.id === shelfId
                ? {
                    ...s,
                    files: s.files.map((f) =>
                      f.id === fileId ? { ...f, favorite: !f.favorite } : f
                    )
                  }
                : s
            )
          }
        })),
      importFile: async (shelfId) => {
        const result = await DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: true });
        if (result.canceled) return;
        const asset = result.assets[0];
        const name = asset.name ?? 'Untitled';
        const lower = name.toLowerCase();
        const type: VaultFile['type'] =
          lower.endsWith('.pdf') ? 'pdf' :
          lower.endsWith('.epub') ? 'epub' :
          asset.mimeType?.startsWith('image/') ? 'image' :
          asset.mimeType?.startsWith('audio/') ? 'audio' :
          asset.mimeType?.startsWith('video/') ? 'video' :
          'other';

        get().addFileToShelf(shelfId, {
          id: uid(),
          name,
          type,
          localUri: asset.uri,
          tagIds: []
        });
      }
    }),
    {
      name: 'studyvault-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
