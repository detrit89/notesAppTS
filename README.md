# Notes CLI + REST API

Simple note management application built with TypeScript and Bun. The project provides both a Command Line Interface (CLI) and a REST API for managing notes.

Простое приложение для управления заметками, написанное на TypeScript и Bun. Проект предоставляет как интерфейс командной строки (CLI), так и REST API для работы с заметками.

---

## Features

### English

- Create notes
- View all notes
- Search notes by title or content
- Edit existing notes
- Delete notes
- Access notes through CLI or REST API
- Persistent SQLite storage

### Русский

- Создание заметок
- Просмотр всех заметок
- Поиск заметок по заголовку и содержимому
- Редактирование существующих заметок
- Удаление заметок
- Работа через CLI или REST API
- Постоянное хранение данных в SQLite

---

## Technologies Used

### English

- Bun
- TypeScript
- SQLite (`bun:sqlite`)
- REST API
- CLI Applications
- ESLint
- Prettier

### Русский

- Bun
- TypeScript
- SQLite (`bun:sqlite`)
- REST API
- Консольные приложения (CLI)
- ESLint
- Prettier

---

## Installation / Установка

```bash
git clone <repository-url>

cd <repository-name>

bun install
```

---

## Running CLI / Запуск CLI

### Add a note / Добавить заметку

```bash
bun project/index.ts add "Shopping" "Buy milk"
```

### List notes / Показать все заметки

```bash
bun project/index.ts list
```

### Search notes / Поиск заметок

```bash
bun project/index.ts search "milk"
```

### Get note by ID / Получить заметку по ID

```bash
bun project/index.ts get 1
```

### Edit note / Изменить заметку

```bash
bun project/index.ts edit 1 "New title" "New body"
```

### Delete note / Удалить заметку

```bash
bun project/index.ts delete 1
```

### Show help / Показать справку

```bash
bun project/index.ts help
```

---

## Running REST API / Запуск REST API

Start the server:

Запустите сервер:

```bash
bun project/server.ts
```

The server will be available at:

Сервер будет доступен по адресу:

```text
http://localhost:3000
```

---

## API Endpoints / API Эндпоинты

### Get all notes / Получить все заметки

```http
GET /notes
```

### Search notes / Поиск заметок

```http
GET /notes?search=text
```

### Get note by ID / Получить заметку по ID

```http
GET /notes/:id
```

### Create note / Создать заметку

```http
POST /notes
```

Body:

```json
{
  "title": "Learn Bun",
  "body": "Finish REST API project"
}
```

### Update note / Обновить заметку

```http
PUT /notes/:id
```

### Delete note / Удалить заметку

```http
DELETE /notes/:id
```

---

## Project Structure / Структура проекта

```text
project/
├── commands.ts      # CLI commands
├── handlers.ts      # CLI handlers
├── index.ts         # CLI entry point
├── server.ts        # REST API server
├── storage.ts       # Database operations
├── utils.ts         # Utility functions
└── types/
    └── note.ts      # Type definitions

notes.db             # SQLite database
```

---
