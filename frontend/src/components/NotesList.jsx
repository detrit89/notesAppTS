import { useEffect, useState } from "react";
import NoteCard from "./NoteCard.jsx";

export default function NotesList({ search }) {
  const [notes, setNotes] = useState([]);
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
      <ul className=" ">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            id={note.id}
          />
        ))}
      </ul>
    </div>
  );
}
