import { Button } from "@/components/ui/button"
import { useCartStore } from "./cartStore"
import { CartCard } from "./components/CartCard"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export const Cart = () => {
  const cartProducts = useCartStore(state => state.products)
  const deleteAllProducts = useCartStore(state => state.deleteAllProducts)
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(deleteAllProducts())
        }, 2000)
      }),
    mutationKey: ['deleteAllProducts'],
    onSuccess: () => {
      toast.success("Pago éxitoso")
      navigate('/')
    }
  })

  return (
    <section className="md:grid md:grid-cols-8 md:gap-4 md:place-items-center md:p-8">
      <div className="p-4 bg-white sticky top-16 z-10 md:col-span-2 md:col-start-7 md:p-10 self-start">
        <Button onClick={() => mutate()} isLoading={isPending} className="bg-yellow-300 text-black rounded-xl w-full hover:bg-yellow-300/80">
          Proceder al pago
        </Button>
      </div>
      <div className="p-4 md:row-start-1 md:bg-white md:col-span-6">
        <h1 className="text-xl">Carrito</h1>
        <p className="text-2xl font-semibold">Total: $ {cartProducts.reduce((acc, product) => acc + product.price, 0).toFixed(2)}</p>
        <p className="text-muted-foreground text-sm mb-4">
          Aquí podrás ver los productos que has agregado al carrito
        </p>
        {cartProducts.map(product => (
          <CartCard product={product} />
        ))}
      </div>
    </section>
  )
}
