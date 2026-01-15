"use client";
import css from "./NoteForm.module.css";
import { type NoteCreate, createNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const NoteForm = () => {
  const NotesArrey = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const values = Object.fromEntries(formData) as NoteCreate;

    if (title.trim()) {
      mutate(values);
    }
  };
  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            required
            className={css.input}
            defaultValue={draft?.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="content">
          Content
          <textarea
            name="content"
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {NotesArrey.map((notes) => (
              <option key={notes} value={notes}>
                {notes}
              </option>
            ))}
          </select>
        </label>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
          <ErrorMessage />
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
