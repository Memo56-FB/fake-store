import { useQuery } from "@tanstack/react-query"
import { useFilterProductsStore, useProductsStore } from "../productsStore"
import { getAllProducts } from "../productsServices"
import { useEffect, useMemo } from "react"

const useProducts = () => {
  const setProducts = useProductsStore(state => state.setProducts)
  const products = useProductsStore(state => state.products)
  const setFilteredProducts = useProductsStore(state => state.setFilteredProducts)

  const { data, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    refetchOnMount: false
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
      setFilteredProducts(data)
    }
  },[data, isSuccess, setProducts, setFilteredProducts])

  // ? Filters
  const selectedCategories = useFilterProductsStore(state => state.selectedCategories)
  const priceSort = useFilterProductsStore(state => state.priceSort)
  const setPriceSort = useFilterProductsStore(state => state.setPriceSort)
  const priceRange = useFilterProductsStore(state => state.priceRange)
  const setPriceRange = useFilterProductsStore(state => state.setPriceRange)
  const ratingFilter = useFilterProductsStore(state => state.ratingFilter)
  const setRatingFilter = useFilterProductsStore(state => state.setRatingFilter)
  const handleCategoryChange = useFilterProductsStore(state => state.handleCategoryChange)

  const categories = useMemo(() => [...new Set(products?.map((product) => product.category))], [products])


  const filteredProducts = useMemo(() => {
    let result = products ? [...products] : []

    //? Filtrar por categoría
    if (selectedCategories?.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    //? Filtrar por rango de precios
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    //? Filtrar por calificación
    if (ratingFilter > 0) {
      result = result.filter((product) => product.rating.rate >= ratingFilter);
    }

    //? Ordenar por precio
    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }
    return result
  }, [products, selectedCategories, priceRange, ratingFilter, priceSort]);

  useEffect(() => {
    setFilteredProducts(filteredProducts)
  }, [filteredProducts, setFilteredProducts])

  return {
    filteredProducts,
    isLoading,
    selectedCategories,
    categories,
    handleCategoryChange,
    priceSort,
    setPriceSort,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    refetch,
    error
  }

}

export default useProducts