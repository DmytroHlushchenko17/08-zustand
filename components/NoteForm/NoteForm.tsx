"use client";
import css from "./NoteForm.module.css";
import { type NoteCreate, createNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// interface NoteFormProps {
//   onCancel: () => void;
//   onSuccess: () => void;
// }

// const validationSchema = Yup.object({
//   title: Yup.string().min(3).max(50).required(),
//   content: Yup.string().max(500),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required(),
// });

// const NoteForm = ({ onCancel, onSuccess }: NoteFormProps) => {
//   const queryClient = useQueryClient();

//   const createNoteMutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         predicate: (q) =>
//           Array.isArray(q.queryKey) && q.queryKey[0] === "notes",
//       });
//       onSuccess();
//       toast.success("Note created successfully");
//     },
//     onError: () => {
//       toast.error("Failed to create note");
//     },
//   });

//   const initialValues = {
//     title: "",
//     content: "",
//     tag: "Todo",
//   };

type Props = {
  notes: Note[];
};

const NoteForm = ({ notes }: Props) => {
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
    const values = Object.fromEntries(formData) as NoteCreate;
    mutate(values);
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
            className={css.input}
            defaultValue={draft?.title}
            onChange={handleChange}
          />
        </label>
        <ErrorMessage />

        <label htmlFor="content">
          Content
          <input
            name="content"
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          />
        </label>
        <ErrorMessage />

        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {notes.map((notes) => (
              <option key={notes.id} value={notes.id}>
                {notes.tag}
              </option>
            ))}
          </select>
        </label>
        <ErrorMessage />

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            onClick={handleSubmit}
          >
            Create note
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
