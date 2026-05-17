import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlineShop, AiOutlineSetting, AiOutlineShoppingCart } from 'react-icons/ai'

function Navbar({ cartCount = 0, theme, toggleTheme }) {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const showCartLink =
    pathname.startsWith('/shop') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/products');

  return (
    <nav className="navbar-container">
      {/* 1. Left Section: Brand */}
      <div className="nav-brand">
        <Link to="/">AuRevia</Link>
      </div>

      {/* 2. Center Section: Navigation */}
      <div className="nav-menu">
        <Link to="/" className="nav-link">
          <AiOutlineHome /> Home
        </Link>
        <Link to="/shop" className="nav-link">
          <AiOutlineShop /> Shop
        </Link>
        <Link to="/admin" className="nav-link">
          <AiOutlineSetting /> Admin
        </Link>
        <Link to="/cart" className="nav-link">
          <AiOutlineShoppingCart /> Cart ({cartCount})
        </Link>
      </div>

      {/* 3. Right Section: Utils */}
      <div className="nav-utils">
        {showCartLink && (
          <span className="cart-count">
            <AiOutlineShoppingCart /> Cart ({cartCount})
          </span>
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar