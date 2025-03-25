import { Button } from '@/components/ui/button'
import { ProductType } from '@/types/productsType'
import { useCartStore } from '../cartStore'

export const DrawerCard = ({ product }: { product: ProductType }) => {
  const deleteProduct = useCartStore(state => state.deleteProduct)

  return (
    <article className='border-y border-red-600 p-3 grid place-items-center gap-2'>
      <img src={product.image} alt={product.title} className="w-full h-32 object-center object-contain aspect-square" />
      <p className="text-center font-semibold">${product.price.toFixed(2)}</p>
      <Button
        variant='destructive'
        onClick={() => deleteProduct(product.id.toString())}
      >
        Eliminar
      </Button>
    </article>
  )
}
