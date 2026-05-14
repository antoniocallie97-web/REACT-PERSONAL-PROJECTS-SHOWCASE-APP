import { render, screen } from '@testing-library/react'
import SearchBar from '../src/components/SearchBar'

describe('SearchBar Component', () => {
  test('renders SearchBar text', () => {
    render(<SearchBar />)

    const text = screen.getByText(/SearchBar/i)

    expect(text).toBeInTheDocument()
  })
})