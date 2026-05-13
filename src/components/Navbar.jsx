import { Link, useLocation } from 'react-router-dom'

function Navbar({ cartCount = 0 }) {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const showCartLink =
    pathname.startsWith('/shop') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/products');

  return (
    <nav>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/Admin'>Admin</Link>
        <Link to='/Shop'>Shop</Link>
        {showCartLink && <Link to='/Cart'>Cart ({cartCount})</Link>}
      </div>
    </nav>
  )
}

export default Navbar 
