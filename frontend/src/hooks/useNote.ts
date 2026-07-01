import { useState, useEffect } from "react";
import { getNoteById } from "../api/notes";
import { Note } from "../types/note";

export default function useNote(id: number) {
  const [note, setNote] = useState<Note | null>(null);

  async function fetchNote() {
    try {
      const data = await getNoteById(id);
      setNote(data);
    } catch {
      alert("Failed to load note");
    }
  }

  useEffect(() => {
    fetchNote();
  }, [id]);

  return { note };
}
