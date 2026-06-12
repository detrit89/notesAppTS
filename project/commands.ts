import {handleAddNote, handleDeleteNote, handleListNotes, handleSearchNotes, helpCommand, handleEditNote, handleGetNoteById} from './handlers.ts'

function parseId(id: string): number | null {
        const noteId = Number(id)
        if (!Number.isInteger(noteId) || noteId <= 0) {
            return null
        }
        return noteId
    }

export function runCommand(command?: string, arg1?: string, arg2?: string, arg3?: string) {
    if (!command) {
        helpCommand()
        return
    }
    switch (command) {
        case "add": {
            const title = arg1
            const body = arg2
            if (!title) {
                console.log("Write note title")
                return
            }
            if (!body) {
                console.log("Write note text")
                return
            }
            handleAddNote(title, body)
            break
        }
        case "list": {
            handleListNotes()
            break
        }
        case "search": {
            const searchText = arg1
            if (!searchText) {
                console.log("Write search text")
                return
            }
            handleSearchNotes(searchText)
            break
        }
        case "delete": {
            const id = arg1
            if (!id) {
                console.log("Write note id")
                return
            }
            const noteId = parseId(id)
            if (noteId === null) {
                console.log("Invalid note id")
                return
            }
            handleDeleteNote(noteId)
            break
        }
        case "help": {
            helpCommand()
            break
        }
        case "edit": {
            const id = arg1
            const title = arg2
            const body = arg3
            if (!id) {
                console.log("Write note id")
                return
            }
            if (!title) {
                console.log("Write note title")
                return
            }
            if (!body) {
                console.log("Write note body")
                return
            }
            const noteId = parseId(id)
            if (noteId === null) {
                console.log("Invalid note id")
                return
            }
            handleEditNote(noteId, title, body)
            break
        }
        case "get": {
            const id = arg1
            if (!id) {
                console.log("Write note id")
                return
            }
            const noteId = parseId(id)
            if (noteId === null) {
                console.log("Invalid note id")
                return
            }
            handleGetNoteById(noteId)
            break
        }
        default:
            console.log("Unknown command")   
            helpCommand()
            break
    }
}