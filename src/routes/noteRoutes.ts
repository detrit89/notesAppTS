import {
  getNotesController,
  deleteNoteController,
  editNoteController,
  getNoteByIdController,
  createNoteController,
} from '../controllers/noteContoller';

export const routes = {
  '/notes': {
    GET: (req: Request) => getNotesController(req),
    POST: (req: Request) => createNoteController(req),
  },
  '/notes/:id': {
    DELETE: (req: any) => deleteNoteController(req.params.id),
    PUT: (req: any) => editNoteController(req.params.id, req),
    GET: (req: any) => getNoteByIdController(req.params.id),
  },
};
