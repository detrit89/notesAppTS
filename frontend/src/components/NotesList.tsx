import { useEffect, useState } from "react";
import NoteCard from "./NoteCard.js";
import { Note } from "../types/note.js";
import { getNotes } from "../api/notes.js";

type NotesListProps = {
  search: string;
};

export default function NotesList({ search }: NotesListProps) {
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

  return (
    <div className="w-4xl m-auto">
      <ul>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            id={note.id}
            onDelete={(id) =>
              setNotes((prev) => prev.filter((note) => note.id !== id))
            }
          />
        ))}
      </ul>
    </div>
  );
}
