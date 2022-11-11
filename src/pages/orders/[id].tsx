import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useAuth } from '../../hooks/auth'
import getOrder from '../../queries/getOrder'
import Link from 'next/link'

export default function Order(props) {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const { id } = router.query

    const { data: order, isLoading, isError, isSuccess } = useQuery(
        ['order', id],
        getOrder,
        {
            // The query will not execute until the userId exists
            enabled: !!user,
        },
    )

    if (isLoading || !order) return <div>Loading ...</div>

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Order Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {order.id}
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Order Total
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            ${order.total / 100}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Order Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {order.created_at}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Products
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {order.products && order.products.map(product => {
                                return (
                                    <li key={product.id}>
                                        <Link href={`/products/${product.id}`}>
                                            <a>
                                                {product.title} ({product.pivot.quantity})
                                            </a>
                                        </Link> - ${product.pivot.product_cost}
                                    </li>
                                )
                            })}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Payment ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {order.stripe_payment_intent_id}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Order Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {order.status}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
