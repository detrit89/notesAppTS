import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../api/notes";

export default function EditNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  function handleBack() {
    navigate("/");
  }
  async function fetchNote() {
    if (id === undefined) {
      alert("Invalid note id");
      return;
    }
    try {
      const data = await getNoteById(Number(id));
      setTitle(data.title);
      setBody(data.body);
    } catch {
      alert("Failed to load note");
    }
  }

  useEffect(() => {
    fetchNote();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Title and content are required");
      return;
    }
    if (id === undefined) {
      alert("Invalid note id");
      return;
    }
    const nodeId = Number(id);
    try {
      await updateNote(nodeId, { title, body });
      navigate(`/notes/${nodeId}`);
    } catch {
      alert("Failed to edit note");
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <button
          className="edit-note__back-button border rounded-lg py-1 px-8 "
          onClick={handleBack}
        >
          Back to notes
        </button>
      </div>
      <form
        className="edit-note max-w-6xl mx-auto mt-10 px-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="edit-note__title text-4xl mb-5 font-extrabold">
            Edit Note
          </h2>
          <div className="edit-note__field">
            <h3 className="edit-note__label text-lg mb-2 tracking-widest">
              Title
            </h3>

            <input
              className="edit-note__input w-full border rounded-lg py-2 px-5"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="edit-note__field mt-8">
            <h3 className="edit-note__label mb-2 text-lg tracking-widest">
              Content
            </h3>

            <textarea
              className="edit-note__textarea w-full border rounded-lg py-2 px-5 resize-none h-60"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </div>

          <button
            className="edit-note__button border rounded-lg py-2 px-6 text-white bg-black mt-8 "
            type="submit"
          >
            Update Note
          </button>
        </div>
      </form>
    </>
  );
}
