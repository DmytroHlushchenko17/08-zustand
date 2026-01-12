"use client";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return (
    <div>
      <ErrorMessage />
      <p>Could not fetch the list of notes.{error.message}</p>
    </div>
  );
}
