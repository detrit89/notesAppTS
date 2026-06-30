import { useEffect, useState } from "react";
import NoteCard from "./NoteCard.js";

type NotesListProps = {
  search: string;
};

type Note = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};

export default function NotesList({ search }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  async function fetchNotes() {
    let responses;
    search === ""
      ? (responses = await fetch(
          "https://notesappts-production.up.railway.app/notes",
        ))
      : (responses = await fetch(
          `https://notesappts-production.up.railway.app/notes?search=${search}`,
        ));

    const data = await responses.json();
    setNotes(data);
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
