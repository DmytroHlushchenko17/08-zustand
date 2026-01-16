import css from "./Notes.client.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTag);
  return {
    title: `Note: ${tag ?? "all"}`,
    description: `Note for filter on ${tag ?? "all"}`,
    openGraph: {
      title: `Note for filter on ${tag ?? "all"}`,
      description: `Note for filter on ${tag ?? "all"}`,
      url: `https://08-zustand-livid-sigma.vercel.app/notes/filter/${
        tag ?? "all"
      }`,
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
}

const NoteDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTag);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", tag],
    queryFn: () => getNotes(tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.app}>
        <NotesClient tag={tag} />
      </div>
    </HydrationBoundary>
  );
};

export default NoteDetails;
