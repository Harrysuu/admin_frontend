import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Navigator() {
  console.log(111)
  const history = useHistory;

  function logout() {
    localStorage.removeItem('userId')
    history.push('login/page')
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="/Logo.png" alt="" style={{ width: '20%' }} /> Alumni
            Circle
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">ManageUser</Nav.Link>
            <Nav.Link href="/ManageAdmin">ManageAdmin</Nav.Link>
            <Nav.Link href="/academic/page">AcademicPost</Nav.Link>
            <Nav.Link href="/secondPost/page">SecondPost</Nav.Link>
          </Nav>

          <span style={{ margin: '0 10px' }}></span>
          <Button href="/" onClick={logout}>
            Logout
          </Button>

        </Container>
      </Navbar>
    </>
  );
}

