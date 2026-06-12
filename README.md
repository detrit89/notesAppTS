# Notes CLI

A simple command-line notes application built with **Bun**, **TypeScript**, and **SQLite**.

This project was created to practice backend fundamentals, including TypeScript, SQLite integration, project structure, input validation, and CRUD operations.

## Features

- Add new notes
- List all notes
- Search notes by text
- Get a note by ID
- Edit existing notes
- Delete notes
- SQLite persistence
- Input validation and error handling

## Tech Stack

- **Bun** – JavaScript runtime
- **TypeScript** – Static typing
- **SQLite** – Embedded database (`bun:sqlite`)

## Project Structure

```txt
project/
├── types/
│   └── note.ts        # Note type definition
├── commands.ts        # CLI command handling
├── handlers.ts        # Business logic and output formatting
├── index.ts           # Application entry point
└── storage.ts         # Database operations

package.json
tsconfig.json
README.md
.gitignore
bun.lock
notes.db
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd notes-cli
```

Install dependencies:

```bash
bun install
```

## Running the Application

All commands are executed using:

```bash
bun project/index.ts <command>
```

## Available Commands

### Add a note

```bash
bun project/index.ts add "<title>" "<body>"
```

Example:

```bash
bun project/index.ts add "Buy groceries" "Milk, eggs and bread"
```

Output:

```txt
New note added
```

---

### List all notes

```bash
bun project/index.ts list
```

Example output:

```txt
1 - Buy groceries - Milk, eggs and bread - 6/12/2026, 2:34:28 PM
2 - Learn TypeScript - Practice generics - 6/12/2026, 2:35:12 PM
```

---

### Search notes

```bash
bun project/index.ts search "<text>"
```

Example:

```bash
bun project/index.ts search "groceries"
```

Output:

```txt
1 - Buy groceries - Milk, eggs and bread - 6/12/2026, 2:34:28 PM
```

If no notes are found:

```txt
No notes found
```

---

### Get a note by ID

```bash
bun project/index.ts get <id>
```

Example:

```bash
bun project/index.ts get 1
```

Output:

```txt
1 - Buy groceries - Milk, eggs and bread - 6/12/2026, 2:34:28 PM
```

If the note does not exist:

```txt
Note not found
```

---

### Edit a note

```bash
bun project/index.ts edit <id> "<title>" "<body>"
```

Example:

```bash
bun project/index.ts edit 1 "Buy groceries" "Milk, eggs, bread and juice"
```

Output:

```txt
Note edited
```

If the note does not exist:

```txt
Note not found
```

---

### Delete a note

```bash
bun project/index.ts delete <id>
```

Example:

```bash
bun project/index.ts delete 1
```

Output:

```txt
Note deleted
```

If the note does not exist:

```txt
Note not found
```

---

### Show help

```bash
bun project/index.ts help
```

Output:

```txt
Available commands:

bun project/index.ts add <title> <body>       -> add new note
bun project/index.ts list                     -> show all notes
bun project/index.ts search <text>            -> search notes
bun project/index.ts delete <id>              -> delete note
bun project/index.ts help                     -> show help
bun project/index.ts edit <id> <title> <body> -> edit note
bun project/index.ts get <id>                 -> show note by id
```

## Database

The SQLite database file (`notes.db`) is created automatically when the application starts.

No additional setup is required.

## Input Validation

The application validates:

- Missing command arguments
- Invalid note IDs
- Negative IDs
- Zero IDs
- Non-integer IDs
- Operations on non-existent notes

Examples:

```bash
bun project/index.ts delete abc
```

Output:

```txt
Invalid note id
```

```bash
bun project/index.ts get 999
```

Output:

```txt
Note not found
```

## Learning Goals

This project was built to practice:

- TypeScript fundamentals
- CLI application development
- SQLite integration with Bun
- CRUD operations
- Input validation
- Error handling
- Project organization and separation of concerns
