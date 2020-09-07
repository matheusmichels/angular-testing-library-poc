import '@testing-library/jest-dom';
import 'jest-preset-angular';

import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
