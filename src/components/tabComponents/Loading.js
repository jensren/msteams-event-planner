import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return <Container fluid className="py-4">
    <Row>
      <Spinner animation="border" className="mx-auto" />
    </Row>
  </Container>;
}
