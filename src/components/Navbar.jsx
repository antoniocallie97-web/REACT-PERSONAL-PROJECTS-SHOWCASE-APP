import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/Admin'>Admin</Link>
        <Link to='/Shop'>Shop</Link>
      </div>
    </nav>
  )
}

export default Navbar 