import { Database } from 'bun:sqlite';
import type { Note } from './types/note.ts';

const database = new Database('notes.db');

database.exec(`
    CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT TEXT NOT NULL,
    body TEXT TEXT NOT NULL,
    createdAt TEXT NOT NULL
    )
`);

export function deleteNote(id: number): boolean {
  const statement = database.query(`
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
  const query = `%${searchText}%`;
  const statement = database.query<Note, [string, string]>(`
        SELECT * FROM notes
        WHERE title LIKE ? OR body LIKE ?
        `);
  return statement.all(query, query);
}

export function addNote(title: string, body: string) {
  const insertNoteStatement = database.query(`
        INSERT INTO notes (title, body, createdAt)
        VALUES (?, ?, ?)
        `);
  insertNoteStatement.run(title, body, new Date().toLocaleString());
}

export function getAllNotes(): Note[] {
  const statement = database.query<Note, []>(`
        SELECT * FROM notes
        `);
  return statement.all();
}

export function editNote(
  id: number,
  newTitle: string,
  newBody: string,
): boolean {
  const statement = database.query(`
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
  const statement = database.query<Note, [number]>(`
        SELECT * FROM notes
        WHERE id = ?
        `);
  return statement.get(searchId);
}
