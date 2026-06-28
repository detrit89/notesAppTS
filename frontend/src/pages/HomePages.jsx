import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NotesList from "../components/NotesList.jsx";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="mt-8 ml-15">
        <h1 className="tracking-widest">NOTES</h1>
      </div>
      <div className="home-page max-w-5xl mx-auto">
        <Header />
        <SearchBar search={search} setSearch={setSearch} />
        <NotesList search={search} />
      </div>
    </div>
  );
}
