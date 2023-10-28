import axios from 'axios';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

export default function Navigator() {
  console.log(111)

  const handleLogout = async (e) => {
    try {
      await axios.get('/admin/logout');
      localStorage.removeItem('adminId');
      window.location.href='/'
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="/Logo.png" alt="" style={{ width: '10%' }} /> Alumni
            Circle Management System
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/ManageUser/page">Users</Nav.Link>
            <Nav.Link href="/ManageAdmin/page">Administrators</Nav.Link>
            <Nav.Link href='/ManageAnnounce/page'>Announcement</Nav.Link>
            <Nav.Link href="/ManageLifePost/page">Life</Nav.Link>
            <Nav.Link href='/ManageForumPost/page'>Forum</Nav.Link>
            <Nav.Link href="/secondPost/page">SecondHand</Nav.Link>
          </Nav>

          <span style={{ margin: '0 10px' }}></span>
          <Button  onClick={handleLogout}>
            Logout
          </Button>

        </Container>
      </Navbar>
    </>
  );
}

