import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from 'lib/axios'
import getProducts from '@/queries/getProducts'
import getCart from '@/queries/getCart'
import { useQuery } from 'react-query'
import ProductsIntro from '@/components/Products/ProductsIntro'
import ProductsList from '@/components/Products/ProductList'
import Navigation from '@/components/Layouts/Navigation'
import { getLocationOrigin } from 'next/dist/shared/lib/utils'
import { useState, useEffect } from 'react'
import CartSlideWrapper from '@/components/CartSlideWrapper'
// This gets called on every request


export default function Home(props) {
    const { user } = useAuth({ middleware: 'guest' })

    const {data, isLoading, isError, isSuccess} = useQuery(['products'], getProducts, { initialData: props.products })

    const { data: cart, isLoading: cartIsLoading, isError: cartIsError, isSuccess: cartIsSuccess } = useQuery(
        ['cart', user],
        getCart,
        {
          // The query will not execute until the userId exists
          enabled: !!user,
        }
      )

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            {/* <Navigation user={user} /> */}
            {!cartIsLoading && <CartSlideWrapper cart={cart}/>}

            <div className="relative flex items-top justify-center bg-gray-100 dark:bg-gray-900 sm:pt-0 flex-wrap">
                <div className="text-white w-full">
                    <ProductsIntro />
                    
                    {data && <ProductsList products={data} />}
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const products = await getProducts()
    return {props: {products}}
}
