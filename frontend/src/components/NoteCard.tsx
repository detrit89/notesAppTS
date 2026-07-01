import { Link, useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import { deleteNote } from "../api/notes";

type NoteCardProps = {
  title: string;
  body: string;
  createdAt: string;
  id: number;
  onDelete: (id: number) => void;
};

export default function NoteCard({
  title,
  body,
  createdAt,
  id,
  onDelete,
}: NoteCardProps) {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      await deleteNote(id);
      onDelete(id);
      navigate("/");
    } catch {
      alert("Failed to delete note");
    }
  }
  return (
    <div>
      <li className="border rounded-lg px-5 py-4 mb-4 flex flex-col sm:flex-row gap-4">
        <Link to={`/notes/${id}`} className="flex-1 min-w-0">
          <h2 className="text-3xl font-extrabold break-all">{title}</h2>
          <p className="text-lg ">{body}</p>
        </Link>
        <div className="flex flex-col justify-between self-stretch mt-2">
          <p>
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <div className="flex gap-3 ml-auto">
            <button
              className="note-page__delete-button border rounded border-red-200 p-3 bg-red-100 text-red-500  "
              onClick={handleDelete}
            >
              <Trash2 size={18} />
            </button>
            <Link
              className="note-page__edit-link border rounded p-3 border-gray-500"
              to={`/notes/${id}/edit`}
            >
              <Pencil size={18} />
            </Link>
          </div>
        </div>
      </li>
    </div>
  );
}
