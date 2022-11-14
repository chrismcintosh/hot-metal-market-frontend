import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductListCard from '../src/components/Products/ProductListCard'
import { QueryClient, QueryClientProvider } from 'react-query'

var cardDataWithOutImage = {
    id: 10,
    title: 'Aliquam Inventore Unde Sint',
    price: '351.00',
    description:
        'Officiis non debitis dolores voluptas deserunt nulla. Nihil nostrum odio aut est. Ipsa quaerat aut ad a veritatis. Voluptatem voluptas ut et voluptatem soluta et dignissimos.\n\nDignissimos eius ipsum ut non voluptas dolor omnis sint. Sint repudiandae deleniti quasi officia. Odio in velit omnis voluptas. Impedit alias omnis eligendi mollitia.',
    created_at: '2022-11-08T21:26:50.000000Z',
    updated_at: '2022-11-08T21:26:50.000000Z',
    cmedia: [],
    media: [],
}

var cardDataWithImage = {
    id: 10,
    title: 'Aliquam Inventore Unde Sint',
    price: '351.00',
    description:
        'Officiis non debitis dolores voluptas deserunt nulla. Nihil nostrum odio aut est. Ipsa quaerat aut ad a veritatis. Voluptatem voluptas ut et voluptatem soluta et dignissimos.\n\nDignissimos eius ipsum ut non voluptas dolor omnis sint. Sint repudiandae deleniti quasi officia. Odio in velit omnis voluptas. Impedit alias omnis eligendi mollitia.',
    created_at: '2022-11-08T21:26:50.000000Z',
    updated_at: '2022-11-08T21:26:50.000000Z',
    cmedia: [],
    media: [],
    image: 'sample-image.jpg'
}

var client = new QueryClient();
var Wrapper = ({ children }) => {
return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
    )
};


describe('Product List Card', () => {
    it('renders an image', () => {
      render(<Wrapper><ProductListCard product={cardDataWithImage} /></Wrapper>)
      const image = screen.getByTestId('product-list-card-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'sample-image.jpg')
    })

    it('renders a placeholder when image not provided', () => {
        render(<Wrapper><ProductListCard product={cardDataWithOutImage} /></Wrapper>)
        const image = screen.getByTestId('product-list-card-image')
        expect(image).toHaveAttribute('src', '/images/placeholder.png')
    })
  })