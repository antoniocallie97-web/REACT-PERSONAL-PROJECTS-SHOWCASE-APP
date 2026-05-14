
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import '@testing-library/jest-dom'
import FormPage from '../src/components/FormPage'

describe('FormPage Component', () => {
  test('renders FormPage text', () => {
    render(<FormPage />)

    const text = screen.getByText(/FormPage/i)

    expect(text).toBeInTheDocument()
  })
})