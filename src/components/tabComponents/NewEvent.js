import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

import timeZoneConverter from 'time-zone-converter';
import { scheduleMeeting } from './GraphService';

import MapWrapper from './MapWrapper';
import Loading from './Loading';
import { meetingInfo } from './testData';
import Spinner from 'react-bootstrap/esm/Spinner';

function NewEvent(props) {

  const [chosenTime, setChosenTime] = useState(null);
  const [chosenPoi, setChosenPoi] = useState(null);
  const [startSelfCoords, setStartSelfCoords] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [displaySubmit, setDisplaySubmit] = useState(false);

  function handleSubmit(e) {
    if (chosenTime) {
      setDisplayError(false);
      setDisplaySubmit(true);
      let info = meetingInfo(props.self, props.manager, chosenTime, chosenPoi);
      scheduleMeeting(props.client, info).then((result) => {
        console.log("meeting scheduling result: ", result);
        return result;
      });
    } else {
      setDisplayError(true);
    }
  }


  const timesLst = props.meetingTimes.meetingTimeSuggestions
    .map((suggestion) => {
      let key = "time-suggest-" + suggestion.order;
      let dateFormat = require("dateformat");

      let start = timeZoneConverter(dateFormat(suggestion.meetingTimeSlot.start.dateTime, "yyyy/mm/dd HH:MM:ss"), 0, -4);
      let end = timeZoneConverter(dateFormat(suggestion.meetingTimeSlot.end.dateTime, "yyyy/mm/dd HH:MM:ss"), 0, -4);
      let text = dateFormat(start, "dddd, mmmm dS: h:MMtt")
        + " to "
        + dateFormat(end, "h:MMtt");
      return (
        <ListGroup.Item key={key} className="py-2 card-list-group">
          <Button
            variant="link"
            className={chosenTime && chosenTime.text === text ? "highlight-link" : null}
            onClick={() => setChosenTime({ text: text, ...suggestion.meetingTimeSlot })}
            disabled={displaySubmit}
          >
            {text}
          </Button>
        </ListGroup.Item>
      );
    }
    );

  const poiLstGroup = props.poiLst
    .map((poi) => {
      return (
        <ListGroup.Item key={"poi-" + poi.name} className="py-2 card-list-group">
          <Button
            variant="link"
            className={chosenPoi && chosenPoi.name === poi.name ? "highlight-link" : null}
            onClick={() => setChosenPoi(poi)}
            disabled={displaySubmit}
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
        </Card>
        <Card>
          <Card.Body>
            <Card.Title><h3>Map</h3></Card.Title>
            <Button variant="secondary" onClick={() => setStartSelfCoords(!startSelfCoords)}>
              {startSelfCoords ? props.manager.displayName + "'s Route" : "Your Route"}
            </Button>
            <p>Estimated driving time: 15 mins</p>
          </Card.Body>
          <MapWrapper startSelfCoords={startSelfCoords} selfCoords={props.selfCoords} managerCoords={props.managerCoords} managerName={props.manager.displayName} poi={chosenPoi} />
        </Card>
        <Card>
          <Card.Body>
            <Card.Title><h3>Suggested Restaurants</h3></Card.Title>
            <ListGroup>
              {poiLstGroup}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="link"
              disabled={displaySubmit}
            >
              Load more
            </Button>
          </Card.Footer>
        </Card>
      </CardDeck>

      {displayError &&
        <Alert
          variant="danger"
          className="mt-3 mb-0 alert-style"
          aria-live="polite"
          dismissible
          onClose={() => { setDisplayError(false) }}
        >
          You must select a time to create an event.
        </Alert>
      }
      {displaySubmit
        ?
        <Button
          className="my-3"
          disabled
          aria-live="polite"
        >
          <Spinner 
            animation="border" 
            as="span" 
            size="sm" 
            role="status" 
            aria-hidden="true" 
            className="mb-1 mr-2"
          />
          Submitting...
        </Button>
        :
        <Button
          className="my-3"
          onClick={handleSubmit}
        >
          Submit Event
        </Button>
      }

    </React.Fragment>
  );
}


export default NewEvent;