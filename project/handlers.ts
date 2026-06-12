import { addNote, getAllNotes, searchNotes, deleteNote, editNote, getNoteById} from './storage.ts';
import type { Note } from './types/note.ts';

export function formatNote(note: Note): string {
    return `${note.id} - ${note.title} - ${note.body} - ${note.createdAt}`
}

export function handleSearchNotes(searchText: string): void {
    const foundNotes = searchNotes(searchText)
    if(foundNotes.length === 0) {
        console.log("No notes found")
        return
    }
    foundNotes.forEach((item) => {
        console.log(formatNote(item))
    })
}

export function handleDeleteNote(id: number) {
    const isDeleted = deleteNote(id)
    if (!isDeleted) {
        console.log(`Note not found`)
        return
    }
    console.log("Note deleted")
}

export function handleAddNote(title: string, body: string) {
    addNote(title, body)
    console.log("New note added")
}

export function handleListNotes() {
    const notes = getAllNotes()
    if (notes.length === 0) {
        console.log(`Notes not found`)
        return
    }
    notes.forEach((item) => {
        console.log(formatNote(item))
    })
}

export function handleEditNote(id: number, title: string, body: string) {
    const isEdited = editNote(id, title, body)
    if (!isEdited) {
        console.log("Note not found")
        return
    }
    console.log("Note edited")
}

export function handleGetNoteById(search: number): void {
    const foundNote = getNoteById(search)
    if (!foundNote) {
        console.log("Note not found")
        return
    }
    console.log(formatNote(foundNote))
}


export function helpCommand() {
    console.log(`Available commands:
    
    bun project/index.ts add <title> <body>        -> add new note
    bun project/index.ts list                      -> show all notes
    bun project/index.ts search <text>             -> search notes
    bun project/index.ts delete <id>               -> delete note
    bun project/index.ts help                      -> show help    
    bun project/index.ts edit <id> <title> <body>  -> edit note   
    bun project/index.ts get <id>                  -> show note by id
    `)
}