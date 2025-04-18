import { vi, afterAll, afterEach, beforeAll } from "vitest";
import { server } from './mocks/server' 
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }),
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())