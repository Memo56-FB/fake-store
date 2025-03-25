import { useState, useTransition } from "react"

const usePagintionProducts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5
  const [isPending, startTransition] = useTransition()


  return {isPending, productsPerPage, currentPage, startTransition, setCurrentPage}
}

export default usePagintionProducts