import { create } from "zustand";
import { NoteCreate } from "../api";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NoteCreate;
  setDraft: (note: NoteCreate) => void;
  clearDraft: () => void;
};

const initialDraft: NoteCreate = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
