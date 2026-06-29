import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="underHeader flex  max-w-6xl mx-auto px-4 py-4 justify-between items-center sm:items-center gap-4">
      <div>
        <h2 className="text-4xl sm:text-3xl">All Notes</h2>
      </div>
      <div className="rightButton border-4 rounded-lg text-white bg-black border-black py-1 px-3 sm:px-8 sm:py-1 sm:tex">
        <Link to="/notes/new" className="text-sm tracking-widest">
          + New Note
        </Link>
      </div>
    </div>
  );
}
