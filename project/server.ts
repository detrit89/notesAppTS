import {
  getAllNotes,
  addNote,
  deleteNote,
  editNote,
  searchNotes,
  getNoteById,
} from './storage.ts';
import type { NoteBody } from './types/note.ts';
import { parseId } from './utils.ts';

const server = Bun.serve({
  routes: {
    '/notes': {
      GET: (req) => {
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
          return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
          );
        }
      },
      POST: async (req) => {
        let body: NoteBody;
        try {
          body = (await req.json()) as NoteBody;
        } catch {
          return Response.json({ error: 'Bad Request' }, { status: 400 });
        }
        if (!body.title || !body.body) {
          return Response.json({ error: 'Bad Request' }, { status: 400 });
        }
        try {
          addNote(body.title, body.body);
          return Response.json({ success: true }, { status: 201 });
        } catch {
          return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
          );
        }
      },
    },

    '/notes/:id': {
      DELETE: (req) => {
        try {
          const id = parseId(req.params.id);
          if (id === null) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 });
          }
          const isDeleted = deleteNote(id);
          if (!isDeleted) {
            return Response.json(
              { message: 'Note not found' },
              { status: 404 },
            );
          }
          return Response.json({ success: true });
        } catch {
          return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
          );
        }
      },
      PUT: async (req) => {
        let body: NoteBody;
        try {
          body = (await req.json()) as NoteBody;
        } catch {
          return Response.json({ error: 'Bad Request' }, { status: 400 });
        }
        if (!body.title || !body.body) {
          return Response.json({ error: 'Bad Request' }, { status: 400 });
        }
        try {
          const id = parseId(req.params.id);
          if (id === null) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 });
          }
          const isEdited = editNote(id, body.title, body.body);
          if (!isEdited) {
            return Response.json(
              { message: 'Note not found' },
              { status: 404 },
            );
          }
          return Response.json({ success: true });
        } catch {
          return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
          );
        }
      },
      GET: (req) => {
        const id = parseId(req.params.id);
        if (id === null) {
          return Response.json({ error: 'Invalid ID' }, { status: 400 });
        }
        const note = getNoteById(id);

        if (!note) {
          return Response.json({ error: 'Note not found' }, { status: 404 });
        }
        return Response.json(note);
      },
    },
  },
  fetch(req) {
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running on ${server.url}`);
