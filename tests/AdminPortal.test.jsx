import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AdminPortal from '../src/pages/AdminPortal'
import Editcard from '../src/components/Editcard'

// Mock fetch
global.fetch = vi.fn()

describe('AdminPortal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders admin portal heading', () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => []
    })

    render(<AdminPortal />)
    const heading = screen.getByText('Admin Portal')
    expect(heading).toBeInTheDocument()
  })

  test('fetches products on mount', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Test Product',
        description: 'Test description',
        image: 'https://example.com/image.jpg',
        price: 99.99,
        category: 'Electronics',
        brand: 'TestBrand'
      }
    ]

    global.fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    })

    render(<AdminPortal />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/products')
    })
  })
})

describe('Editcard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test description',
    image: 'https://example.com/image.jpg',
    price: 99.99,
    category: 'Electronics',
    brand: 'TestBrand'
  }

  const mockOnUpdate = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders edit form with product data prefilled', () => {
    render(
      <Editcard
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    )

    const nameInput = screen.getByDisplayValue('Test Product')
    const descriptionInput = screen.getByDisplayValue('Test description')
    const priceInput = screen.getByDisplayValue('99.99')
    const categoryInput = screen.getByDisplayValue('Electronics')
    const brandInput = screen.getByDisplayValue('TestBrand')

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(priceInput).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(brandInput).toBeInTheDocument()
  })

  test('calls onCancel when cancel button is clicked', () => {
    render(
      <Editcard
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  test('submits PATCH request on form submit', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        ...mockProduct,
        name: 'Updated Product'
      })
    })

    render(
      <Editcard
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    )

    const submitButton = screen.getByRole('button', { name: /Save Changes/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:3001/products/${mockProduct.id}`,
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })
  })

  test('calls onUpdate after successful PATCH request', async () => {
    const updatedProduct = {
      ...mockProduct,
      name: 'Updated Product'
    }

    global.fetch.mockResolvedValueOnce({
      json: async () => updatedProduct
    })

    render(
      <Editcard
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    )

    const submitButton = screen.getByRole('button', { name: /Save Changes/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(updatedProduct)
    })
  })

  test('allows editing all product fields', async () => {
    render(
      <Editcard
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    )

    const nameInput = screen.getByDisplayValue('Test Product')
    const categoryInput = screen.getByDisplayValue('Electronics')
    const brandInput = screen.getByDisplayValue('TestBrand')

    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.change(categoryInput, { target: { value: 'New Category' } })
    fireEvent.change(brandInput, { target: { value: 'New Brand' } })

    expect(nameInput.value).toBe('New Name')
    expect(categoryInput.value).toBe('New Category')
    expect(brandInput.value).toBe('New Brand')
  })
})
