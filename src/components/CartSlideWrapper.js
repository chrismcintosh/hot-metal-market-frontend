import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from '@/lib/axios'
import { useMutation, useQueryClient } from 'react-query'
import { AppContext } from '@/lib/AppContext'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './Checkout/CheckoutForm';
import { useAuth } from '@/hooks/auth'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartSlideWrapper({ cart }) {
    const appContext = useContext(AppContext);
    const { user } = useAuth({ middleware: 'guest' })
    const queryClient = useQueryClient()

    const [isCheckout, setIsCheckout] = useState(false)
    const [clientSecret, setClientSecret] = useState("")

    const getPaymentIntent = async () => {
        const data = {
            "user": user.id,
            "cart": cart,
            "amount": cart?.cartTotal * 100,
        }
        const res = await axios.post(`http://localhost:8000/api/stripe/generatePaymentIntent`, data)
        setClientSecret(res.data.client_secret)
    }

    const deleteFromCartMutation = useMutation(
        id => axios.delete(`http://localhost:8000/api/carts/${id}`),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(['cart'])
            },
        },
    )

    const options = {
        clientSecret
      };

    return (
            <Transition.Root show={appContext.cartOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => appContext.setCartOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full">
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                                        Shopping cart
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() =>
                                                                appContext.setCartOpen(false)
                                                            }>
                                                            <span className="sr-only">
                                                                Close panel
                                                            </span>
                                                            <XMarkIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-gray-200">
                                                            {cart?.items?.map(
                                                                    product => (
                                                                        <li
                                                                            key={
                                                                                product.id
                                                                            }
                                                                            className="flex py-6">
                                                                                
                                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <img
                                                                                    src={product?.media[0]?.original_url ?? '/images/placeholder.png'}
                                                                                    // alt={product.imageAlt}
                                                                                    className="h-full w-full object-cover object-center"
                                                                                />
                                                                            </div>

                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                        <h3>
                                                                                            <a
                                                                                            // href={product.href}
                                                                                            >
                                                                                                {
                                                                                                    product.title
                                                                                                }
                                                                                            </a>
                                                                                        </h3>
                                                                                        <p className="ml-4">
                                                                                            {
                                                                                                product.price
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    <p className="text-gray-500">
                                                                                        Qty{' '}
                                                                                        {
                                                                                            product
                                                                                                .pivot
                                                                                                .quantity
                                                                                        }
                                                                                    </p>

                                                                                    <div className="flex">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                            onClick={() => {
                                                                                                deleteFromCartMutation.mutate(
                                                                                                    product
                                                                                                        .pivot
                                                                                                        .id,
                                                                                                )
                                                                                            }}>
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ),
                                                                )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        {!isCheckout &&
                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{cart?.cartTotal && `$${cart.cartTotal}`}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    Shipping and taxes
                                                    calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <button
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                        onClick={() => {
                                                            setIsCheckout(true)
                                                            getPaymentIntent()
                                                        }}
                                                        >
                                                        Checkout
                                                    </button>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() =>
                                                                {
                                                                    setOpen(false)
                                                                    setIsCheckout(false)
                                                                }
                                                            }>
                                                            Continue Shopping
                                                            <span aria-hidden="true">
                                                                {' '}
                                                                &rarr;
                                                            </span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                            }

                                            {isCheckout && 
                                                <div className="p-8">
                                                    <div className="pb-4">
                                                        {clientSecret && (
                                                            <Elements options={options} stripe={stripePromise}>
                                                                <CheckoutForm clientSecret={clientSecret} />
                                                            </Elements>
                                                        )}   
                                                    </div> 
                                                    <div>
                                                        {cart?.cartTotal && `$${cart.cartTotal}`}
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
    )
}
