import { create } from "zustand";
import { NoteCreate } from "../api";

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

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
