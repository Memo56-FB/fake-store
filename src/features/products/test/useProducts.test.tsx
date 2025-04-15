import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import useProducts from "../hooks/useProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as productServices from '../productsServices'
import { useFilterProductsStore, useProductsStore } from "../productsStore";

const mockProuducts = [
  {
    id: 1, title: 'Producto 1', image: 'image', category: 'category1', description: 'Descripción del producto 1', price: 110, rating: { rate: 2.5, count: 100 }
  },
  {
    id: 2, title: 'Producto 2', image: 'image', category: 'category2', description: 'Descripción del producto 1', price: 120, rating: { rate: 4.5, count: 100 }
  },
  {
    id: 4, title: 'Producto 2', image: 'image', category: 'category1', description: 'Descripción del producto 1', price: 340, rating: { rate: 1.5, count: 100 }
  },
  {
    id: 3, title: 'Producto 2', image: 'image', category: 'category1', description: 'Descripción del producto 1', price: 240, rating: { rate: 3.5, count: 100 }
  },
]

const initialFilterStoreState = {
  selectedCategories: [],
  priceSort: "none",
  priceRange: [0, 1000],
  ratingFilter: 0,
}



describe('useProducts', () => {
  let queryClient: QueryClient
  let getAllProductsSpy: MockInstance

  beforeEach(async () => {
    getAllProductsSpy = vi.spyOn(productServices, 'getAllProducts')
    queryClient = new QueryClient()
    vi.clearAllMocks()
    await waitFor(() => {
      useFilterProductsStore.setState(initialFilterStoreState)
      useProductsStore.setState({ filteredProducts: [], products: [] })
    })
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    await waitFor(() => useFilterProductsStore.setState({ selectedCategories: [] }))
    queryClient.clear()
  })


  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  const setupUseProducts = async () => {
    getAllProductsSpy.mockResolvedValue(mockProuducts)
    const { result } = renderHook(() => useProducts(), { wrapper })
    expect(result.current.isLoading).toBe(true)
    expect(result.current.filteredProducts).toEqual([])

    await waitFor(() => result.current.isLoading)

    expect(result.current.isLoading).toBe(false)

    expect(result.current.filteredProducts).toEqual(mockProuducts)
    expect(result.current.selectedCategories).toEqual([])

    return result
  }

  it('should return products', async () => {
    await setupUseProducts()
  })
  
  it('should return an empty array if no products', async () => {
    const result = await setupUseProducts()
    await waitFor(() => useProductsStore.setState({ products: undefined }))
    expect(result.current.filteredProducts).toEqual([])
  })

  it('should filtered products by category', async () => {
    const result = await setupUseProducts()

    await waitFor(() => useFilterProductsStore.setState({ selectedCategories: ['category1'] }))

    const selectedCategories = useFilterProductsStore.getState().selectedCategories
    const filteredProducts = mockProuducts.filter((product) => selectedCategories.includes(product.category))

    expect(result.current.filteredProducts).toEqual(filteredProducts)
  })

  it('should filtered products by many categories', async () => {
    const result = await setupUseProducts()

    await waitFor(() => useFilterProductsStore.setState({ selectedCategories: ['category1', 'category2'] }))

    const selectedCategories = useFilterProductsStore.getState().selectedCategories
    const filteredProducts = mockProuducts.filter((product) => selectedCategories.includes(product.category))

    expect(result.current.filteredProducts).toEqual(filteredProducts)
  })

  it('should filtered products by price range', async () => {
    const result = await setupUseProducts()

    await waitFor(() => useFilterProductsStore.setState({ priceRange: [100, 200] }))

    const selectedRagenPrice = useFilterProductsStore.getState().priceRange
    const filteredProductsByPrice = mockProuducts.filter((product) => product.price >= selectedRagenPrice[0] && product.price <= selectedRagenPrice[1])

    expect(result.current.filteredProducts).toEqual(filteredProductsByPrice)

  })

  it('should filtered products by rating', async () => {
    const result = await setupUseProducts()

    await waitFor(() => useFilterProductsStore.setState({ ratingFilter: 4 }))

    const selectedRating = useFilterProductsStore.getState().ratingFilter
    const filteredProductsByRating = mockProuducts.filter((product) => product.rating.rate >= selectedRating)

    expect(result.current.filteredProducts).toEqual(filteredProductsByRating)
  })

  it('should order products in asc order', async () => {
    const result = await setupUseProducts()

    await waitFor(() => useFilterProductsStore.setState({ priceSort: 'asc' }))

    const sortedProductsAsc = [...mockProuducts].sort((a, b) => a.price - b.price)

    await waitFor(() => expect(result.current.filteredProducts).toEqual(sortedProductsAsc))
  })

  it('should order products in desc order', async () => {
    const result = await setupUseProducts()
    
    await waitFor(() => useFilterProductsStore.setState({ priceSort: 'desc'}))

    const sortedProductsDesc = [...mockProuducts].sort((a, b) => b.price - a.price)

    await waitFor(() => expect(result.current.filteredProducts).toEqual(sortedProductsDesc))

  })

})