import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ShoppingCart } from "lucide-react"

export const ShoppingCartDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <ShoppingCart />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Total</DrawerTitle>
          <DrawerDescription>$99999</DrawerDescription>
        </DrawerHeader>
        <section>
          <p>Productos</p>
        </section>
        <DrawerFooter>
          <Button>Ir a pagar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
