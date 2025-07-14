import React, { useEffect, useState } from 'react';
import { useProductosContext } from '../contextos/ProductosContext';
import { useSearch } from '../contextos/SearchContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import About from '../components/About';
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';
import Card from '../components/Card';

const Home = () => {
  const { productos, loading, error } = useProductosContext();
  const { searchTerm } = useSearch();

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    // promociones: primeros 4 productos
    setPromociones(productos.slice(0, 4));
  }, [productos]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setProductosFiltrados([]);
    } else {
      const filtrados = productos.filter(prod =>
        (prod.name && prod.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setProductosFiltrados(filtrados);
    }
  }, [searchTerm, productos]);

  return (
    <main className="container my-5">
      <Helmet>
        <title>Inicio | Albahaca Cósmica</title>
        <meta
          name="description"
          content="Descubre el sabor único de nuestras pizzas artesanales. ¡Pide ahora y disfruta!"
        />
      </Helmet>

      {searchTerm.trim() !== '' ? (
        <>
          <h2 className="text-center mb-4" style={{ color: '#B52A04' }}>
            Resultados de búsqueda para "{searchTerm}"
          </h2>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando productos...</span>
              </div>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <section aria-label="Listado de productos" className="row justify-content-center mb-5">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((prod) => (
                <div className="card m-3" key={prod.id} style={{ width: '18rem' }}>
                  <div className="image">
                    <img src={prod.imagen || 'https://via.placeholder.com/250x200'} alt={prod.name} />
                  </div>
                  <div className="content p-3">
                    <h3>{prod.name}</h3>
                    <p>${prod.price}</p>
                    <Link to={`/producto/${prod.id}`} className="btn btn-warning">
                      Ver detalles del producto
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p className="text-center mt-4">No se encontraron productos que coincidan con tu búsqueda.</p>
            )}
          </section>
        </>
      ) : (
        <>
          {/* Contenido normal sin búsqueda */}
          <section className="menu-preview mb-5">
            <h2>Promociones Cósmicas</h2>
            <div className="promo-container d-flex flex-wrap justify-content-center">
              {loading && <p>Cargando promociones...</p>}
              {!loading && promociones.length === 0 && <p>No hay promociones disponibles.</p>}
              {!loading &&
                promociones.map((producto) => (
                  <Card key={producto.id} producto={producto} />
                ))}
            </div>
          </section>

          <About />
          <Testimonial />
          <Contact />
        </>
      )}
    </main>
  );
};

export default Home;