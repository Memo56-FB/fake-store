import { Link } from "react-router"
import ProductFilters from "./Filters"
import { useProductsStore } from "./productsStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from 'usehooks-ts'
import { FiltersDrawer } from "./FiltersDrawer"
import { renderRating } from "./utils/renderRating"

export const Home = () => {
  const filteredProducts = useProductsStore(state => state.filteredProducts)
  // const { isLoading } = useProducts()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section className="grid min-h-screen">
      <div className="bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] grayscale-25 bg-center bg-cover grid h-96 place-items-center">
        <h1 className="text-3xl text-center font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Lo último en moda
        </h1>
      </div>
      <div className="grid md:grid-cols-[auto_1fr]">
        {isDesktop ?
          <ProductFilters />
          :
          <FiltersDrawer />

        }
        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No se encontraron productos</h3>
            <p className="text-muted-foreground">Intenta con otros filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 items-start">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group relative bg-card rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <CardContent>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
