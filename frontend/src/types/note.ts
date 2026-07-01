export type Note = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};

export type CreateNoteRequest = {
  title: string;
  body: string;
};
