import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.png';

const Navbar = ({ productosCarrito }) => {
  const totalCantidad = productosCarrito.reduce(
    (acc, producto) => acc + (producto.cantidad || 0),
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú cada vez que cambia la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-name">Pizzería Albahaca Cósmica</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu} // Controlamos el toggle con estado
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Aplicamos clase 'show' si isOpen es true */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carta">
                Carta
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">
                Sobre Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link cart-link" to="/carrito">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="cart-count">{totalCantidad}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" title="Iniciar sesión">
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.3rem' }} />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;