// src/components/NavBar.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { CarritoContext } from "../contextos/CarritoContext";
import { useAuthContext } from "../contextos/AuthContext";
import { useSearch } from "../contextos/SearchContext";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/Nav.css";

function NavBar() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin, logout } = useAuthContext();
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const totalCantidad = productosCarrito.reduce((acc, prod) => acc + (prod.cantidad || 0), 0);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Navbar className="custom-navbar" expand="lg" sticky="top" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-name ms-2">Albahaca Cósmica</span>
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse>
          <Form className="d-flex my-2 my-lg-0 mx-auto nav-search-form">
            <FormControl
              type="search"
              placeholder="Buscar productos..."
              className="me-2 custom-search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/carrito" className="cart-link position-relative">
              <FaShoppingCart />
              {totalCantidad > 0 && (
                <span className="cart-count">{totalCantidad}</span>
              )}
            </Nav.Link>

            {user || admin ? (
              <>
                <Nav.Link as={Link} to="/perfil" title="Perfil">
                  <FaUser className="me-1" />
                  {admin ? 'Admin' : user?.nombre || 'Usuario'}
                </Nav.Link>
                <Nav.Link
                  as="button"
                  className="btn btn-link nav-link"
                  onClick={logout}
                  title="Cerrar sesión"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  <FaSignOutAlt />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" title="Iniciar sesión">
                <FaUser />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
