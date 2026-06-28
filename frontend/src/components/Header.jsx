import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="m-4">
      <div className="underHeader flex justify-between items-center px-12">
        <div>
          <h2 className="text-4xl ">All Notes</h2>
        </div>
        <div className="rightButton border-4 rounded-lg text-white bg-black border-black py-1 px-8">
          <Link to="/notes/new" className="text-sm tracking-widest">
            + New Note
          </Link>
        </div>
      </div>
    </div>
  );
}
