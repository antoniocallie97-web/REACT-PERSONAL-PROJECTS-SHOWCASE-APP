import React, { useState } from 'react'

function Forms() {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      productName,
      description,
      imageUrl,
      price: Number(price)
    }

    fetch("http://localhost:3001/products", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    }).then(() => {
      console.log("Product added successfully")
      setProductName('')
      setDescription('')
      setImageUrl('')
      setPrice('')

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