import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, describe, it } from "vitest";
import { Login } from "@/features/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const renderProtectedRoute = (token: string | null) => render(
  <MemoryRouter initialEntries={['/protected']}>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute token={token} />}>
          <Route path="/protected" element={<div>Ruta Protegida</div>} />
        </Route>
      </Routes>

    </QueryClientProvider>
  </MemoryRouter>
)

describe('ProtectedRoute', () => {
  it('should redirect to login page if token is null', () => {
    renderProtectedRoute(null)
    const text = screen.getByText('Iniciar sesión')
    expect(text).toBeInTheDocument()
  })

  it('should render protected route if token is not null', () => {
    renderProtectedRoute('valid_token')
    const text = screen.getByText('Ruta Protegida')
    expect(text).toBeInTheDocument()
  })
})