import { useEffect, useState } from "react";
import Card from "./Card";


function ProductosContainer() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://68309f786205ab0d6c39d76a.mockapi.io/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError("Hubo un error al cargar los productos.");
                setCargando(false);
            });
    }, []);

    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="productos-container">
            {productos.map((producto) => (
                <Card key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

export default ProductosContainer;
