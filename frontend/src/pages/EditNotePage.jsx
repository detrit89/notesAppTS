import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  function handleBack() {
    navigate("/");
  }
  async function fetchNote() {
    const response = await fetch(
      `https://notesappts-production.up.railway.app/notes/${id}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    setTitle(data.title);
    setBody(data.body);
  }

  useEffect(() => {
    fetchNote();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      `https://notesappts-production.up.railway.app/notes/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, body: body }),
      },
    );
    if (response.ok) {
      navigate(`/notes/${id}`);
    } else {
      alert("Failed to edit note");
    }
  }

  return (
    <>
      <button
        className="edit-note__back-button border rounded-lg py-1 px-8 mx-30 mt-10"
        onClick={handleBack}
      >
        Back to notes
      </button>
      <form
        className="edit-note max-w-6xl mx-auto mt-10 "
        onSubmit={handleSubmit}
      >
        <div className="mx-55">
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
