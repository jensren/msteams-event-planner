import React, { useState } from 'react';
import { render } from 'react-dom';
import { Providers } from '@microsoft/mgt';
import { Client } from '@microsoft/microsoft-graph-client';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import map_example from '../../images/map_example.png';

import { getManager } from '../GraphService'


function newEventTemplate(manager) {

  return (
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title><h3>Invite {manager.displayName} for Lunch</h3></Card.Title>
          <Card.Text>Suggested time: 1pm Tuesday</Card.Text>
          <Card.Text>Suggested location: 123 XYZ St.</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="#">{manager.displayName}'s Route</Card.Link>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title><h3>Map</h3></Card.Title>
          <p>Estimated driving time: 15 mins</p>
        </Card.Body>
        <Card.Img src={map_example} />
      </Card>
      <Card>
        <Card.Body>
          <Card.Title><h3>Suggested Restaurants</h3></Card.Title>
          <ListGroup>
            <ListGroup.Item>Yuzu Sushi</ListGroup.Item>
            <ListGroup.Item>Nico's Sandwiches</ListGroup.Item>
            <ListGroup.Item>Roman Pizzeria</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};


export default function EventLaunch(props) {
  const query = props.history.location.state.query

  const [manager, setManager] = useState(null);


  const options = {
    authProvider: Providers.globalProvider,
  };

  const client = Client.initWithMiddleware(options);

  async function pageLoad() {
    setManager(await getManager(client));
  }

  pageLoad();


  const loadingTemplate = (
    <Container fluid className="py-4">
      <Row >
        <Spinner animation="border" className="mx-auto" />
      </Row>
    </Container>
  );


  return (
    <React.Fragment>
      <h2>New Event: {query}</h2>
      {manager ? newEventTemplate(manager) : loadingTemplate}

    </React.Fragment>
  );
}