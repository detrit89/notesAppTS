import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NotesList from "../components/NotesList.jsx";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 mt-8">
        <h1 className="tracking-widest text-2xl">NOTES</h1>
      </div>

      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <NotesList search={search} />
    </div>
  );
}
