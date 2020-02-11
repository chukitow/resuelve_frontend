import React from 'react';
import { Container } from 'react-bootstrap';
import Movements from 'shared/movements';
import NavigationBar from 'shared/navigation-bar';

const Admin = () => {
  return (
    <>
      <NavigationBar />
      <Container className="main-container">
        <h2 className="text-center">Movimientos</h2>
        <Movements />
      </Container>
    </>
  );
}

export default Admin;
