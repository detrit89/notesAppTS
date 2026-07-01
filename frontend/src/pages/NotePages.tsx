import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteNote, getNoteById } from "../api/notes";

type Note = {
  title: string;
  body: string;
  createdAt: string;
};

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchNote() {
    if (id === undefined) {
      alert("Invalid note id");
      return;
    }
    try {
      const data = await getNoteById(Number(id));
      setNote(data);
    } catch {
      alert("Failed to load note");
    }
  }

  useEffect(() => {
    fetchNote();
  }, []);

  function handleBack() {
    navigate("/");
  }

  async function handleDelete() {
    if (id === undefined) {
      alert("Invalid note id");
      return;
    }
    try {
      await deleteNote(Number(id));
      navigate("/");
    } catch {
      alert("Failed to delete note");
    }
  }
  if (!note) {
    return (
      <h1 className="flex justify-center items-center h-screen text-4xl">
        Loading...
      </h1>
    );
  }
  return (
    <div className="note-page ">
      <div className="note-page__actions max-w-7xl mx-auto px-4 mt-10 flex  sm:flex-row justify-between gap-4">
        <button
          className="note-page__back-button border rounded-lg py-1 px-8 "
          onClick={handleBack}
        >
          Back to notes
        </button>
        <div className="flex gap-3">
          <Link
            className="note-page__edit-link inline-flex items-center justify-center border rounded p-3 border-gray-500"
            to={`/notes/${id}/edit`}
          >
            <Pencil size={18} />
          </Link>
          <button
            className="note-page__delete-button border rounded p-3 border-red-200  bg-red-100 text-red-500 "
            onClick={handleDelete}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="note-page__content max-w-6xl mx-auto mt-8 px-6">
        <h2 className="note-page__title text-3xl font-extrabold mb-5">
          {note.title}
        </h2>
        <p className="text-gray-300 mb-7">
          {new Date(note.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <hr className="mb-8 text-gray-300 border-0.5" />
        <p className="note-page__body text-lg">{note.body}</p>
      </div>
    </div>
  );
}
