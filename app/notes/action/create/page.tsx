// import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create notes",
  description: "Create notes",
  openGraph: {
    title: "Create notes",
    description: "Create notes",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* {<NoteForm onCancel={} onSuccess={} />} */}
      </div>
    </main>
  );
}
