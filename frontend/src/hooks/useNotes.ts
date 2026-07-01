import { useEffect, useState } from "react";
import { Note } from "../types/note";
import { getNotes } from "../api/notes";

type NotesListProps = {
  search: string;
};

export default function useNotes(search: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  async function fetchNotes() {
    try {
      const data = await getNotes(search);
      setNotes(data);
    } catch {
      alert("Failed to load notes");
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [search]);

  function removeNote(id: number) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }
  return { notes, removeNote };
}
