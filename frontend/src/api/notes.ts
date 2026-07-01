import { Note, NoteInput } from "../types/note";

const BASE_URL = "https://notesappts-production.up.railway.app/notes";

export async function getNotes(search?: string): Promise<Note[]> {
  let response = !search
    ? await fetch(BASE_URL)
    : await fetch(`${BASE_URL}?search=${search}`);
  const data = await response.json();
  return data;
}

export async function deleteNote(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete note: ${response.status}`);
  }
  return response;
}

export async function getNoteById(id: number): Promise<Note> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error(`Failed to create note: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function updateNote(id: number, note: NoteInput): Promise<Note> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error(`Failed to edit note: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
