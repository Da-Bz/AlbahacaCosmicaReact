import React from "react";
import "../styles/Contact.css";
import { Helmet } from "react-helmet";

function Contact() {
  return (
    <section id="contact">
      <Helmet>
        <title>Albahaca Cósmica 🍕 | Contacto</title>
        <meta name="description" content="Contactanos para pedidos, consultas o sugerencias. Estamos para ayudarte." />
      </Helmet>
      <h1>Contacto</h1>
      <div className="formulario">
        <div className="info">
          <h3>Pizzeria Albahaca Cosmica</h3>
          <ul>
            <li>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              Av. Pte. Peron 1400, San Miguel
            </li>
            <li>
              <i className="fa fa-phone" aria-hidden="true"></i> (11) 1234 5678
            </li>
            <li>
              <i className="fa fa-envelope" aria-hidden="true"></i> info@albahacacosmica.com
            </li>
          </ul>
        </div>
        <div className="contact">
          <form id="contact-form" action="https://formspree.io/f/manyjkjq" method="post">
            <p>
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" required aria-label="Nombre" />
            </p>
            <p>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" required aria-label="Email" />
            </p>
            <p>
              <label htmlFor="phone">Telefono</label>
              <input type="text" name="phone" id="phone" aria-label="Teléfono" />
            </p>
            <p className="full">
              <label htmlFor="message">Mensaje</label>
              <textarea name="message" rows="5" id="message" required aria-label="Mensaje"></textarea>
            </p>
            <p className="full">
              <button id="submit-form" type="submit" aria-label="Enviar formulario de contacto">
                Enviar
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;