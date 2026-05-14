
import { useState, useEffect } from 'react'

function getFallbackImage(product) {
  // Use a generated placeholder if a product image URL fails or is missing.
  const label = encodeURIComponent(product?.name || "Product image");
  return `https://dummyjson.com/image/420x300/e5e7eb/111827?text=${label}`;
}

function ProductCard({ product, onAddToCart }) {
  const fallbackImage = getFallbackImage(product);
  const [imageSrc, setImageSrc] = useState(product.image || fallbackImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    // Try the fallback once, then stop showing the loader.
    if (imageSrc !== fallbackImage) {
      setImageSrc(fallbackImage);
      setImageLoaded(false);
      return;
    }

    setImageLoaded(true);
  };

  return (
    <div className="product-card" style={{ background: 'var(--card-bg)', padding: '15px', borderRadius: '12px' }}>
      <div className="product-image-wrap">
        {!imageLoaded && (
          <div className="image-loader" aria-label="Loading product image">
            <span className="image-spinner" />
          </div>
        )}

        <img
          src={imageSrc}
          alt={product.name}
          className={`product-image ${imageLoaded ? "is-loaded" : ""}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>

        <p className="product-category" style={{ color: 'var(--text-description)', fontSize: '0.9rem' }}>
          {product.category}
        </p>

        <p className="product-brand" style={{ color: 'var(--text-description)', fontSize: '0.9rem' }}>
          Brand: {product.brand}
        </p>

        <p className="product-price">
          ${product.price}
        </p>

        {onAddToCart && (
          <button
            className="product-button"
            onClick={() => onAddToCart(product)}
            type="button"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

function ProductPage({ product, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // When a product is passed in, this component is being used as a single card.
    if (product) return;

    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log(error);
        setError("Unable to load products.");
      });
  }, [product]);

  if (product) {
    return (
      <ProductCard
        key={`${product.id}-${product.image}`}
        product={product}
        onAddToCart={onAddToCart}
      />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={`${product.id}-${product.image}`}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductPage;
