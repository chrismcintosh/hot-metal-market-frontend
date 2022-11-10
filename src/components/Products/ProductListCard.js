import axios from '../../lib/axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../../hooks/auth'
import { useContext } from 'react'
import { AppContext } from '../../lib/AppContext'


export default function ProductListCard({product}) {

  const queryClient = useQueryClient()

  const appContext = useContext(AppContext);

  const { user } = useAuth()

  const addToCartMutation = useMutation((data) => axios.post(`http://localhost:8000/api/cart`, data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['cart'])
    },
  })

return(
    <div key={product.id} className="group">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <img
        src={product.image ?? '/images/placeholder.png'}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    {user &&     <button className="mt-4 text-gray-700"
    onClick={() => {
      addToCartMutation.mutate({product_id: product.id, user_id: user.id, quantity: 1, price: product.price})
      appContext.setCartOpen(true)
    }}>Add To Cart</button>}
  </div>
)
}