import useNotes from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";

type NotesListProps = {
  search: string;
};

export default function NotesList({ search }: NotesListProps) {
  const { notes, removeNote } = useNotes(search);

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
            onDelete={removeNote}
          />
        ))}
      </ul>
    </div>
  );
}
