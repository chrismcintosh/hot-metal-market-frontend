import Head from 'next/head'
import AppLayout from "../components/Layouts/AppLayout"
import ProductsList from '../components/Products/ProductList'
import getProducts from '../queries/getProducts'
import { useQuery } from 'react-query'

export default function Shop(props) {
    const {data, isLoading, isError, isSuccess} = useQuery(['products'], getProducts, { initialData: props.products })

    if (isLoading) return <h1>Is loading</h1>

    return (
        <AppLayout>
            <Head>
                <title>Shop - Hot Metal Market</title>
            </Head>
            <div className="relative flex items-top justify-center bg-gray-100 dark:bg-gray-900 sm:pt-0 flex-wrap">
                <div className="text-white w-full">
                    {data && <ProductsList products={data} />}
                </div>
            </div>
        </AppLayout>
    )
}