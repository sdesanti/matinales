import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Investigadores from './pages/Investigadores'
import Publicaciones from './pages/Publicaciones'
import Noticias from './pages/Noticias'
import Videos from './pages/Videos'
import './index.css'

function App() {
  return (
    <>
       <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/investigadores" element={<Investigadores />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;