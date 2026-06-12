import type { NoteBody } from '../types/note.ts';

export function isNoteBody(body: unknown): body is NoteBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'title' in body &&
    'body' in body &&
    typeof body.title === 'string' &&
    typeof body.body === 'string'
  );
}
