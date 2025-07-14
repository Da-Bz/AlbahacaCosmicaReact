import React, { useState, useEffect } from 'react';
import { useProductosContext } from '../contextos/ProductosContext';
import { useSearch } from '../contextos/SearchContext';  // <-- importamos buscador global
import { FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import FormularioProducto from './FormularioProducto';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';

const Admin = () => {
  const {
    productos,
    loading,
    error,
    eliminarProducto,
    editarProducto,
  } = useProductosContext();

  const { searchTerm } = useSearch();

  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // Estado con productos filtrados
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(prod =>
        (prod.name && prod.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setProductosFiltrados(filtrados);
    }
  }, [searchTerm, productos]);

  const handleEliminar = () => {
    if (productoAEliminar) {
      eliminarProducto(productoAEliminar.id);
      setMostrarModal(false);
      setProductoAEliminar(null);
    }
  };

  const handleStockChange = async (prodId, currentStock, action) => {
    const productoParaActualizar = productos.find(p => p.id === prodId);
    if (!productoParaActualizar) return;

    let newStock = currentStock;
    if (action === 'increment') {
      newStock = currentStock + 1;
    } else if (action === 'decrement' && currentStock > 0) {
      newStock = currentStock - 1;
    }

    await editarProducto(prodId, { ...productoParaActualizar, stock: newStock });
  };

  return (
    <div className="container my-5">
      <Helmet>
        <title>Panel Admin | Albahaca Cósmica</title>
        <meta name="description" content="Gestión de productos: agregar, editar y eliminar en el panel administrativo." />
      </Helmet>

      <h2 className="text-center mb-4 text-uppercase" style={{ color: '#B52A04' }}>
        Administración de Productos
      </h2>

      {!productoAEditar && (
        <div className="text-end mb-4">
          <Button
            variant="success"
            onClick={() => setProductoAEditar({})}
          >
            ➕ Agregar nuevo producto
          </Button>
        </div>
      )}

      {productoAEditar && (
        <FormularioProducto
          productoAEditar={productoAEditar}
          onFinish={() => setProductoAEditar(null)}
        />
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row justify-content-center" aria-label="Listado de productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <div className="card m-3" key={prod.id} style={{ width: '18rem' }}>
              <div className="image">
                <img src={prod.imagen || 'https://via.placeholder.com/250x200'} alt={prod.name} />
              </div>
              <div className="content p-3">
                <h5>{prod.name}</h5>
                <p><strong>${prod.price}</strong></p>
                <p>{prod.description}</p>

                <div className="stock-control mb-3 d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleStockChange(prod.id, prod.stock || 0, 'decrement')}
                    disabled={(prod.stock || 0) === 0}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-2" style={{ fontWeight: 'bold' }}>
                    Stock: {Number.isFinite(prod.stock) ? prod.stock : 0}
                  </span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleStockChange(prod.id, prod.stock || 0, 'increment')}
                  >
                    <FaPlus />
                  </Button>
                </div>

                <div className="d-flex justify-content-around">
                  <button
                    className="btn"
                    onClick={() => setProductoAEditar(prod)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setProductoAEliminar(prod);
                      setMostrarModal(true);
                    }}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center mt-4">No se encontraron productos que coincidan con la búsqueda.</p>
        )}
      </div>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés eliminar <strong>{productoAEliminar?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
