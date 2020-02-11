import React from 'react';
import { Container } from 'react-bootstrap';
import Users from 'shared/users';
import NavigationBar from 'shared/navigation-bar';

const Admin = () => {
  return (
    <>
      <NavigationBar />
      <Container className="main-container">
        <h2 className="text-center">Usuarios</h2>
        <Users />
      </Container>
    </>
  );
}

export default Admin;
