import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getProductDetail } from "../productsServices"

const useProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () =>  getProductDetail(id ?? ''), 
    refetchOnMount: false
  })

  return {data, isLoading}
}

export default useProductDetail