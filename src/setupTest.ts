import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }),
})



beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());