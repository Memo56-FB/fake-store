import { useQuery } from "@tanstack/react-query"
import { useProductsStore } from "../productsStore"
import { getAllProducts } from "../productsServices"
import { useEffect, useMemo, useState } from "react"

const useProducts = () => {
  const setProducts = useProductsStore(state => state.setProducts)
  const products = useProductsStore(state => state.products)
  const setFilteredProducts = useProductsStore(state => state.setFilteredProducts)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
    }
  },[data, isSuccess, setProducts])
  const categories = [...new Set(products?.map((product) => product.category))]

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState<string>("none")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [ratingFilter, setRatingFilter] = useState<number>(0)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredProducts = useMemo(() => {
    let result = products ? [...products] : []

    // Filtrar por categoría
    if (selectedCategories?.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    // Filtrar por rango de precios
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Filtrar por calificación
    if (ratingFilter > 0) {
      result = result.filter((product) => product.rating.rate >= ratingFilter);
    }

    // Ordenar por precio
    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(result)
  }, [selectedCategories, priceSort, priceRange, ratingFilter, products, setFilteredProducts]);

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
  }

}

export default useProducts