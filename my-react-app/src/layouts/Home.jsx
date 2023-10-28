import React from 'react';
import { Card, Container } from 'react-bootstrap';

const centerTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const headerStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const cardStyle = {
  backgroundColor: 'light',
  padding: '2rem', 
};

export default function Home() {
  return (
    <div style={centerTextStyle}>
      <Card text="dark" style={cardStyle}>
  <Card.Body>
    <Container>
      <div className="jumbotron"> 
        <h1 style={headerStyle}>Welcome to the Alumni Administration Platform
        </h1>
        <p>
        Welcome to the Alumni Administration Platform, your gateway to efficiently
           manage and connect with your alumni community. Discover new ways
            to engage, communicate, and collaborate with alumni from all walks 
            of life. Join us in creating a vibrant alumni network that fosters 
            growth, knowledge sharing, and lifelong connections.
        </p >
      </div>
    </Container>
  </Card.Body>
</Card>
    </div>
  );
}

