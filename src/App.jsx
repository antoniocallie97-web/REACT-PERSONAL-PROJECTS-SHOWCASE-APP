import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Admin from './pages/AdminPortal'
import ProductPage from './components/ProductPage'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/products' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
