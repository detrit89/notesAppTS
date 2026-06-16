# Notes API

A simple REST API for managing notes built with **Bun**, **TypeScript**, and **SQLite**.

This project was created to practice backend development fundamentals, including API design, project structure, database integration, and TypeScript type safety.

## Features

- Create notes
- Get all notes
- Search notes by text
- Get a note by ID
- Update notes
- Delete notes
- SQLite database integration
- Input validation using TypeScript type guards
- Graceful database shutdown

## Tech Stack

- Bun
- TypeScript
- SQLite (`bun:sqlite`)

## Project Structure

```text
src/
├── server.ts
├── db/
│   └── db.ts
├── routes/
│   └── noteRoutes.ts
├── controllers/
│   └── noteController.ts
├── repositories/
│   └── noteRepository.ts
├── validators/
│   └── note.ts
├── utils/
│   └── parseId.ts
└── types/
    └── note.ts
```

## API Endpoints

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| GET    | `/notes`             | Get all notes  |
| GET    | `/notes?search=text` | Search notes   |
| GET    | `/notes/:id`         | Get note by ID |
| POST   | `/notes`             | Create a note  |
| PUT    | `/notes/:id`         | Update a note  |
| DELETE | `/notes/:id`         | Delete a note  |

## Getting Started

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun run dev
```

### Run type checking

```bash
bun run typecheck
```

The server will be available at:

```text
http://localhost:3000
```

## Architecture

The project follows a layered architecture:

```text
Routes
↓
Controllers
↓
Repositories
↓
SQLite Database
```

### Responsibilities

- **Routes** – map HTTP endpoints to controllers
- **Controllers** – handle HTTP requests and responses
- **Repositories** – perform database operations
- **Database Layer** – manage SQLite initialization and connections

## Learning Goals

This project focuses on:

- REST API design principles
- TypeScript type safety
- Separation of concerns
- SQLite integration
- Backend project structure
- Error handling and HTTP status codes
- Graceful application shutdown
