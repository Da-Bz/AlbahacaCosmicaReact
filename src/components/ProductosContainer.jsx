import { useState, useEffect } from "react";
import { useSearch } from "../contextos/SearchContext"; // importamos
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductosContainer() {
  const { searchTerm } = useSearch();  // obtenemos búsqueda global
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Productos filtrados según searchTerm
  const [productosFiltrados, setProductosFiltrados] = useState([]);

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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(
        (producto) =>
          (producto.name &&
            producto.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (producto.description &&
            producto.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setProductosFiltrados(filtrados);
    }
  }, [searchTerm, productos]);

  if (cargando) return <p className="text-center mt-4">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-uppercase" style={{ color: "#B52A04" }}>
        Nuestro Menú Completo
      </h2>

      {searchTerm && (
        <p className="text-center mb-3">
          Resultados de búsqueda para: <strong>{searchTerm}</strong>
        </p>
      )}

      <div className="row justify-content-center">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
            >
              <Card producto={producto} />
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No se encontraron productos que coincidan.</p>
        )}
      </div>
    </div>
  );
}

export default ProductosContainer;
