import { useState } from 'react'

function Forms({ onAdd }) {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Match the product fields used by ProductPage and SearchBar.
    const newProduct = {
      name: productName,
      description,
      image: imageUrl,
      price: Number(price),
      category: category
    }

    fetch("http://localhost:3001/products", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then((response) => response.json())
    .then((savedProduct) => {
      console.log("Product added successfully")
      // Update the admin list immediately after JSON Server saves the product.
      onAdd?.(savedProduct)
      setProductName('')
      setDescription('')
      setImageUrl('')
      setPrice('')
      setCategory('')
    })
  }

  return (
      <div className="forms">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input 
            type="text" 
            placeholder="Enter product name"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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

          <label>Description</label>
          <textarea 
            placeholder="Enter product description"
            required
            value= {description}
            onChange={(e) => setDescription(e.target.value)}
            >
            
          </textarea>

          <label>Image URL</label>
          <input 
            type="url" 
            placeholder="Enter image URL"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}

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
          <button type="submit">Add Product</button>

          {/* <p>{ productName}</p>
          <p>{ description}</p>
          <p>{ imageUrl}</p>
          <p>{ price}</p> */}
        </form>
      </div>
  )
}

export default Forms
