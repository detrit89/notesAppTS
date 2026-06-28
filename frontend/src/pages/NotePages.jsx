import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function NotePage() {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchNote() {
    const response = await fetch(
      `https://notesappts-production.up.railway.app/notes/${id}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    setNote(data);
  }

  useEffect(() => {
    fetchNote();
  }, []);

  function handleBack() {
    navigate("/");
  }

  async function handleDelete() {
    const response = await fetch(
      `https://notesappts-production.up.railway.app/notes/${id}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      navigate("/");
    } else {
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
      <div className="note-page__actions flex justify-between mx-30 mt-10">
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
      <div className="note-page__content max-w-6xl mx-auto mt-8">
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
