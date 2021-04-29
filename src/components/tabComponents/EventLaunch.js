import React, { useState, useRef, useEffect } from 'react';
import { Providers } from '@microsoft/mgt';
import { Client } from '@microsoft/microsoft-graph-client';
import { getManager, getMeetingTime } from './GraphService';
import { addressSearch, getMidpoint } from './MapService';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import { meetingTimeSuggestionsResult, selfLocation, managerLocation, fraction } from './testData';
import MapWrapper from './MapWrapper';


function useDidRender(callback, deps) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      callback();
      hasMount.current = true;
    }
  }, deps);
}

function newEventTemplate(manager, meetingTimes, selfCoords, managerCoords) {

  const midpoint = getMidpoint(selfCoords, managerCoords, fraction);
  console.log("Midpoint: ", midpoint);

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
      <h2>New Event: Invite {manager.displayName} for Lunch</h2>
      <CardDeck className="dashboard-deck">
        <Card>
          <Card.Body>
            <Card.Title><h3>Suggested Times</h3></Card.Title>
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
          <MapWrapper center={selfCoords}/>
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
  // const query = props.history.location.state.query

  const [manager, setManager] = useState(null);
  const [meetingTimes, setMeetingTimes] = useState(null);
  const [selfCoords, setSelfCoords] = useState(null);
  const [managerCoords, setManagerCoords] = useState(null);


  useDidRender(async () => {
    const options = {
      authProvider: Providers.globalProvider,
    };

    const client = Client.initWithMiddleware(options);

    const selfCoordsPromise = addressSearch(selfLocation);

    const tempManager = await getManager(client);
    setManager(tempManager);

    const meetingData = meetingTimeSuggestionsResult(tempManager);
    const meetingTimesPromise = getMeetingTime(client, meetingData);

    const managerCoordsPromise = addressSearch(managerLocation);

    setSelfCoords(await selfCoordsPromise);
    setManagerCoords(await managerCoordsPromise);
    setMeetingTimes(await meetingTimesPromise);
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
      {(manager && meetingTimes && selfCoords && managerCoords) ? 
        newEventTemplate(manager, meetingTimes, selfCoords, managerCoords) 
        : loadingTemplate
      }

    </React.Fragment>
  );
}