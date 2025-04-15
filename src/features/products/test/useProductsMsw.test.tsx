import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useProducts from "../hooks/useProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFilterProductsStore, useProductsStore } from "../productsStore";
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'



const initialFilterStoreState = {
  selectedCategories: [],
  priceSort: "none",
  priceRange: [0, 1000],
  ratingFilter: 0,
}



describe('useProducts', () => {
  let queryClient: QueryClient

  beforeEach(async () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    })
    vi.clearAllMocks()
    await waitFor(() => {
      useFilterProductsStore.setState(initialFilterStoreState)
      useProductsStore.setState({ filteredProducts: [], products: [] })
    })
  })

  afterEach(async () => {
    await waitFor(() => useFilterProductsStore.setState({ selectedCategories: [] }))
    queryClient.clear()
  })


  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  const setupUseProducts = async () => {
    const { result } = renderHook(() => useProducts(), { wrapper })
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    return result
  }

  it('should get product data with msw', async () => {
    const result = await setupUseProducts()
    const lengthProducts = result.current.filteredProducts.length
    expect(lengthProducts).toBe(1)
  })

  it('should get an Error 500', async () => {
    server.use(
      http.get('https://fakestoreapi.com/products', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error'
        }) 
      })
    )
    const result = await setupUseProducts()
    expect(result.current.error).toBeTruthy()

  })
})