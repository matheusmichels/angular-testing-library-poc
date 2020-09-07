import { setupServer } from 'msw/node';

import { userHandlers } from './user';

export const server = setupServer(
  ...userHandlers,
);
