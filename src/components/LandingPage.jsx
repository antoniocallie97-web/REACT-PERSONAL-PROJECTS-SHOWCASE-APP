import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";   

const css= '...';  // ← CSS string from tests/landingpage.test.js

/* ── StarCanvas — live animated background ── */
function StarCanvas() {
  const ref = useRef(null);
 
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, stars, raf;
 
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
 
    function makeStar() {
      return {
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        dx:    (Math.random() - 0.5) * 0.4,
        dy:    (Math.random() - 0.5) * 0.4,
      };
    }
 
    resize();
    stars = Array.from({ length: 120 }, makeStar);
    window.addEventListener("resize", resize);
 
    function draw() {
      ctx.clearRect(0, 0, W, H);
 
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx   = stars[i].x - stars[j].x;
          const dy   = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(14,165,233,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
 
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186,230,253,${s.alpha})`;
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0 || s.x > W) s.dx *= -1;
        if (s.y < 0 || s.y > H) s.dy *= -1;
      }
 
      raf = requestAnimationFrame(draw);
    }
 
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
 
  return <canvas id="star-canvas" ref={ref} />;
}

// ── LandingPage component ──

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