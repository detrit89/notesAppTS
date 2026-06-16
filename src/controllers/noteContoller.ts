import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getAllNotes,
  searchNotes,
} from '../repositories/noteRepositories';
import { isNoteBody } from '../validators/note.ts';
import { parseId } from '../utils/parseId.ts';

export async function createNoteController(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
    if (!isNoteBody(body)) {
      return Response.json({ error: 'Bad Request' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'Bad Request' }, { status: 400 });
  }
  try {
    addNote(body.title, body.body);
    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function deleteNoteController(id: string) {
  try {
    const noteId = parseId(id);
    if (noteId === null) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const isDeleted = deleteNote(noteId);
    if (!isDeleted) {
      return Response.json({ message: 'Note not found' }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function editNoteController(id: string, req: Request) {
  const noteId = parseId(id);
  if (noteId === null) {
    return Response.json({ error: 'Invalid ID' }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
    if (!isNoteBody(body)) {
      return Response.json({ error: 'Bad Request' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'Bad Request' }, { status: 400 });
  }
  try {
    const isEdited = editNote(noteId, body.title, body.body);
    if (!isEdited) {
      return Response.json({ message: 'Note not found' }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function getNoteByIdController(id: string) {
  try {
    const noteId = parseId(id);
    if (noteId === null) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const note = getNoteById(noteId);

    if (!note) {
      return Response.json({ error: 'Note not found' }, { status: 404 });
    }
    return Response.json(note);
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function getNotesController(req: Request) {
  try {
    const url = new URL(req.url);
    const searchText = url.searchParams.get('search');
    if (searchText === null) {
      const notes = getAllNotes();
      return Response.json(notes);
    }
    const foundNotes = searchNotes(searchText);
    return Response.json(foundNotes);
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
