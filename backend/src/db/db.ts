import { Database } from 'bun:sqlite';

let database: Database | null = null;

export function initDb() {
  if (database) {
    return;
  }
  database = new Database('notes.db');

  database.exec(`
    CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    createdAt TEXT NOT NULL
    )
`);
}

export function getDb(): Database {
  if (!database) {
    throw new Error('Database is not initialized');
  }

  return database;
}

export function closeDb() {
  if (database) {
    database.close();
    database = null;
  }
}
