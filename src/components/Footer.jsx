import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="container-logo">
            <img src={logo} alt="Logo de Pizzería Albahaca Cósmica" className="footer-logo" />
          </div>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Siempre Viva 742<br /> Buenos Aires, Argentina.
          </p>
        </div>
        <div className="footer-section">
          <h4>CONTACTO</h4>
          <ul>
            <li>
              <a href="tel:0114303456">
                <FontAwesomeIcon icon={faPhone} /> 011 4303 456
              </a>
            </li>
            <li>
              <a href="https://wa.me/541551223344" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} /> 15 5122 3344
              </a>
            </li>
            <li>
              <a href="mailto:pizzeria-albahaca@email.com">
                <FontAwesomeIcon icon={faEnvelope} /> pizzeria-albahaca@email.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>SECCIONES</h4>
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/nosotros">NOSOTROS</a></li>
            <li><a href="/carta">CARTA</a></li>
            <li><a href="/contacto">CONTACTO</a></li>
          </ul>
        </div>
      </div>
      <small>Copyright &copy; 2024 - Damian Blanez</small>
    </footer>
  );
};

export default Footer;
