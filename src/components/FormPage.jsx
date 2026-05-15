
import { useState, useEffect } from 'react'

function Forms({ onAdd, isEditing = false, initialProduct = {}, onUpdate, onCancel }) {
  const [productName, setProductName] = useState(initialProduct.name || '')
  const [description, setDescription] = useState(initialProduct.description || '')
  const [imageUrl, setImageUrl] = useState(initialProduct.image || '')
  const [price, setPrice] = useState(initialProduct.price || '')
  const [category, setCategory] = useState(initialProduct.category || '')
  const [brand, setBrand] = useState(initialProduct.brand || '')

  useEffect(() => {
    if (isEditing && initialProduct) {
      setProductName(initialProduct.name || '')
      setDescription(initialProduct.description || '')
      setImageUrl(initialProduct.image || '')
      setPrice(initialProduct.price || '')
      setCategory(initialProduct.category || '')
      setBrand(initialProduct.brand || '')
    }
  }, [isEditing, initialProduct])

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      name: productName,
      description,
      image: imageUrl,
      price: Number(price),
      category: category,
      brand: brand
    }

    if (isEditing) {
      // Update existing product
      fetch(`http://localhost:3001/products/${initialProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
        .then((response) => response.json())
        .then((updatedProduct) => {
          console.log("Product updated successfully")
          onUpdate?.(updatedProduct)
        })
        .catch((error) => {
          console.error("Update failed:", error)
        })
    } else {
      // Add new product
      fetch("http://localhost:3001/products", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
        .then((response) => response.json())
        .then((savedProduct) => {
          console.log("Product added successfully")
          onAdd?.(savedProduct)
          setProductName('')
          setDescription('')
          setImageUrl('')
          setPrice('')
          setCategory('')
          setBrand('')
        })
        .catch((error) => {
          console.error("Add product failed:", error)
        })
    }
  }

  return (
    <div className="forms">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Category</label>
          <input
            type="text"
            placeholder="Enter product category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Brand</label>
          <input
            type="text"
            placeholder="Enter product brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form-field form-field-full">
          <label>Description</label>
          <textarea
            placeholder="Enter product description"
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Image URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Price</label>
          <input
            type="number"
            step={0.01}
            placeholder="Enter product price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-buttons form-field-full">
          <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
          {isEditing && (
            <button type="button" className="form-cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>

        {/* <p>{ productName}</p>
          <p>{ description}</p>
          <p>{ imageUrl}</p>
          <p>{ price}</p> */}
      </form>
    </div>
  )
}

export default Forms
