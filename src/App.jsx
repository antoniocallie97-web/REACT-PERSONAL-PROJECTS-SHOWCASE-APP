import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Admin from './pages/AdminPortal'
import AdminLogin from './components/AdminLogin'
import LandingPage from './components/LandingPage'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import './App.css'

function App() {
  // Keep cart state here so Shop can add items and Cart can edit them.
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function handleUpdateCartItem(productId, quantity) {
    if (quantity < 1) {
      setCartItems((items) => items.filter((item) => item.id !== productId));
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function handleRemoveCartItem(productId) {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  }

  function handleClearCart() {
    setCartItems([]);
  }

  const [theme, setTheme] = useState('dark');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // This effect ensures the CSS variable changes globally when 'theme' updates
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));


  return (
    <>

      {/* Navbar only receives the count; the cart item data stays in App. */}
      <div className="app-wrapper">

        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        />
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/shop' element={<Shop onAddToCart={handleAddToCart} />} />
          <Route
            path='/admin'
            element={
              isAdminAuthenticated ? (
                <Admin onLogout={handleAdminLogout} />
              ) : (
                <AdminLogin onAuthenticate={() => setIsAdminAuthenticated(true)} />
              )
            }
          />
          <Route
            path='/cart'
            element={
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateCartItem}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route path='/products' element={<ProductPage onAddToCart={handleAddToCart} />} />
        </Routes>

      </div>
    </>
  )
}
export default App
