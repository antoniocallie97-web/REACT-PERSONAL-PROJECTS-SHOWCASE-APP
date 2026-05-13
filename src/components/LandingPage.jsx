import { useState } from 'react'

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();   // ← gives us the navigation function
 
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
 
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
 
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.head.removeChild(el);
    };
  }, []);
 
  return (
    <div>
      <StarCanvas />
 
      {/* ── NAVBAR ── */}
      <nav
        className="sp-nav"
        style={scrolled ? { background: "rgba(2,11,24,0.95)" } : {}}
      >
        {/* Logo — clicking it stays on home (current page) */}
        <div className="sp-logo" onClick={() => navigate("/")}>
          Au<span>Revia</span>
        </div>
 
        {/* Nav links */}
        <ul className="sp-links">
          <li>
            {/* ← FIX: onClick navigates to /shop */}
            <button onClick={() => navigate("/shop")}>Shop</button>
          </li>
        </ul>
 
        {/* Admin Portal button */}
        {/* ← FIX: onClick navigates to /admin */}
        <button className="sp-btn" onClick={() => navigate("/admin")}>
          Admin Portal →
        </button>
      </nav>
 
      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-tag">
          <div className="sp-tag-dot" />
          Admin Portal — React SPA
        </div>
 
        <h1>Welcome To<br /><em>AuRevia</em></h1>
 
        <p className="sp-sub">
          One portal to manage your entire product catalogue — add listings,
          adjust prices, and search everything instantly.
        </p>
 
        <div className="sp-btns">
          {/* ← FIX: goes to /admin */}
          <button className="btn-a" onClick={() => navigate("/admin")}>
            Open Portal →
          </button>
 
          {/* ← FIX: goes to /shop */}
          <button className="btn-b" onClick={() => navigate("/shop")}>
            Browse Products
          </button>
        </div>
      </section>
 
      {/* ── CTA SECTION ── */}
      <div className="sp-cta">
        <h2>Ready to take control?</h2>
        <p>Everything your store needs is one click away.</p>
 
        {/* ← FIX: goes to /admin */}
        <button
          className="btn-a"
          style={{ fontSize: "1rem", padding: "0.9rem 2.2rem" }}
          onClick={() => navigate("/admin")}
        >
          Enter Admin Portal →
        </button>
      </div>
 
      {/* ── FOOTER ── */}
      <footer className="sp-footer">
        <div className="sp-footer-copy">© 2025 AuRevia — React Admin Portal</div>
        <ul className="sp-footer-links">
          {/* ← FIX: footer Shop link also navigates */}
          <li>
            <button onClick={() => navigate("/shop")}>Shop</button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default LandingPage;