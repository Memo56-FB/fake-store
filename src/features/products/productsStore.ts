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