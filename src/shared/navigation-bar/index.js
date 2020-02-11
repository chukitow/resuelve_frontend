import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { clearSession } from 'lib/session';

const NavigationBar = () => {
  const history = useHistory();
  const logOut = () => {
    clearSession();
    history.push('/');
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Link to="/" className="navbar-brand">Resuelve</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/admin" className="nav-link">
            Usuarios
          </Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logOut} href="#/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
