import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Admin from './pages/AdminPortal'
import LandingPage  from './components/LandingPage'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/Admin' element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
