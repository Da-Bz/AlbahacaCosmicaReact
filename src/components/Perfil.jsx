// src/components/Perfil.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../contextos/AuthContext';

export default function Perfil() {
    const { user, admin, logout } = useAuthContext();

    return (
        <div className="container mt-5 text-center">
            {user && !admin && (
                <>
                    <h2>Bienvenido, Usuario</h2>
                    <p>Has iniciado sesión correctamente como usuario.</p>
                    <button className="btn btn-danger mt-3" onClick={logout}>
                        Cerrar sesión
                    </button>
                </>
            )}

            {admin && (
                <>
                    <h2>Bienvenido, Admin</h2>
                    <p>Has iniciado sesión correctamente como administrador.</p>
                    <div className="d-flex flex-column gap-3 mt-4 align-items-center">
                        <NavLink to="/admin/agregarProductos" className="btn btn-success w-50">
                            ➕ Agregar producto
                        </NavLink>
                        <NavLink to="/admin" className="btn btn-warning w-50">
                            📦 Ver productos y stock
                        </NavLink>
                    </div>
                    <button className="btn btn-danger mt-4" onClick={logout}>
                        Cerrar sesión
                    </button>
                </>
            )}

            {!user && !admin && (
                <>
                    <h2>No has iniciado sesión</h2>
                    <p>Por favor, inicia sesión para acceder a esta página.</p>
                    <NavLink to="/login" className="btn btn-primary mt-3">
                        Ir a Login
                    </NavLink>
                </>
            )}
        </div>
    );
}
