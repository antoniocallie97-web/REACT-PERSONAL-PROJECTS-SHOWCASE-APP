import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ProductPage from '../src/components/ProductPage'

// Mock fetch
global.fetch = vi.fn()

describe('ProductPage Admin Features', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test description',
    image: 'https://example.com/image.jpg',
    price: 99.99,
    category: 'Electronics',
    brand: 'TestBrand'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock image loading
    window.HTMLImageElement.prototype.onload = vi.fn()
  })

  test('renders product card in admin mode', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/Electronics/)).toBeInTheDocument()
    expect(screen.getByText(/TestBrand/)).toBeInTheDocument()
  })

  test('displays Edit and Delete buttons in admin mode', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const editButton = screen.getByRole('button', { name: /Edit/i })
    const deleteButton = screen.getByRole('button', { name: /Delete/i })

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })

  test('opens edit form when Edit button is clicked', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const editButton = screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    expect(screen.getByText('Edit Product')).toBeInTheDocument()
  })

  test('does NOT show Add to Cart button in admin mode', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const addToCartButton = screen.queryByRole('button', { name: /Add to Cart/i })
    expect(addToCartButton).not.toBeInTheDocument()
  })

  test('confirms before deleting product', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    global.confirm = vi.fn(() => true)
    global.fetch.mockResolvedValueOnce({
      ok: true
    })

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    expect(global.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Test Product"?'
    )
  })

  test('sends DELETE request when confirmed', async () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    global.confirm = vi.fn(() => true)
    global.fetch.mockResolvedValueOnce({
      ok: true
    })

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:3001/products/${mockProduct.id}`,
        expect.objectContaining({
          method: 'DELETE'
        })
      )
    })
  })

  test('calls onDelete callback after successful deletion', async () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    global.confirm = vi.fn(() => true)
    global.fetch.mockResolvedValueOnce({
      ok: true
    })

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id)
    })
  })

  test('does not delete when user cancels confirmation', () => {
    const mockOnUpdate = vi.fn()
    const mockOnDelete = vi.fn()

    global.confirm = vi.fn(() => false)

    render(
      <ProductPage
        product={mockProduct}
        isAdmin={true}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    expect(global.fetch).not.toHaveBeenCalled()
    expect(mockOnDelete).not.toHaveBeenCalled()
  })
})
