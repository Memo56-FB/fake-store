import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductType } from "@/types/productsType"
import { useEffect } from "react"
import { useFilterProductsStore } from "../productsStore"


export const PaginationProducts = ({productsPerPage, currentPage, setCurrentPage, startTransition, filteredProducts}: {
  productsPerPage: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  startTransition: (callback: () => void) => void
  filteredProducts: ProductType[]
}) => {
  const selectedCategories = useFilterProductsStore(state => state.selectedCategories)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProducts, setCurrentPage, selectedCategories])

  const handleClickPreviosPage = () => {
    if (currentPage > 1) {
      startTransition(() => {
        setCurrentPage(currentPage - 1)
      })
    }
  }

  const handleClickNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      startTransition(() => {
        setCurrentPage(currentPage + 1)
      })
    }
  }

  return (
    <Pagination className="mx-auto col-span-full mb-8">
      <PaginationContent>
        <PaginationItem onClick={handleClickPreviosPage} className="cursor-pointer">
          <PaginationPrevious aria-disabled={currentPage === 1} />
        </PaginationItem>
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, i) => {
          const page = i + 1
          return (
            <PaginationItem key={page} className="cursor-pointer">
              <PaginationLink onClick={() => {
                startTransition(() => {
                  setCurrentPage(page)
                })
              }} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        }
        )}
        <PaginationItem onClick={handleClickNextPage} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  )
}
