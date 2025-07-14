// src/contextos/CarritoContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useProductosContext } from "./ProductosContext"; // Importar el contexto de productos

export const CarritoContext = createContext();

export const useCarritoContext = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);
    // Acceso a productos y la función de actualización (editarProducto)
    const { productos: productosDisponibles, editarProducto } = useProductosContext();

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setProductosCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Guardar en localStorage cuando cambia el carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    }, [productosCarrito]);

    const agregarAlCarrito = async (productoAgregado) => {
        // productoAgregado debe ser el objeto completo del producto que se quiere añadir,
        // incluyendo su 'stock' y 'price' de la base de datos.
        // La 'cantidad' dentro de productoAgregado es la cantidad que el usuario QUIERE AÑADIR AHORA.

        const productoEnDB = productosDisponibles.find(p => p.id === productoAgregado.id);

        if (!productoEnDB || productoEnDB.stock === undefined || productoEnDB.stock === null) {
            toast.error("Error: Stock del producto no disponible en la base de datos.");
            return;
        }

        const cantidadAAgregar = productoAgregado.cantidad || 1; // Cantidad por defecto si no se especifica

        const existeEnCarrito = productosCarrito.find(p => p.id === productoAgregado.id);
        
        let nuevaCantidadEnCarrito = cantidadAAgregar;
        if (existeEnCarrito) {
            nuevaCantidadEnCarrito = existeEnCarrito.cantidad + cantidadAAgregar;
        }

        // Verificar si hay suficiente stock disponible en la DB
        if (nuevaCantidadEnCarrito > productoEnDB.stock) {
            toast.error(`No hay suficiente stock para ${productoAgregado.name}. Stock disponible: ${productoEnDB.stock}.`);
            return;
        }

        // Si hay stock, procede a añadir al carrito
        if (!existeEnCarrito) {
            setProductosCarrito([...productosCarrito, { ...productoAgregado, cantidad: cantidadAAgregar }]);
        } else {
            const carritoActualizado = productosCarrito.map(p =>
                p.id === productoAgregado.id
                    ? { ...p, cantidad: nuevaCantidadEnCarrito }
                    : p
            );
            setProductosCarrito(carritoActualizado);
        }
        
        // Actualizar el stock en la base de datos (MockAPI) inmediatamente.
        // Solo descuenta si se pudo agregar al carrito.
        await editarProducto(productoEnDB.id, { ...productoEnDB, stock: productoEnDB.stock - cantidadAAgregar });
        toast.success(`${productoAgregado.name} agregado al carrito.`);
    };

    // Eliminar producto del carrito (completamente)
    const borrarProductoCarrito = async (id) => {
        const productoAEliminar = productosCarrito.find(p => p.id === id);
        if (!productoAEliminar) return; // Si no está en el carrito, no hacer nada

        const nuevoCarrito = productosCarrito.filter(p => p.id !== id);
        setProductosCarrito(nuevoCarrito);

        // Devolver el stock a la base de datos al eliminar del carrito
        const productoEnDB = productosDisponibles.find(p => p.id === id);
        if (productoEnDB) {
            await editarProducto(productoEnDB.id, { ...productoEnDB, stock: productoEnDB.stock + productoAEliminar.cantidad });
        }
        toast.info(`${productoAEliminar.name} eliminado del carrito.`);
    };

    // Vaciar carrito completo
    const vaciarCarrito = async () => {
        // Devolver todo el stock a la base de datos al vaciar el carrito
        for (const item of productosCarrito) {
            const productoEnDB = productosDisponibles.find(p => p.id === item.id);
            if (productoEnDB) {
                await editarProducto(productoEnDB.id, { ...productoEnDB, stock: productoEnDB.stock + item.cantidad });
            }
        }
        setProductosCarrito([]);
        toast.info("Carrito vaciado.");
    };

    // Calcular total de productos
    const cantidadTotal = productosCarrito.reduce(
        (acc, producto) => acc + producto.cantidad,
        0
    );

    // Calcular total de precio (asumiendo que los productos en carrito tienen 'price')
    const precioTotal = productosCarrito.reduce(
        (acc, producto) => acc + producto.cantidad * parseFloat(producto.price || 0), // Usamos .price
        0
    );

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito,
                agregarAlCarrito,
                borrarProductoCarrito,
                vaciarCarrito,
                cantidadTotal,
                precioTotal,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}