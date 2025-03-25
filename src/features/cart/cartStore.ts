import { ProductType } from "@/types/productsType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  products: ProductType[]
  addProduct: (products: ProductType) => void
  deleteProduct: (id: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: ProductType) => set(prev => ({ products: [...prev.products, product] })),
      deleteProduct: (id: string) => set(prev => ({ products: prev.products.filter((product) => product.id !== +id) }))
    }),
    {
      name: 'cartProducts',
    }
  )
);
