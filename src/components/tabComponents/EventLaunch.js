import React from 'react';
import { render } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import map_example from '../../images/map_example.png';
import { ListGroup } from 'react-bootstrap';


export default function EventLaunch(props) {
  const query = props.history.location.state.query

  return (
    <React.Fragment>
      <h2>New Event: {query}</h2>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Invite Rick for Lunch</Card.Title>
            <Card.Text>Suggested time: 1pm Tuesday</Card.Text>
            <Card.Text>Suggested location: 123 XYZ St.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Map</Card.Title>
            <p>Estimated driving time: 15 mins</p>
          </Card.Body>
          <Card.Img src={map_example} />
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Suggested Restaurants</Card.Title>
            <ListGroup>
              <ListGroup.Item>Yuzu Sushi</ListGroup.Item>
              <ListGroup.Item>Nico's Sandwiches</ListGroup.Item>
              <ListGroup.Item>Roman Pizzeria</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardDeck>
    </React.Fragment>
  );
}