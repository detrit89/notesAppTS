import { closeDb, initDb } from './db/db';

import { routes } from './routes/noteRoutes';
import { CORS } from './utils/core';

initDb();

const server = Bun.serve({
  routes,
  fetch(req) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    return new Response('Not Found', { status: 404 });
  },
});
console.log(`Server running on ${server.url}`);

process.on('SIGINT', () => {
  closeDb();
  console.log(`\n Server is closed`);
  process.exit(0);
});
