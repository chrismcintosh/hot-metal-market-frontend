import Head from 'next/head'

import getProducts from '../queries/getProducts'
import { useQuery } from 'react-query'
import ProductsIntro from '../components/Products/ProductsIntro'
import ProductsList from '../components/Products/ProductList'
import AppLayout from '../components/Layouts/AppLayout'

export default function Home(props) {
    
    const {data, isLoading} = useQuery(['products'], getProducts, { initialData: props.products })

    if (isLoading) return <h1>Loading..</h1>

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hot Metal
                </h2>
            }
        >
            <Head>
                <title>Hot Metal Market</title>
            </Head>

            <div className="relative flex items-top justify-center bg-gray-100 dark:bg-gray-900 sm:pt-0 flex-wrap">
                <div className="text-white w-full">
                    <ProductsIntro />
                    
                    <ProductsList products={data} />
                </div>
            </div>
        </AppLayout>
    )
}

export async function getStaticProps() {
    const products = await getProducts()
    return {props: {products}}
}
