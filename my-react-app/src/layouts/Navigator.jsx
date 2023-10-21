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
          </Navbar.Brand>1

          <Nav className="me-auto">
            <Nav.Link href="/ManageUser/page">Users</Nav.Link>
            <Nav.Link href="/ManageAdmin/page">Administrators</Nav.Link>
            <Nav.Link href='ManageAnnounce/page'>Announcement</Nav.Link>
            <Nav.Link href="/ManageLifePost/page">Life</Nav.Link>
            <Nav.Link href='/ManageForumPost/page'>Forum</Nav.Link>
            <Nav.Link href="/secondPost/page">SecondHand</Nav.Link>
          </Nav>

          <span style={{ margin: '0 10px' }}></span>
          <Button href="/login/page" onClick={logout}>
            Logout
          </Button>

        </Container>
      </Navbar>
    </>
  );
}

