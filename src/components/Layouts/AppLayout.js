import Navigation from '../Layouts/Navigation'
import { useAuth } from '../../hooks/auth'
import { useContext } from 'react'
import CartSlideWrapper from '../CartSlideWrapper'
import getCart from '../../queries/getCart'
import { useQuery } from 'react-query'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

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

            {/* Page Heading */}
            {/* <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header> */}

            {/* Page Content */}
            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout
