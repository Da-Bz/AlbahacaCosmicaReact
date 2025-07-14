import { useState } from "react";
import CarritoCard from "./CarritoCard";
import { useCarritoContext } from "../contextos/CarritoContext"; // Asegurate del path correcto
import "../styles/Carrito.css";

export default function Carrito() {
  const { productosCarrito, borrarProductoCarrito } = useCarritoContext();

  const [cupon, setCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState("");

  const subtotal = productosCarrito.reduce(
    (acc, producto) => acc + parseFloat(producto.price) * producto.cantidad,
    0
  );
  const descuento = subtotal * descuentoAplicado;
  const totalFinal = subtotal - descuento;

  const aplicarCupon = (e) => {
    e.preventDefault();
    if (cupon.trim().toUpperCase() === "DESCUENTO10") {
      setDescuentoAplicado(0.1);
      setMensajeCupon("Cupón válido: 10% de descuento aplicado.");
    } else {
      setDescuentoAplicado(0);
      setMensajeCupon("Cupón inválido o no reconocido.");
    }
  };

  return (
    <CarritoCard
      productosCarrito={productosCarrito}
      funcionBorrar={borrarProductoCarrito}
      cupon={cupon}
      setCupon={setCupon}
      aplicarCupon={aplicarCupon}
      mensajeCupon={mensajeCupon}
      subtotal={subtotal}
      descuento={descuento}
      totalFinal={totalFinal}
      descuentoAplicado={descuentoAplicado}
    />
  );
}
