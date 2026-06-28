import { Link } from "react-router-dom";

export default function NoteCard({ title, body, createdAt, id }) {
  return (
    <li className="border rounded-lg px-5 py-4 mb-4">
      <Link to={`/notes/${id}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold">{title}</h2>
            <p className="text-lg">{body}</p>
          </div>
          <div>
            <p>
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
