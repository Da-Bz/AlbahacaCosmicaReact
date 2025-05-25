import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';

export default function Login({ setLogeadoUser, setLogeadoAdmin, user, admin }) {
  return (
    <div className="login-container">
      <h2 className="login-title">Acceso al sistema</h2>

      <div className="login-buttons">
        <NavLink
          to="/perfil"
          className={`btn ${user ? 'btn-logout' : 'btn-login-user'}`}
          onClick={() => setLogeadoUser(!user)}
        >
          {user ? "Cerrar sesión Usuario" : "Iniciar sesión Usuario"}
        </NavLink>

        <NavLink
          to="/perfil"
          className={`btn ${admin ? 'btn-logout' : 'btn-login-admin'}`}
          onClick={() => setLogeadoAdmin(!admin)}
        >
          {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
        </NavLink>
      </div>
    </div>
  );
}
