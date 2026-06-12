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
  const statement = database.prepare(`
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
  const statement = database.prepare(`
        SELECT * FROM notes
        WHERE title LIKE ? OR body LIKE ?
        `);
  return statement.all(query, query) as Note[];
}

export function addNote(title: string, body: string) {
  const insertNoteStatement = database.prepare(`
        INSERT INTO notes (title, body, createdAt)
        VALUES (?, ?, ?)
        `);
  insertNoteStatement.run(title, body, new Date().toLocaleString());
}

export function getAllNotes() {
  const statement = database.prepare(`
        SELECT * FROM notes
        `);
  return statement.all() as Note[];
}

export function editNote(
  id: number | string,
  newTitle: string,
  newBody: string,
): boolean {
  const statement = database.prepare(`
        UPDATE notes
        SET title = ?,
            body = ?
        WHERE id = ?
        `);
  const editResult = statement.run(newTitle, newBody, Number(id));
  if (editResult.changes === 0) {
    return false;
  }
  return true;
}

export function getNoteById(searchId: number): Note | undefined {
  const statement = database.prepare(`
        SELECT * FROM notes
        WHERE id = ?
        `);
  return statement.get(searchId) as Note | undefined;
}
