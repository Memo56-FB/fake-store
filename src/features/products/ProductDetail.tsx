import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import useProductDetail from "./hooks/useProductDetail"
import { renderRating } from "./utils/renderRating"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { House, Loader2, Store } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"
import { Separator } from "@radix-ui/react-separator"
import { useCartStore } from "../cart/cartStore"
import { ProductType } from "@/types/productsType"
import toast from "react-hot-toast"

export const ProductDetail = () => {
  const { data, isLoading } = useProductDetail()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const addProduct = useCartStore(state => state.addProduct)

  if (isLoading) {
    return (
      <section className="p-4">
        <Skeleton className="w-full h-full bg-white shadow grid place-items-center">
          <Loader2 className="animate-spin" size={48} />
        </Skeleton>
      </section>
    )
  }

  return (
    <section className="p-4">
      <Card className="gap-2 lg:grid lg:grid-cols-3">
        {!isDesktop &&
          <CardHeader className="text-muted-foreground text-sm font-bold md:text-2xl md:text-black">
            {data?.title}
          </CardHeader>
        }
        <CardContent>
          <article className="flex items-center gap-3">
            <div className="flex">
              {renderRating(data?.rating?.rate ?? 0)}
            </div>
            <p className="text-blue-400">({data?.rating.count})</p>
          </article>
          <img src={data?.image} alt={data?.title} className="w-full h-full object-cover" />
        </CardContent>
        <div>
          {isDesktop &&
            <CardHeader className="text-3xl font-bold p-0">
              {data?.title}
            </CardHeader>
          }
          {isDesktop &&
            <Separator className="w-full h-0.5 bg-red-600 my-4" />

          }
          <CardDescription className="p-3 lg:p-0">
            {data?.description}
          </CardDescription>
          {isDesktop &&
            <Separator className="w-full h-0.5 bg-red-600 my-4" />
          }
          <CardFooter>
            <p className="text-xl md:text-4xl font-bold flex">
              <span className="text-red-600 text-xs md:text-base">$</span>
              {data?.price.toString().split('.')[0]}
              <span className="text-xs md:text-base">{data?.price.toString().split('.')[1]}</span>
            </p>
            <p className="text-sm"></p>
          </CardFooter>
        </div>
        <div className="p-3">
          {isDesktop &&
            <div>
              <p className="p-6 rounded-md bg-gray-100 flex gap-2 mb-12">
                Selecciona una tienda para conocer si puedes recoger este producto el día de hoy
                <Store className="text-red-600" />
              </p>
              <p className="p-6 rounded-md bg-gray-100 flex gap-2 mb-12">
                Recibelo a domicilio <House className="text-red-600" />
              </p>

            </div>
          }
          <Button
            className="bg-yellow-300 text-black rounded-xl w-full hover:bg-yellow-300/80"
            onClick={() => {
              addProduct(data ?? {} as ProductType)
              toast.success("Producto agregado al carrito")
            }}
          >
            Agregar al carrito
          </Button>
        </div>

      </Card>
    </section>
  )
}
