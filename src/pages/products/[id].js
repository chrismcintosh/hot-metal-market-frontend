import getProduct from "@/queries/getProduct"
import { useRouter } from 'next/router'
import axios from "@/lib/axios"

export default function Product({product}) {
    return(
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </div>
    )
}

export async function getServerSideProps(params) {
    const product = await getProduct(params.query.id)

    return {
      props: {
        product,
      },
    }
  }