
import { useState, useEffect } from 'react'

// function ProductPage() {
//   return (
//     <div>ProductPage</div>
//   )
// }
// export default ProductPage

const ALL_PRODUCTS = [
  
];
 
const CATEGORIES = [];
 
/* ─────────────────────────────────────────────────────
   CSS — two complete themes controlled by .dark / .light
   on the root wrapper div. Transition on all color props
   gives a smooth animated swap on toggle.
───────────────────────────────────────────────────── */



 
/* ── Main component ── */
function Shop() {
  const [dark,     setDark]     = useState(true);   // true = dark, false = light
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
 
  /* Inject CSS once on mount */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
 
  /* Filter products by search + category */
  const filtered = ALL_PRODUCTS.filter(p => {
    const matchCat    = category === "All" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
 
  // const mode = dark ? "dark" : "light";
 
  return (
    <div className={`shop-root ${mode}`}>
 
      
      {/* ── NAVBAR ── */}
      <nav className="shop-nav">
 
        {/* Left: Home */}
        <button className="shop-nav-item">Home</button>
 
        {/* Centre: Shop (active, underlined) */}
        <button className="shop-nav-item active">Shop</button>
 
        {/* Right: toggle + Admin Portal */}
        <div className="shop-nav-right">
 
          {/* Dark / Light toggle */}
          <button
            className="shop-toggle"
            onClick={() => setDark(d => !d)}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="shop-toggle-icon">{dark ? "☀️" : "🌙"}</span>
            {dark ? "Light" : "Dark"}
          </button>
 
          <button className="shop-nav-item">Admin Portal</button>
        </div>
      </nav>
 
      {/* ── BODY ── */}
      <div className="shop-body">
 
        {/* Sidebar: search + category filters */}
        <aside className="shop-sidebar">
 
         
          <div className="shop-filters">
            {CATEGORIES.map(cat => (
              <div
                key={cat}
                className={`shop-filter-label${category === cat ? " selected" : ""}`}
                onClick={() => setCategory(cat)}
              >
                <div className="shop-radio">
                  <div className="shop-radio-dot" />
                </div>
                {cat}
              </div>
            ))}
          </div>
 
        </aside>
 
        {/* Main product grid */}
        <main className="shop-main">
 
          <div className="shop-results-count">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </div>
 
          <div className="shop-grid">
            {filtered.length === 0 ? (
              <div className="shop-empty">No products match your search.</div>
            ) : (
              filtered.map(p => (
                <div className="shop-card" key={p.id}>
                  <div className="shop-card-name">{p.name}</div>
                  <div className="shop-card-divider" />
                  <div className="shop-card-desc">{p.description}</div>
                  <div className="shop-card-divider" />
                  <div className="shop-card-meta">
                    <div className="shop-card-category">{p.category}</div>
                    <div className="shop-card-price">${p.price.toFixed(2)}</div>
                  </div>
                  <Stars rating={p.rating} />
                </div>
              ))
            )}
          </div>
 
        </main>
      </div>
    </div>
  );
}



// Incoming code from main branch



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
