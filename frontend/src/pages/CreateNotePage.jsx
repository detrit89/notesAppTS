import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Title and content are required");
      return;
    }
    const response = await fetch(
      "https://notesappts-production.up.railway.app/notes",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, body: body }),
      },
    );
    if (response.ok) {
      navigate("/");
    } else {
      alert("Failed to create note");
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <button
          className="edit-note__back-button border rounded-lg py-1 px-8 "
          onClick={handleBack}
        >
          Back to notes
        </button>
      </div>
      <form
        className="create-note max-w-3xl mx-auto mt-10 px-6"
        onSubmit={handleSubmit}
      >
        <h2 className="create-note__title text-4xl mb-5 font-extrabold">
          Create new Note
        </h2>
        <div className="create-note__field ">
          <h3 className="create-note__label mb-2 text-lg tracking-widest">
            Title
          </h3>
          <input
            className="create-note__input w-full border rounded-lg py-2 px-5"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="create-note__field">
          <h3 className="create-note__label mt-8 mb-2 text-lg tracking-widest">
            Content
          </h3>
          <textarea
            className="create-note__textarea w-full border rounded-lg py-2 px-5 resize-none h-60"
            placeholder="Write your note there..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <button
          className="create-note__button border rounded-lg py-2 px-6 text-white bg-black mt-10"
          type="submit"
        >
          Save Note
        </button>
      </form>
    </>
  );
}
