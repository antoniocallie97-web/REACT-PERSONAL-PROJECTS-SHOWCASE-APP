import { useState } from 'react'

function Editcard({ product, onUpdate, onCancel }) {
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [image, setImage] = useState(product.image)
  const [price, setPrice] = useState(product.price)
  const [category, setCategory] = useState(product.category || '')
  const [brand, setBrand] = useState(product.brand || '')

  function handleSubmit(e) {
    e.preventDefault()

    const updatedProduct = {
      name,
      description,
      image,
      price: Number(price),
      category,
      brand
    }

    fetch(`http://localhost:3001/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
    .then((response) => response.json())
    .then((savedProduct) => {
      console.log("Product updated successfully")
      onUpdate?.(savedProduct)
      onCancel?.()
    })
  }

  return (
    <div className="edit-form-modal">
      <div className="edit-form-container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input 
            type="text" 
            placeholder="Enter product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description</label>
          <textarea 
            placeholder="Enter product description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Image URL</label>
          <input 
            type="url" 
            placeholder="Enter image URL"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Price</label>
          <input 
            type="number"
            step={0.01} 
            placeholder="Enter product price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Category</label>
          <input 
            type="text" 
            placeholder="Enter product category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>Brand</label>
          <input 
            type="text" 
            placeholder="Enter product brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <div className="form-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editcard
