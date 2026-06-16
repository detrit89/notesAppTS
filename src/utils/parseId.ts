export function parseId(id: string): number | null {
  const noteId = Number(id);
  if (!Number.isInteger(noteId) || noteId <= 0) {
    return null;
  }
  return noteId;
}
