// src/components/FormularioProducto.jsx
import React, { useState, useEffect } from 'react';
import { useProductosContext } from '../contextos/ProductosContext';
import { Button, Form } from 'react-bootstrap';

const FormularioProducto = ({ productoAEditar, onFinish }) => {
  const { agregarProducto, editarProducto } = useProductosContext();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imagen: '',
    stock: 0
  });

  useEffect(() => {
    if (productoAEditar && productoAEditar.id) {
      setFormData(productoAEditar);
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productoAEditar && productoAEditar.id) {
      await editarProducto(productoAEditar.id, formData);
    } else {
      await agregarProducto(formData);
    }
    onFinish(); // cerrar y resetear
    setFormData({ name: '', price: '', description: '', imagen: '', stock: 0 });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name="name" value={formData.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control name="description" value={formData.description} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control name="imagen" value={formData.imagen} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" />
      </Form.Group>

      <Button type="submit" variant="primary">
        {productoAEditar?.id ? 'Guardar cambios' : 'Agregar producto'}
      </Button>
    </Form>
  );
};

export default FormularioProducto;
