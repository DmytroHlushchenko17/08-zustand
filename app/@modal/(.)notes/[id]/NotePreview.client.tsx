"use client";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { Note } from "@/types/note";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

type RouteParams = {
  id: string;
};

const NoteDetailsClient = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  const params = useParams<RouteParams>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  return (
    <Modal onClose={handleClick}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button onClick={handleClick} className="backBtn">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteDetailsClient;
