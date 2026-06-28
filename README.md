# Notes App

A full-stack note-taking application built with **React**, **Bun**, **TypeScript**, and **SQLite**.

The project was created to practice modern full-stack development, including REST API design, React application architecture, database integration, and responsive UI development.

## Live Demo

Application: https://notes-axs0f7sa7-detrits-projects.vercel.app/

Backend API: https://notesappts-production.up.railway.app/

## Features

### Frontend

- View all notes
- Search notes by title or content
- Create new notes
- Edit existing notes
- Delete notes
- View note details
- Responsive user interface
- Client-side routing with React Router

### Backend

- REST API for note management
- SQLite database integration
- Input validation
- Type-safe backend with TypeScript
- Graceful database shutdown

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Vite
- JavaScript / JSX

### Backend

- Bun
- TypeScript
- SQLite (`bun:sqlite`)

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
backend/
├── src/
│   ├── server.ts
│   ├── db/
│   ├── routes/
│   ├── controllers/
│   ├── repositories/
│   ├── validators/
│   ├── utils/
│   └── types/
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

### Clone the repository

```bash
git clone <repository-url>
cd notes-app
```

## Backend Setup

```bash
cd backend

bun install

bun run dev
```

Backend runs on:

```text
http://localhost:3000
```

## Frontend Setup

```bash
cd frontend

bun install

bun run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Architecture

The backend follows a layered architecture:

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

- **Routes** — map HTTP endpoints to controllers
- **Controllers** — handle HTTP requests and responses
- **Repositories** — perform database operations
- **Database Layer** — manage SQLite initialization and connections

## Learning Goals

This project focuses on:

- Full-stack application development
- REST API design principles
- React component architecture
- TypeScript type safety
- Separation of concerns
- SQLite integration
- Client-server communication
- Error handling and HTTP status codes
- Responsive UI development
- Modern project structure

## Author

Created by Detrit as a learning project while studying full-stack development.
