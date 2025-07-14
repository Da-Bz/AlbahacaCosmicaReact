import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useCarritoContext } from "../contextos/CarritoContext"; // ✅ usamos el contexto
import "../styles/ProductoDetalle.css";

function ProductoDetalle() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { agregarAlCarrito } = useCarritoContext(); // ✅ usamos función del contexto

    useEffect(() => {
        setCargando(true);
        setError(null);
        fetch("https://68309f786205ab0d6c39d76a.mockapi.io/productos")
            .then((res) => res.json())
            .then((datos) => {
                const productoEncontrado = datos.find((item) => item.id === id);
                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                    console.log("Producto encontrado:", productoEncontrado); // ✅ debug opcional
                } else {
                    setError("Producto no encontrado.");
                }
                setCargando(false);
            })
            .catch((err) => {
                console.log("Error:", err);
                setError("Hubo un error al obtener el producto.");
                setCargando(false);
            });
    }, [id]);

    function agregarAlCarritoHandler() {
        if (cantidad < 1) return;
        dispararSweetBasico(
            "Producto Agregado",
            "El producto fue agregado al carrito con éxito",
            "success",
            "Cerrar"
        );
        agregarAlCarrito({ ...producto, cantidad });
    }

    function sumarContador() {
        setCantidad((c) => c + 1);
    }

    function restarContador() {
        setCantidad((c) => (c > 1 ? c - 1 : c));
    }

    if (cargando) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!producto) return null;

    return (
        <div className="detalle-container">
            <img className="detalle-imagen" src={producto.imagen} alt={producto.name} />
            <div className="detalle-info">
                <h2>{producto.name}</h2>
                <p>{producto.description}</p>
                <p>{producto.price} $</p>

                <div className="detalle-contador">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={restarContador}
                        disabled={cantidad <= 1}
                        aria-label="Disminuir cantidad"
                    >
                        -
                    </Button>
                    <span className="mx-3">{cantidad}</span>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={sumarContador}
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </Button>
                </div>

                <Button variant="primary" onClick={agregarAlCarritoHandler} className="mt-3">
                    Agregar al carrito
                </Button>
            </div>
        </div>
    );
}

export default ProductoDetalle;
