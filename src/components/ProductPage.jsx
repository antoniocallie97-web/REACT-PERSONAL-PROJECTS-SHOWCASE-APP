
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

const css = `
  
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
 
  /* ── ROOT WRAPPER — holds the full page and its mode class ── */
  .shop-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: background 0.5s ease, color 0.4s ease;
    position: relative;
    overflow: hidden;
  }
 
  /* ════════════════════════════════════════
     DARK MODE  (default)
     Slightly brighter than before —
     base #1a2b45 instead of #0b1525.
     Static radial gradients mimic the
     blob positions from the old canvas.
  ════════════════════════════════════════ */
  .shop-root.dark {
    color: #f0f9ff;
 
    background:
      radial-gradient(ellipse 60% 55% at 22% 28%,  rgba(37,99,235,0.55)  0%, transparent 65%),
      radial-gradient(ellipse 50% 48% at 74% 58%,  rgba(29,78,216,0.42)  0%, transparent 62%),
      radial-gradient(ellipse 45% 42% at 52% 12%,  rgba(56,130,246,0.38) 0%, transparent 60%),
      radial-gradient(ellipse 40% 45% at 12% 75%,  rgba(30,64,175,0.35)  0%, transparent 58%),
      radial-gradient(ellipse 42% 38% at 85% 18%,  rgba(14,60,140,0.38)  0%, transparent 60%),
      radial-gradient(ellipse 38% 40% at 63% 82%,  rgba(59,130,246,0.30) 0%, transparent 58%),
      #1a2b45;
  }
 
  /* ════════════════════════════════════════
     LIGHT MODE
     Warm sky-blue gradient — same blob
     positions as dark, just light colors.
  ════════════════════════════════════════ */
  .shop-root.light {
    color: #0c1a35;
 
    background:
      radial-gradient(ellipse 60% 55% at 22% 28%,  rgba(147,197,253,0.75) 0%, transparent 65%),
      radial-gradient(ellipse 50% 48% at 74% 58%,  rgba(96,165,250,0.55)  0%, transparent 62%),
      radial-gradient(ellipse 45% 42% at 52% 12%,  rgba(186,230,253,0.65) 0%, transparent 60%),
      radial-gradient(ellipse 40% 45% at 12% 75%,  rgba(125,185,252,0.50) 0%, transparent 58%),
      radial-gradient(ellipse 42% 38% at 85% 18%,  rgba(59,130,246,0.35)  0%, transparent 60%),
      radial-gradient(ellipse 38% 40% at 63% 82%,  rgba(172,216,255,0.55) 0%, transparent 58%),
      #dbeafe;
  }
 
  
  /* ════════════════════════════════════════
     NAVBAR
  ════════════════════════════════════════ */
  .shop-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(18px);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    transition: background 0.4s ease, border-color 0.4s ease;
  }
  .dark  .shop-nav { background: rgba(15,25,50,0.55);    border-bottom-color: rgba(255,255,255,0.08); }
  .light .shop-nav { background: rgba(219,234,254,0.60); border-bottom-color: rgba(12,26,53,0.10);   }
 
  /* Nav buttons */
  .shop-nav-item {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    letter-spacing: 0.01em;
    padding: 0.25rem 0;
    cursor: pointer;
    background: none; border: none;
    transition: color 0.2s, border-color 0.2s;
  }
  .dark  .shop-nav-item         { color: rgba(255,255,255,0.6);  }
  .dark  .shop-nav-item:hover   { color: #fff; }
  .dark  .shop-nav-item.active  { color: #fff; font-weight: 700; border-bottom: 2px solid #fff; padding-bottom: 0.1rem; }
  .light .shop-nav-item         { color: rgba(12,26,53,0.55);    }
  .light .shop-nav-item:hover   { color: #0c1a35; }
  .light .shop-nav-item.active  { color: #0c1a35; font-weight: 700; border-bottom: 2px solid #0c1a35; padding-bottom: 0.1rem; }
 
  /* Nav right cluster: toggle + admin button */
  .shop-nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
 
  /* ── DARK / LIGHT TOGGLE BUTTON ── */
  .shop-toggle {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    border-radius: 100px;
    padding: 0.4rem 0.9rem;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    border-width: 1px;
    border-style: solid;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
  }
  .dark  .shop-toggle {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
    color: #fff;
  }
  .dark  .shop-toggle:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.35);
  }
  .light .shop-toggle {
    background: rgba(255,255,255,0.55);
    border-color: rgba(12,26,53,0.18);
    color: #0c1a35;
  }
  .light .shop-toggle:hover {
    background: rgba(255,255,255,0.8);
    border-color: rgba(12,26,53,0.3);
  }
  .shop-toggle-icon { font-size: 1rem; }
 
  /* ════════════════════════════════════════
     BODY ROW
  ════════════════════════════════════════ */
  .shop-body {
    display: flex;
    flex: 1;
    position: relative;
    z-index: 1;
  }
 
  
  /* Custom radio circle */
  .shop-radio {
    width: 13px; height: 13px;
    border-radius: 50%;
    border-width: 1.5px; border-style: solid;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }
  .dark  .shop-radio                          { border-color: rgba(255,255,255,0.3); }
  .dark  .shop-filter-label.selected .shop-radio { border-color: #fff; }
  .light .shop-radio                          { border-color: rgba(12,26,53,0.3);   }
  .light .shop-filter-label.selected .shop-radio { border-color: #0c1a35; }
 
  .shop-radio-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .dark  .shop-radio-dot { background: #fff; }
  .light .shop-radio-dot { background: #0c1a35; }
  .shop-filter-label.selected .shop-radio-dot { opacity: 1; }
 
  /* ════════════════════════════════════════
     MAIN AREA
  ════════════════════════════════════════ */
  .shop-main {
    flex: 1;
    padding: 2rem 2rem 6rem;
    overflow-y: auto;
  }
 
  .shop-results-count {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    transition: color 0.4s;
  }
  .dark  .shop-results-count { color: rgba(255,255,255,0.35); }
  .light .shop-results-count { color: rgba(12,26,53,0.4);     }
 
  /* 4-column grid */
  .shop-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
 
  
 
  /* Empty state */
  .shop-empty {
    grid-column: 1 / -1;
    text-align: center; padding: 4rem;
    font-size: 0.9rem; transition: color 0.4s;
  }
  .dark  .shop-empty { color: rgba(255,255,255,0.3); }
  .light .shop-empty { color: rgba(12,26,53,0.35);   }
 
  /* ════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════ */
  @media (max-width: 1100px) { .shop-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 820px)  {
    .shop-sidebar { display: none; }
    .shop-grid    { grid-template-columns: repeat(2, 1fr); }
    .shop-nav     { padding: 1rem 1.5rem; }
  }
  @media (max-width: 500px)  { .shop-grid { grid-template-columns: 1fr; } }
`;
 

 
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
 
  const mode = dark ? "dark" : "light";
 
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
