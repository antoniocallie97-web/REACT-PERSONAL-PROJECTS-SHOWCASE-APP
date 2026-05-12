import { useState, useEffect } from "react";
import ProductPage from "../components/ProductPage";
import SearchBar from "../components/SearchBar";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductPage key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;