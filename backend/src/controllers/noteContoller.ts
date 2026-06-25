import {
  addNote,
  deleteNote,
  editNote,
  getNoteById,
  getAllNotes,
  searchNotes,
} from '../repositories/noteRepositories.ts';
import { isNoteBody } from '../validators/note.ts';
import { parseId } from '../utils/parseId.ts';
import { jsonResponse } from '../utils/response.ts';

export async function createNoteController(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
    if (!isNoteBody(body)) {
      return jsonResponse({ error: 'Bad Request' }, { status: 400 });
    }
  } catch {
    return jsonResponse({ error: 'Bad Request' }, { status: 400 });
  }
  try {
    addNote(body.title, body.body);
    return jsonResponse({ success: true }, { status: 201 });
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function deleteNoteController(id: string) {
  try {
    const noteId = parseId(id);
    if (noteId === null) {
      return jsonResponse({ error: 'Invalid ID' }, { status: 400 });
    }
    const isDeleted = deleteNote(noteId);
    if (!isDeleted) {
      return jsonResponse({ message: 'Note not found' }, { status: 404 });
    }
    return jsonResponse({ success: true });
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function editNoteController(id: string, req: Request) {
  const noteId = parseId(id);
  if (noteId === null) {
    return jsonResponse({ error: 'Invalid ID' }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
    if (!isNoteBody(body)) {
      return jsonResponse({ error: 'Bad Request' }, { status: 400 });
    }
  } catch {
    return jsonResponse({ error: 'Bad Request' }, { status: 400 });
  }
  try {
    const isEdited = editNote(noteId, body.title, body.body);
    if (!isEdited) {
      return jsonResponse({ message: 'Note not found' }, { status: 404 });
    }
    return jsonResponse({ success: true });
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function getNoteByIdController(id: string) {
  try {
    const noteId = parseId(id);
    if (noteId === null) {
      return jsonResponse({ error: 'Invalid ID' }, { status: 400 });
    }
    const note = getNoteById(noteId);

    if (!note) {
      return jsonResponse({ error: 'Note not found' }, { status: 404 });
    }
    return jsonResponse(note);
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function getNotesController(req: Request) {
  try {
    const url = new URL(req.url);
    const searchText = url.searchParams.get('search');
    if (searchText === null) {
      const notes = getAllNotes();
      return jsonResponse(notes);
    }
    const foundNotes = searchNotes(searchText);
    return jsonResponse(foundNotes);
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}
