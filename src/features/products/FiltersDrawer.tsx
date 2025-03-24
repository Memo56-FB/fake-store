import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ProductFilters from "./Filters"



export const FiltersDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="sticky top-16 z-10 bg-red-600 text-white font-semibold">Filtros</DrawerTrigger>
      <DrawerContent>
        <div className="overflow-auto">
          <ProductFilters />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
