import React from 'react';
import "../styles/Card.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";


const Card = ({ producto }) => {
  if (!producto) {
    console.warn("Producto es undefined en Card"); 
    return null;
  }

  return (
    <div className="card">
      <div className="image">
        <Link to={`/productos/${producto.id}`}>
          <img src={producto.imagen} alt={producto.name} />
        </Link>
      </div>

      <div className="content">
        <h3>{producto.name}</h3>
        <p>${producto.price}</p>
        <Link to={`/productos/${producto.id}`}>
          <button className="btn">Ver detalles del producto</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;