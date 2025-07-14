import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Nav.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './layouts/Home.jsx';
import Carta from './components/Carta.jsx';
import Admin from './components/Admin.jsx';
import Perfil from './components/Perfil.jsx';
import LoginBoost from './components/LoginBootstrap.jsx';
import ProductosContainer from './components/ProductosContainer.jsx';
import Carrito from './components/Carrito.jsx';
import CarritoCard from './components/CarritoCard.jsx';
import ProductoDetalleBoost from './components/ProductoDetalleBoost.jsx';
import About from './components/About.jsx';
import Contacto from './components/Contact.jsx';
import 'font-awesome/css/font-awesome.min.css';

// Importa el SearchProvider
import { SearchProvider } from './contextos/SearchContext';

function App() {
  return (
    <SearchProvider>
      <header className="marquee-container">
        <div className="marquee-content">
          ¡Proba nuestros sabores cósmicos! CUPON DE DESCUENTO: DESCUENTO10
        </div>
      </header>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin/agregarProductos" element={<Admin />} />
        <Route path="/login" element={<LoginBoost />} />
        <Route path="/productos" element={<ProductosContainer />} />
        <Route path="/productos/:id" element={<ProductoDetalleBoost />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/carrito-card" element={<CarritoCard />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </SearchProvider>
  );
}

export default App;
