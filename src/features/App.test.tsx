import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

const queryClient = new QueryClient()

const renderApp = (route: string) => render(
  <MemoryRouter initialEntries={[route]}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>\
  </MemoryRouter>
)


describe('App', () => {

  it('should render Register Page', () => { 
    renderApp('/register')
    const text = screen.getByText('Acceder')
    expect(text).toBeInTheDocument()
  })

  it('should render Login Page', () => { 
    renderApp('/login')
    const text = screen.getByText('Iniciar sesión')
    expect(text).toBeInTheDocument()
  })

  it('should NOT let user without token access to protected routes', () => { 
    renderApp('/')
    const text = screen.queryByText('Lo último en moda')
    expect(text).toBeNull()
  })

  it('should render 404 page', () => {
    renderApp('/page-that-does-not-exist')
    const text = screen.getByText('Página no encontrada')
    expect(text).toBeInTheDocument()
  })
})