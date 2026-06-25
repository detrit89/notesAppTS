import { CORS } from './core.ts';

export function jsonResponse(data: unknown, options: ResponseInit = {}) {
  return Response.json(data, {
    ...options,
    headers: {
      ...CORS,
      ...options.headers,
    },
  });
}
