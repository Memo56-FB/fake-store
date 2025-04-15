import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "@/features/products/Home";
import '@testing-library/jest-dom'
import { describe, expect, it, Mock, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { getAllProducts } from "../productsServices";

const queryClient = new QueryClient()

vi.mock('../productsServices', () => ({
  getAllProducts: vi.fn()
}))

const mockGetAllProducts = getAllProducts as Mock

const mockProuducts = [
  { id: 1, title: 'Producto 2', category: 'Electrónica', description: 'Descripción del producto 1', price: 100, rating: { rate: 4.5, count: 100} }
]

const renderHome = () =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </MemoryRouter>
  )


describe('<Home />', () => {
  it('should render products', async () => {
    mockGetAllProducts.mockResolvedValue(mockProuducts)
    renderHome()
    expect(screen.getAllByText('Loading')).toHaveLength(5)
    await waitFor(() => {
      const product = screen.getByText('Producto 2')
      expect(product).toBeInTheDocument()
    })
  })

})