import { render, screen } from '@testing-library/react'
import LandingPage from '../src/components/LandingPage'

describe('LandingPage Component', () => {
  test('renders component successfully', () => {
    render(<LandingPage />)

    expect(screen.getByText(/shop/i)).toBeInTheDocument()
  })
})