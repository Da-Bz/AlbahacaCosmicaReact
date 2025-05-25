import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Card from '../components/Card';
import About from '../components/About'
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68309f786205ab0d6c39d76a.mockapi.io/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data.slice(0, 4)); // Mostramos solo los primeros 4
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar promociones:", err);
        setError("No se pudieron cargar las promociones.");
        setCargando(false);
      });
  }, []);

  return (
    <main>    
      <About />

        <section className="menu-preview">
          <h2>Promociones Cósmicas</h2>
          <div className="promo-container">
            {cargando && <p>Cargando promociones...</p>}
            {error && <p>{error}</p>}
            {!cargando && !error && productos.map((producto) => (
              <Card key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        <Testimonial />
        <Contact />
        
    </main>
  );
};

export default Home;

