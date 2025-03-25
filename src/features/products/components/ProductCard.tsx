import placeholder from '@/assets/placeholder.svg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { renderRating } from '../utils/renderRating'
import { Link } from "react-router"
import { ProductType } from '@/types/productsType'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

export const ProductCardLoading = () => (
  <Skeleton className="rounded-xl w-full h-[380px] md:h-full bg-white shadow grid place-items-center">
    <span className='sr-only'>Loading</span>
    <Loader2 className="animate-spin" size={48} />
  </Skeleton>
)

export const ProductCard = ({ product }: { product: ProductType }) => (
  <Card
    key={product.id}
    className="group relative bg-card rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
  >
    <CardContent>
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || placeholder}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </CardContent>
    <CardHeader>
      <CardTitle className="truncate">
        {product.title}
      </CardTitle>
      <CardDescription>
        <p className="text-muted-foreground text-sm">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <div className="flex">{renderRating(product.rating.rate)}</div>
        </div>
      </CardDescription>
    </CardHeader>
    <Link to={`/product/${product.id}`} className="absolute inset-0">
      <span className="sr-only">Ver detalles</span>
    </Link>
  </Card>
)