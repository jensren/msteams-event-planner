import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Providers } from '@microsoft/mgt';
import { Client } from '@microsoft/microsoft-graph-client';
import { getManager, getMeetingTime } from '../GraphService'
import { dateFormat } from 'dateformat'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import map_example from '../../images/map_example.png';


function useDidRender(callback, deps) {
  const hasMount = useRef(false)

  useEffect(() => {
    if (!hasMount.current) {
      callback()
      hasMount.current = true
    }
  }, deps)
}

function newEventTemplate(manager, meetingTimes) {
  const timesList = meetingTimes.meetingTimeSuggestions
    .map(suggestion => {
      let key = "time-suggest-" + suggestion.order;
      let dateFormat = require("dateformat");
      let text = dateFormat(suggestion.meetingTimeSlot.start.dateTime, "dddd, mmmm dS: h:MMtt") 
        + " to "
        + dateFormat(suggestion.meetingTimeSlot.end.dateTime, "h:MMtt");
      return (
        <Card.Text key={key} className="my-2">
          {text}
        </Card.Text>
      );
    });

  return (
    <React.Fragment>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title><h3>Invite {manager.displayName} for Lunch</h3></Card.Title>
            <Card.Subtitle className="my-3">Suggested Times</Card.Subtitle>
            {timesList}
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
      <Button className="my-3">Submit Event</Button>
    </React.Fragment>
  );
};


export default function EventLaunch(props) {
  const query = props.history.location.state.query

  const [manager, setManager] = useState(null);
  const [meetingTimes, setMeetingTimes] = useState(null);


  useDidRender(() => {
    console.log("Render function")

    const options = {
      authProvider: Providers.globalProvider,
    };

    const client = Client.initWithMiddleware(options);

    async function pageLoad() {
      setManager(await getManager(client));
      setMeetingTimes(await getMeetingTime(client));
    }

    pageLoad();
  });


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
      {manager && meetingTimes ? newEventTemplate(manager, meetingTimes) : loadingTemplate}

    </React.Fragment>
  );
}