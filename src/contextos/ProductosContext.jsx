// src/contextos/ProductosContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

export const ProductosContext = createContext();

const API_URL = "https://68309f786205ab0d6c39d76a.mockapi.io/productos";

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProductos(data);
            setProductosOriginales(data);
        } catch (err) {
            setError("Error al cargar productos: " + err.message);
            toast.error("Error al obtener los productos");
        } finally {
            setLoading(false);
        }
    };

    const agregarProducto = async (nuevoProducto) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProductos((prev) => [...prev, data]);
            setProductosOriginales((prev) => [...prev, data]);
            toast.success("Producto agregado con éxito");
        } catch (err) {
            setError("Error al agregar producto: " + err.message);
            toast.error("No se pudo agregar el producto");
        }
    };

    const editarProducto = async (id, productoActualizado) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoActualizado),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProductos((prev) => prev.map((p) => (p.id === id ? data : p)));
            setProductosOriginales((prev) => prev.map((p) => (p.id === id ? data : p)));
            toast.success("Producto actualizado correctamente");
        } catch (err) {
            setError("Error al actualizar producto: " + err.message);
            toast.error("No se pudo actualizar el producto");
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setProductos((prev) => prev.filter((p) => p.id !== id));
            setProductosOriginales((prev) => prev.filter((p) => p.id !== id));
            toast.success("Producto eliminado");
        } catch (err) {
            setError("Error al eliminar producto: " + err.message);
            toast.error("No se pudo eliminar el producto");
        }
    };

    const obtenerProducto = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProductoEncontrado(data);
            return data;
        } catch (err) {
            toast.error("Error al obtener el producto: " + err.message);
            throw new Error("Producto no encontrado");
        }
    };

    const filtrarProductos = (filtro) => {
        if (filtro.trim() === "") {
            setProductos(productosOriginales);
            return;
        }
        const filtrados = productosOriginales.filter((producto) =>
            // Aseguramos que 'name' y 'descripcion' existan y sean strings antes de toLowerCase
            // Usamos 'price' en lugar de 'precio'
            (producto.name && String(producto.name).toLowerCase().includes(filtro.toLowerCase())) ||
            (producto.descripcion && String(producto.descripcion).toLowerCase().includes(filtro.toLowerCase()))
        );
        setProductos(filtrados);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider
            value={{
                productos,
                productoEncontrado,
                loading,
                error,
                agregarProducto,
                editarProducto,
                eliminarProducto,
                obtenerProducto,
                filtrarProductos,
                fetchProductos,
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
};

export const useProductosContext = () => useContext(ProductosContext);