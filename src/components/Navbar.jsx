import { Link, useLocation } from 'react-router-dom'

function Navbar({ cartCount = 0 , theme , toggleTheme}) {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const showCartLink =
    pathname.startsWith('/shop') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/products');

//   return (
//     <nav className="nav-bar">
//       <h2 style={{color: 'var(--accent)'}}>AuRevia</h2>
//       <div className='links'>
//         <Link to='/'>Home</Link>
//         <Link to='/Admin'>Admin</Link>
//         <Link to='/Shop'>Shop</Link>
//         {showCartLink && <Link to='/Cart'>Cart ({cartCount})</Link>}
//         <button onClick={toggleTheme} className="btn-primary" style={{marginLeft: '20px'}}>
//           {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
//         </button>
//       </div>
//     </nav>

//   )
// }

return (
    <nav className="navbar-container">
      {/* 1. Left Section: Brand */}
      <div className="nav-brand">
        <Link to="/">AuRevia</Link>
      </div>

      {/* 2. Center Section: Navigation (Centered & Visible) */}
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
        {showCartLink && <Link to='/Cart'>Cart ({cartCount})</Link>}
      </div>

      {/* 3. Right Section: Utils */}
      <div className="nav-utils">
        <span className="cart-count">Cart (0)</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar 
