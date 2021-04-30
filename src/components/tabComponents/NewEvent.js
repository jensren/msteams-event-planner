import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import MapWrapper from './MapWrapper';

function NewEventTemplate(props) {

  const[chosenTime, setChosenTime] = useState(null);
  const [chosenPoi, setChosenPoi] = useState(null);

  const timesLst = props.meetingTimes.meetingTimeSuggestions
    .map(suggestion => {
      let key = "time-suggest-" + suggestion.order;
      let dateFormat = require("dateformat");
      let text = dateFormat(suggestion.meetingTimeSlot.start.dateTime, "dddd, mmmm dS: h:MMtt")
        + " to "
        + dateFormat(suggestion.meetingTimeSlot.end.dateTime, "h:MMtt");
      return (
        <ListGroup.Item key={key} className="py-2 card-list-group">
          <Button
            variant="link"
            className={chosenTime && chosenTime === text ? "highlight-link" : null}
            onClick={() => setChosenTime(text)}
          >
            {text}
          </Button>
        </ListGroup.Item>
      );
    }
    );

  const poiLstGroup = props.poiLst
    .map(poi => {
      return (
        <ListGroup.Item key={"poi-" + poi.name} className="py-2 card-list-group">
          <Button
            variant="link"
            className={chosenPoi && chosenPoi.name === poi.name ? "highlight-link" : null}
            onClick={() => setChosenPoi(poi)}
          >
            {poi.name}
          </Button>
        </ListGroup.Item>
      );
    }
    );

  return (
    <React.Fragment>
      <h2>New Event: Invite {props.manager.displayName} for Lunch</h2>
      <CardDeck className="dashboard-deck">
        <Card>
          <Card.Body>
            <Card.Title><h3>Suggested Times</h3></Card.Title>
            <ListGroup>
              {timesLst}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button variant="link">{props.manager.displayName}'s Route</Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title><h3>Map</h3></Card.Title>
            <p>Estimated driving time: 15 mins</p>
          </Card.Body>
          <MapWrapper center={props.selfCoords} />
        </Card>
        <Card>
          <Card.Body>
            <Card.Title><h3>Suggested Restaurants</h3></Card.Title>
            <ListGroup>
              {poiLstGroup}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button variant="link">Load more</Button>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Button className="my-3">Submit Event</Button>
    </React.Fragment>
  );
}


export default NewEventTemplate;