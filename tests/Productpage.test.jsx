import { render, screen } from '@testing-library/react'
import ProductPage from '../src/components/ProductPage'

describe('ProductPage Component', () => {
  test('renders ProductPage text', () => {
    render(<ProductPage />)

    const text = screen.getByText(/ProductPage/i)

    expect(text).toBeInTheDocument()
  })
})