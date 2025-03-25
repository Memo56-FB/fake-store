import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import useProductDetail from "./hooks/useProductDetail"
import { renderRating } from "./utils/renderRating"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export const ProductDetail = () => {
  const { data, isLoading } = useProductDetail()

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
      <Card className="gap-2">
        <CardHeader className="text-muted-foreground text-sm font-bold">
          {data?.title}
        </CardHeader>
        <CardContent>
          <article className="flex items-center gap-3">
            <div className="flex">
              {renderRating(data?.rating?.rate ?? 0)}
            </div>
            <p className="text-blue-400">({data?.rating.count})</p>
          </article>
          <img src={data?.image} alt={data?.title} className="w-full h-full object-cover" />
        </CardContent>
        <CardDescription className="p-3">
          {data?.description}
        </CardDescription>
        <CardFooter>
          <p className="text-xl font-bold flex">
            <span className="text-red-600 text-xs">$</span>
            {data?.price.toString().split('.')[0]}
            <span className="text-xs">{data?.price.toString().split('.')[1]}</span>
          </p>
          <p className="text-sm"></p>
        </CardFooter>
        <div className="p-3">
          <Button className="bg-yellow-300 text-black rounded-xl w-full">
            Agregar al carrito
          </Button>
        </div>

      </Card>
    </section>
  )
}
