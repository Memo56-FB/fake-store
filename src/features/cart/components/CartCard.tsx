import { Button } from "@/components/ui/button"
import { ProductType } from "@/types/productsType"
import { useCartStore } from "../cartStore"

export const CartCard = ({ product }: { product: ProductType }) => {
  const deleteProduct = useCartStore(state => state.deleteProduct)

  return (
    <article className="grid grid-cols-[1fr_2fr] gap-2 p-3 border-y border-red-600">
      <img src={product.image} alt={product.title} className="w-full h-32 object-center object-contain aspect-square" />
      <div className="grid gap-3">
        <div className="grid gap-2 md:flex md:justify-between md:gap-6">
          <p className="text-sm md:text-xl md:font-semibold">
            {product.title}
          </p>
          <p className="font-semibold text-2xl">${product.price.toFixed(2)}</p>
        </div>
        <Button className="md:w-32" variant="destructive" onClick={() => deleteProduct(product.id.toString())}>
          Eliminar
        </Button>
      </div>

    </article>
  )
}
