import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contextos/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function LoginBoost() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    const { login, user, logout, admin } = useAuthContext();
    const navigate = useNavigate();

    // Cerrar sesión
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    // Iniciar sesión con Firebase
    const iniciarSesionEmailPass = async (e) => {
        e.preventDefault();
        try {
            await loginEmailPass(usuario, password);
            login(usuario);
            dispararSweetBasico("Inicio de sesión exitoso", "", "success", "Aceptar");
            navigate('/');
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
            } else {
                console.error("Error al iniciar sesión:", error);
            }
        }
    };

    // Registrar usuario
    const registrarUsuario = async (e) => {
        e.preventDefault();
        try {
            await crearUsuario(usuario, password);
            login(usuario);
            dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
            navigate('/');
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                dispararSweetBasico("Credenciales inválidas", "", "error", "Cerrar");
            } else if (error.code === "auth/weak-password") {
                dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
            } else {
                console.error("Error al registrar:", error);
            }
        }
    };

    // Alternar vista entre login y registro
    const alternarFormulario = (e) => {
        e.preventDefault();
        setMostrarRegistro(!mostrarRegistro);
    };

    // Si ya hay usuario logueado
    if (user || admin) {
        return (
            <form onSubmit={handleLogout} className="d-flex flex-column align-items-center p-4">
                <p>Sesión activa como: <strong>{user || admin}</strong></p>
                <button type="submit" className="btn btn-danger">Cerrar sesión</button>
            </form>
        );
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            {!mostrarRegistro ? (
                <form onSubmit={iniciarSesionEmailPass} className="p-4 border rounded shadow w-50">
                    <h2>Iniciar sesión</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            required
                            autoComplete="email"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                    <button className="btn btn-link mt-2" onClick={alternarFormulario}>¿No tenés cuenta? Registrate</button>
                </form>
            ) : (
                <form onSubmit={registrarUsuario} className="p-4 border rounded shadow w-50">
                    <h2>Registrarse</h2>
                    <div className="mb-3">
                        <label htmlFor="registroEmail" className="form-label">Email</label>
                        <input
                            id="registroEmail"
                            type="email"
                            className="form-control"
                            required
                            autoComplete="email"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registroPass" className="form-label">Contraseña</label>
                        <input
                            id="registroPass"
                            type="password"
                            className="form-control"
                            required
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                    <button className="btn btn-link mt-2" onClick={alternarFormulario}>¿Ya tenés cuenta? Iniciá sesión</button>
                </form>
            )}
        </div>
    );
}

export default LoginBoost;
