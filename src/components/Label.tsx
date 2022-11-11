import React from 'react'

type LabelProps = JSX.IntrinsicElements["label"];

const Label = ({ className, children, ...props }: LabelProps) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
