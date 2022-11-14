import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductsIntro from '../src/components/Products/ProductsIntro'

describe('ProductsIntro', () => {
  it('renders a heading', () => {
    render(<ProductsIntro />)
    const heading = screen.getByTestId('products-intro-test-heading')

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Summer styles are finally here')
    
  })
})