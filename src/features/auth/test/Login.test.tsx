import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Login } from "../Login";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()

describe('<Login />', () => {
  render(<MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  </MemoryRouter>)

  it('should render login', () => {
    expect(screen.getByText('Acceder'))
  })

});
