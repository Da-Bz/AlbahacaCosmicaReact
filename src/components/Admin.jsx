import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="container mt-5 text-center">
      <h2>Panel de Administración</h2>
      <p className="mt-3">Bienvenido al área de administración del sitio.</p>
      <NavLink to="/" className="btn btn-outline-secondary mt-4">
        Volver al Inicio
      </NavLink>
    </div>
  );
}
