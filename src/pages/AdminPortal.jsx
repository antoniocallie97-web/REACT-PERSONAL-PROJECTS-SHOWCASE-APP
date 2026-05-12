import { useState, useEffect } from "react";
import FormPage from "../components/FormPage";
import ProductPage from "../components/ProductPage";
import SearchBar from "../components/SearchBar";

function AdminPortal() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  // POST=> Called by FormPage after a successful submission 
  function handleAddProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  //PATCH=> Called by ProductPage when admin edits a field 
  function handleUpdateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }

  // DELETE=> Called by ProductPage when admin deletes a product
  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>Admin Portal</h1>
      <FormPage onAdd={handleAddProduct} />
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="product-grid">
        {filtered.map((product) => (
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