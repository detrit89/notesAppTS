import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import HomePages from "./pages/HomePages.jsx";
import NotePage from "./pages/NotePages.jsx";
import CreateNotePage from "./pages/CreateNotePage.jsx";
import EditNotePage from "./pages/EditNotePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/notes/new" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/notes/:id/edit" element={<EditNotePage />} />
      </Routes>
    </>
  );
}

export default App;
