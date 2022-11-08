import { useQuery } from 'react-query'
import { useAuth } from '@/hooks/auth'
import getOrders from '@/queries/getOrders'
import Link from 'next/link'

export default function Orders(props) {
    const { user } = useAuth({ middleware: 'guest' })

    const { data: orders, isLoading, isError, isSuccess } = useQuery(
        ['orders', user?.id],
        getOrders,
        {
          // The query will not execute until the userId exists
          enabled: !!user,
        }
      )

    return <div>
        <h1>Orders</h1>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-left">User ID</th>
                    <th className="text-left">Order ID</th>
                    <th className="text-left">Payment ID</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Date</th>
                </tr>

            </thead>
            <tbody>
                {orders && orders.map(order => {
                    return (
                        <tr key={order.id}>
                            <td className="">{order.user_id}</td>
                            <td className=""><Link href={`/orders/${order.id}`}>{order.id}</Link></td>
                            <td className="">{order.stripe_payment_intent_id}</td>
                            <td className="">${order.total / 100}</td>
                            <td className="">{order.status}</td>
                            <td className="">{order.created_at}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
}
 