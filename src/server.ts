import { closeDb, initDb } from './db/db';

import { routes } from './routes/noteRoutes';

initDb();

const server = Bun.serve({
  routes,
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});
console.log(`Server running on ${server.url}`);

process.on('SIGINT', () => {
  closeDb();
  console.log(`\n Server is closed`);
  process.exit(0);
});
