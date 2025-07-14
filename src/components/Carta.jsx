import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/Carta.css";
import { Helmet } from "react-helmet";

function Carta() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://68309f786205ab0d6c39d76a.mockapi.io/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    const promos = productos.slice(0, 4);
    const productosRestantes = productos.slice(4);

    return (
        <main>
            <Helmet>
                <title>Albahaca Cósmica 🍕 | Nuestra Carta</title>
                <meta name="description" content="Explorá la carta completa con nuestras pizzas, promociones y más." />
            </Helmet>

            <section id="promos" aria-label="Sección de promociones">
                <h1>Promociones</h1>
                <div className="promos-container">
                    {promos.map((promo) => (
                        <Card key={promo.id} producto={promo} />
                    ))}
                </div>
            </section>

            <section id="carta" aria-label="Sección de productos">
                <h1>Nuestra Carta</h1>
                <div className="carta-container">
                    {productosRestantes.length === 0 ? (
                        <p>No hay productos disponibles</p>
                    ) : (
                        productosRestantes.map((producto) => (
                            <Card key={producto.id} producto={producto} />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

export default Carta;
