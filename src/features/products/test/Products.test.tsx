import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Home } from "@/features/products/Home";
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

const queryClient = new QueryClient()

const renderHome = () =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </MemoryRouter>
  )


describe('<Home />', () => {
  beforeEach(renderHome)

  
  it('should render a loader when the products are loading', () => {
    expect(screen.getAllByText('Loading')).toHaveLength(5)
  })


  it('should render products', async () => {
    const loaders = screen.getAllByText('Loading')
    await waitForElementToBeRemoved(loaders)
    const message = await screen.getByText('Producto 1')
    expect(message).toBeInTheDocument()
  })
})