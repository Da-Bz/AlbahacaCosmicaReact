import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Perfil({ user, admin, setLogeadoUser, setLogeadoAdmin }) {
    return (
        <div className="container mt-5 text-center">
            {user && !admin && (
                <>
                    <h2>Bienvenido, Usuario</h2>
                    <p>Has iniciado sesión correctamente como usuario.</p>
                    <button
                        className="btn btn-danger mt-3"
                        onClick={() => setLogeadoUser(false)}
                    >
                        Cerrar sesión
                    </button>
                </>
            )}
            {admin && (
                <>
                    <h2>Bienvenido, Admin</h2>
                    <p>Has iniciado sesión correctamente como administrador.</p>
                    <button
                        className="btn btn-danger mt-3"
                        onClick={() => setLogeadoAdmin(false)}
                    >
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
