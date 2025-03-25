import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Dot, ShoppingCart } from "lucide-react"
import { useCartStore } from "./cartStore"
import { DrawerCard } from "./components/DrawerCard"
import { Link } from "react-router"
import { useState } from "react"

export const ShoppingCartDrawer = () => {
  const cartProducts = useCartStore(state => state.products)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>
        <div className="relative">
          {cartProducts.length > 0 &&
            <Dot size={50} className="text-red-600 cursor-pointer absolute -left-7 -top-5 z-10 " />
          }
          <ShoppingCart className="cursor-pointer" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tus articulos</DrawerTitle>
        </DrawerHeader>
        <section className="grid gap-3 overflow-auto">
          {cartProducts.map(product => (
            <DrawerCard product={product} />
          ))

          }
        </section>
        <DrawerFooter>
          <p className="text-xl font-semibold">
            Total: $
            {
              cartProducts.reduce((acc, product) => acc + product.price, 0).toFixed(2)
            }
          </p>
          <Link to={'/cart'}>
            <Button className="w-full" onClick={() => setOpen(false)}>Ir a pagar</Button>
          </Link>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
