import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Home from './layouts/Home';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import ProductosContainer from './components/ProductosContainer';
import ProductoDetalle from './components/ProductoDetalle';
import Carrito from './components/Carrito';
import Header from './components/Header';
import About from './components/About';
import Contacto from './components/Contact';
import Admin from './components/Admin';
import Carta from "./components/Carta";
import Login from "./components/Login";
import Perfil from './components/Perfil';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [adminLogeado, setAdminLogeado] = useState(false);
  const location = useLocation();
  const mostrarHeader = location.pathname === '/' || location.pathname.startsWith('/carta');

  // Función para agregar productos al carrito
  function funcionCarrito(producto) {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      const carritoActualizado = productosCarrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: (p.cantidad || 0) + (producto.cantidad || 1) }
          : p
      );
      setProductosCarrito(carritoActualizado);
    } else {
      setProductosCarrito([...productosCarrito, { ...producto }]);
    }
  }

  // Función para eliminar productos del carrito
  function borrarProductoCarrito(id) {
    const nuevoCarrito = productosCarrito.filter(p => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  // Funciones para manejo de usuario/admin
  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUsuer() {
    setUsuarioLogeado(!usuarioLogeado);
  }
  
  return (
    <>
      <header className="marquee-container">
        <div className="marquee-content">
          ¡Proba nuestros sabores cósmicos! CUPON DE DESCUENTO: DESCUENTO10
        </div>
      </header>

      <Navbar productosCarrito={productosCarrito} />
      {mostrarHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <Login
            user={usuarioLogeado}
            admin={adminLogeado}
            setLogeadoAdmin={manejarAdmin}
            setLogeadoUser={manejarUsuer}
          />
        } />
        <Route path="/perfil" element={
          <Perfil
            user={usuarioLogeado}
            admin={adminLogeado}
            setLogeadoUser={manejarUsuer}
            setLogeadoAdmin={manejarAdmin}
          />
        } />
        <Route path="/admin" element={
          adminLogeado ? <Admin /> : <Navigate to="/login" replace />
        } />
        <Route path="/productos" element={<ProductosContainer />} />
        <Route path="/carta" element={<Carta />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              productosCarrito={productosCarrito}
              funcionBorrar={borrarProductoCarrito}
            />
          }
        />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos/:id" element={<ProductoDetalle funcionCarrito={funcionCarrito} />} />
        <Route
          path="/admin"
          element={adminLogeado ? <Admin /> : <Navigate to="/login" replace />}
        />
      </Routes>

      <Footer />
      </>
  );
}

export default App;
