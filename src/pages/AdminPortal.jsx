import { useState, useEffect } from "react";
import FormPage from "../components/FormPage";
import ProductPage from "../components/ProductPage";
import SearchBar from "../components/SearchBar";


function AdminPortal() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Keep a master list plus a filtered list so admin filters do not lose data.
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // POST=> Called by FormPage after a successful submission.
  function handleAddProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
    setFilteredProducts((prev) => [...prev, newProduct]);
  }

  // PATCH=> Called by ProductPage when admin edits a field.
  function handleUpdateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setFilteredProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }

  // DELETE=> Called by ProductPage when admin deletes a product
  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setFilteredProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1>Admin Portal</h1>
      <FormPage onAdd={handleAddProduct} />
      {/* Admin mode swaps price filters for stock/status filters. */}
      <SearchBar
        products={products}
        onFilter={setFilteredProducts}
        filterMode="admin"
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductPage
            key={product.id}
            product={product}
            isAdmin={true}
            onUpdate={handleUpdateProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPortal;
