import React, { useState, useEffect } from 'react';
import equipo from '../assets/equipo.jpg';
import "../styles/Home.css"

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="nosotros" style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Sobre Nosotros</h1>
      <div
        className="about-container"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div className="about-content" style={{ flex: 1 }}>
          <h3>¿Quiénes somos?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum lacus vel quam placerat sagittis. Cras blandit vehicula eros, sed feugiat arcu efficitur sed. Aenean sit amet lacus justo. Sed ante felis, suscipit vulputate semper aliquam, suscipit ac ante. Sed at ante imperdiet, ultrices enim eget, semper massa. Ut laoreet lacus augue, ac venenatis tellus sollicitudin eu. Pellentesque hendrerit, velit a lacinia malesuada, nunc dui rutrum neque, ut mattis mi libero eu libero.
          </p>
          <p>¡Conoce más sobre nuestros productos y servicios!</p>
        </div>
        <div className="about-image" style={{ flex: 1 }}>
          <img src={equipo} alt="Nuestro equipo" style={{ width: "100%", borderRadius: "8px" }} />
        </div>
      </div>
    </section>
  );
}

export default About;
