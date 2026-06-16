import { getDb } from '../db/db.ts';
import type { Note } from '../types/note.ts';

export function deleteNote(id: number): boolean {
  const db = getDb();
  const statement = db.query(`
        DELETE FROM notes
        WHERE id = ?
        `);
  const deleteResult = statement.run(id);
  if (deleteResult.changes === 0) {
    return false;
  }
  return true;
}

export function searchNotes(searchText: string) {
  const db = getDb();
  const query = `%${searchText}%`;
  const statement = db.query<Note, [string, string]>(`
        SELECT * FROM notes
        WHERE title LIKE ? OR body LIKE ?
        `);
  return statement.all(query, query);
}

export function addNote(title: string, body: string) {
  const db = getDb();
  const insertNoteStatement = db.query(`
        INSERT INTO notes (title, body, createdAt)
        VALUES (?, ?, ?)
        `);
  insertNoteStatement.run(title, body, new Date().toLocaleString());
}

export function getAllNotes(): Note[] {
  const db = getDb();
  const statement = db.query<Note, []>(`
        SELECT * FROM notes
        `);
  return statement.all();
}

export function editNote(
  id: number,
  newTitle: string,
  newBody: string,
): boolean {
  const db = getDb();
  const statement = db.query(`
        UPDATE notes
        SET title = ?,
            body = ?
        WHERE id = ?
        `);
  const editResult = statement.run(newTitle, newBody, id);
  if (editResult.changes === 0) {
    return false;
  }
  return true;
}

export function getNoteById(searchId: number): Note | null {
  const db = getDb();
  const statement = db.query<Note, [number]>(`
        SELECT * FROM notes
        WHERE id = ?
        `);
  return statement.get(searchId);
}
