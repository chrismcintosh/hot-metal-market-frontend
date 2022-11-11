import ApplicationLogo from '../ApplicationLogo'
import Dropdown from '../Dropdown'
import Link from 'next/link'
import NavLink from '../NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '../ResponsiveNavLink'
import { DropdownButton } from '../DropdownLink'
import { useAuth } from '../../hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AppContext } from '../../lib/AppContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import getCart from '../../queries/getCart'

const Navigation = ({ user }) => {
    const router = useRouter()
    const appContext = useContext(AppContext);
    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    const { data: cart, isLoading: cartIsLoading, isError: cartIsError, isSuccess: cartIsSuccess } = useQuery(
        ['cart', user?.id],
        getCart,
        {
          // The query will not execute until the userId exists
          enabled: !!user,
        }
    )

    if (cartIsLoading) return <></>

    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <a>
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                                </a>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/"
                                active={router.pathname === '/'}>
                                Home
                            </NavLink>
                        </div>
   
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/shop"
                                active={router.pathname === '/shop'}>
                                Shop
                            </NavLink>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/orders"
                                active={router.pathname === '/orders'}>
                                Orders
                            </NavLink>
                        </div>

                        {/* {user && (
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href="/dashboard"
                                    active={router.pathname === '/dashboard'}>
                                    Dashboard
                                </NavLink>
                            </div>
                        )} */}
                    </div>

                    {!user && (
                        <a
                        href="#"
                        className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                        >
                            Login
                        </a>
                    )}

                    {user && (
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="mr-4">
                                <button
                                    className="text-[8px]"
                                    onClick={() =>
                                        appContext.setCartOpen(true)
                                    }>
                                    <ShoppingBagIcon />
                                    {cart?.items.length
                                        ? `${cart.items.length} Items $${cart.cartTotal}`
                                        : 'No Items'}
                                </button>
                            </div>
                            <Dropdown
                                align="right"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div>{user?.name}</div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    Logout
                                </DropdownButton>
                            </Dropdown>
                        </div>
                    )}

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation