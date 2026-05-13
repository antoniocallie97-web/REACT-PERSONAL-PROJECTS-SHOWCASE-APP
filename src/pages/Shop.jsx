import { useState, useEffect } from "react";
import ProductPage from "../components/ProductPage";
import SearchBar from "../components/SearchBar";

function Shop({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Keep both lists: original products for filter options, filtered products for display.
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  return (
    <div>
      {/* Shop uses the default price filters. */}
      <SearchBar products={products} onFilter={setFilteredProducts} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductPage
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
