import React from 'react'

type ButtonProps = JSX.IntrinsicElements["button"];

const Button = ({type ,className, children, ...props }: ButtonProps) => {
    return (
            <button
                type={type}
                className={`${className ? className : ''} inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
                {...props}
            >
                {children}
            </button>
    )
}

export default Button