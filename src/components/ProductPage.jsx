import { useEffect, useState } from "react";

function getFallbackImage(product) {
  const label = encodeURIComponent(product?.name || "Product image");
  return `https://dummyjson.com/image/420x300/e5e7eb/111827?text=${label}`;
}

function ProductCard({ product }) {
  const fallbackImage = getFallbackImage(product);
  const [imageSrc, setImageSrc] = useState(product.image || fallbackImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    if (imageSrc !== fallbackImage) {
      setImageSrc(fallbackImage);
      setImageLoaded(false);
      return;
    }

    setImageLoaded(true);
  };

  return (
    <div className="product-card">
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

        <p className="product-category">{product.category}</p>

        <p className="product-brand">Brand: {product.brand}</p>

        <p className="product-price">
          ${product.price}
        </p>

        <button className="product-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductPage({ product }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
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
    return <ProductCard key={`${product.id}-${product.image}`} product={product} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={`${product.id}-${product.image}`} product={product} />
      ))}
    </div>
  );
}

export default ProductPage;
