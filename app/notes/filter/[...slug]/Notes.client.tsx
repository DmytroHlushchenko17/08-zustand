"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Notes.client.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "@/lib/api";
import { Toaster } from "react-hot-toast";
import type {
  FetchNotesParams,
  FetchNotesResponse,
  NoteTag,
} from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

const PER_PAGE = 12;

type Props = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearchQuery] = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const queryParams: FetchNotesParams = {
    page,
    perPage: PER_PAGE,
    search: debouncedSearchQuery,
    tag,
  };

  const { data, isPending, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onChangePage={setPage}
          />
        )}
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </header>

      {isPending && <Loader />}
      {isError && <ErrorMessage />}
      {!isPending && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {/* {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )} */}
      <Toaster
        toastOptions={{
          success: { style: { background: "green", color: "white" } },
          error: { style: { background: "red", color: "white" } },
        }}
      />
    </div>
  );
}
