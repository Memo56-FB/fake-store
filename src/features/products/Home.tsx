import ProductFilters from "./components/Filters"
import { useMediaQuery } from 'usehooks-ts'
import { FiltersDrawer } from "./components/FiltersDrawer"

import useProducts from "./hooks/useProducts"
import { useEffect, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ProductCard, ProductCardLoading } from "./components/ProductCard"

import eagleWearLogo from '@/assets/EagleWearLogo.png'
import usePagintionProducts from "./hooks/usePaginationProducts"
import { PaginationProducts } from "./components/PaginationProducts"

export const Home = () => {
  const { filteredProducts, isLoading } = useProducts()
  const { productsPerPage, currentPage, startTransition, setCurrentPage, isPending } = usePagintionProducts()


  const currentProducts = useMemo(() => {
    const indexOfFirstProduct = (currentPage - 1) * productsPerPage
    const indexOfLastProduct = indexOfFirstProduct + productsPerPage

    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  }, [filteredProducts, currentPage, productsPerPage])

  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['products'],
    })
  }, [queryClient])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section className="grid min-h-screen">
      <div className="bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] grayscale-25 bg-center bg-cover grid h-96 place-items-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl text-center font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Lo último en moda
          </h1>
          <img src={eagleWearLogo} alt="eagle wear logo" className="w-40 md:w-60" />
        </div>
      </div>
      <div className="grid md:grid-cols-[auto_1fr]">
        {isDesktop ?
          <ProductFilters />
          :
          <FiltersDrawer />

        }
        {/* Product grid */}
        {(currentProducts.length === 0 && !isLoading) ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No se encontraron productos</h3>
            <p className="text-muted-foreground">Intenta con otros filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 items-start">
            {(isLoading || isPending) ?
              Array.from({ length: 4 }).map((_, i) => (
                <ProductCardLoading key={i} />
              ))
              :
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        )}
        {Math.ceil(filteredProducts.length / productsPerPage) > 1 &&
          <PaginationProducts
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startTransition={startTransition}
            filteredProducts={filteredProducts}
          />
        }
      </div>
    </section>
  )
}
