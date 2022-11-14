import getProducts from '../../queries/getProducts'
import { useQuery } from "react-query"


export const useGetProducts = (initial = {}) => {
    const {data, isLoading, isError} = useQuery(['products'], getProducts, { initialData: initial })

  return { data, isLoading, isError }
}