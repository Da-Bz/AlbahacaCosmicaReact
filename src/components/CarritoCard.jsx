import "../styles/CarritoCard.css";

export default function CarritoCard({
    productosCarrito,
    funcionBorrar,
    cupon,
    setCupon,
    aplicarCupon,
    mensajeCupon,
    subtotal,
    descuento,
    totalFinal,
    descuentoAplicado,
}) {
    return (
        <div className="main-cart">
            <h1>Carrito de Compras</h1>

            {productosCarrito.length === 0 ? (
                <p style={{ textAlign: "center", margin: "20px" }}>
                    Tu carrito está vacío. ¡Agrega productos para comenzar!
                </p>
            ) : (
                <>
                    <div className="shopping-cart-columns">
                        <div className="table-cart">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosCarrito.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>
                                                <img
                                                    src={producto.imagen}
                                                    alt={producto.name}
                                                    className="prod-img"
                                                />{" "}
                                                {producto.name}
                                            </td>
                                            <td>${parseFloat(producto.price).toFixed(2)}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>
                                                ${(producto.cantidad * parseFloat(producto.price)).toFixed(2)}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-remove"
                                                    onClick={() => funcionBorrar(producto.id)}
                                                    aria-label={`Eliminar ${producto.name} del carrito`}
                                                >
                                                    &times;
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-summary">
                            <h2>Resumen de la Compra</h2>
                            <div className="summary-detail">
                                <div>
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {descuento > 0 && (
                                    <div>
                                        <span>Descuento:</span>
                                        <span>- ${descuento.toFixed(2)}</span>
                                    </div>
                                )}
                                <div>
                                    <span>Total:</span>
                                    <span>${totalFinal.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="btn-primary" id="checkout-btn">
                                Proceder al Pago
                            </button>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <form onSubmit={aplicarCupon}>
                            <label htmlFor="coupon-code">Cupón de Descuento:</label>
                            <input
                                id="coupon-code"
                                type="text"
                                placeholder="Ingrese su cupón"
                                value={cupon}
                                onChange={(e) => setCupon(e.target.value)}
                            />
                            <button type="submit" className="btn-primary">
                                Aplicar Cupón
                            </button>
                        </form>
                        {mensajeCupon && (
                            <p
                                style={{
                                    color: descuentoAplicado > 0 ? "#27ae60" : "red",
                                    marginTop: "0.5rem",
                                    textAlign: "center",
                                }}
                            >
                                {mensajeCupon}
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
