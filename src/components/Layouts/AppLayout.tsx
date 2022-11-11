import Navigation from './Navigation'
import { useAuth } from '../../hooks/auth'
import CartSlideWrapper from '../CartSlideWrapper'
import getCart from '../../queries/getCart'
import { useQuery } from 'react-query'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth()

    const { data: cart, isLoading: cartIsLoading, isError: cartIsError, isSuccess: cartIsSuccess } = useQuery(
        ['cart', user?.id],
        getCart,
        {
          // The query will not execute until the userId exists
          enabled: !!user,
        }
      )

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {!cartIsLoading && <CartSlideWrapper cart={cart}/>}

            {/* Page Content */}
            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout
