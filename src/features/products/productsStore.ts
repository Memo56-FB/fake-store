import { ProductType } from "@/types/productsType";
import { create } from "zustand";

interface ProductState {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
  filteredProducts: ProductType[]
  setFilteredProducts: (products: ProductType[]) => void
}

export const useProductsStore = create<ProductState>(set => ({
  products: [],
  setProducts: (products: ProductType[]) => set({ products }),
  filteredProducts: [],
  setFilteredProducts: (products: ProductType[]) => set({ filteredProducts: products }),
}))

interface FilterProductsState {
  selectedCategories: string[]
  handleCategoryChange: (category: string) => void
  priceSort: string
  setPriceSort: (sort: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  ratingFilter: number
  setRatingFilter: (rating: number) => void
}

export const useFilterProductsStore = create<FilterProductsState>(set => ({
  selectedCategories: [],
  handleCategoryChange: (category: string) => set((state) => ({
    selectedCategories: state.selectedCategories.includes(category)
      ? state.selectedCategories.filter((c) => c !== category)
      : [...state.selectedCategories, category],
  })),
  priceSort: "none",
  setPriceSort: (sort: string) => set({ priceSort: sort }),
  priceRange: [0, 1000],
  setPriceRange: (range: [number, number]) => set({ priceRange: range }),
  ratingFilter: 0,
  setRatingFilter: (rating: number) => set({ ratingFilter: rating }),
}))