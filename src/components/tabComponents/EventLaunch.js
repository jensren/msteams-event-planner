import React, { useState, useRef, useEffect } from 'react';
import { Providers } from '@microsoft/mgt';
import { Client } from '@microsoft/microsoft-graph-client';
import { getManager, getMeetingTime, getSelf } from './GraphService';
import { addressSearch, getMidpoint, poiSearch } from './MapService';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { meetingTimeSuggestionsResult, selfLocation, managerLocation, fraction, poiQuery } from './testData';
import NewEventTemplate from './NewEvent';


function useDidRender(callback, deps) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current) {
      callback();
      hasMount.current = true;
    }
  }, deps);
}


export default function EventLaunch(props) {
  // const query = props.history.location.state.query

  const [self, setSelf] = useState(null);
  const [manager, setManager] = useState(null);
  const [meetingTimes, setMeetingTimes] = useState(null);
  const [selfCoords, setSelfCoords] = useState(null);
  const [managerCoords, setManagerCoords] = useState(null);
  const [poiLst, setPoiLst] = useState(null);


  useDidRender(async () => {
    const options = {
      authProvider: Providers.globalProvider,
    };

    const client = Client.initWithMiddleware(options);

    const selfCoordsPromise = addressSearch(selfLocation);

    const tempSelf = await getSelf(client);
    const tempManager = await getManager(client);
    setSelf(tempSelf);
    setManager(tempManager);

    const meetingData = meetingTimeSuggestionsResult(tempSelf, tempManager);
    const meetingTimesPromise = getMeetingTime(client, meetingData);

    const managerCoordsPromise = addressSearch(managerLocation);

    const tempSelfCoords = await selfCoordsPromise;
    const tempManagerCoords = await managerCoordsPromise;
    setSelfCoords(tempSelfCoords);
    setManagerCoords(tempManagerCoords);

    const midpoint = getMidpoint(tempSelfCoords, tempManagerCoords, fraction);  // [longitude, latitude]
    const poiLstPromise = poiSearch(midpoint[0], midpoint[1], poiQuery);

    setMeetingTimes(await meetingTimesPromise);
    setPoiLst(await poiLstPromise);
  });

  function isLoading(loading) {
    if (loading) {
      return (
        <Container fluid className="py-4">
          <Row >
            <Spinner animation="border" className="mx-auto" />
          </Row>
        </Container>
      );
    } else {
      return (
        <NewEventTemplate
          self={self} 
          manager={manager}
          meetingTimes={meetingTimes}
          selfCoords={selfCoords}
          managerCoords={managerCoords}
          poiLst={poiLst} 
        />
      );
    }
  }


  return (
    <React.Fragment>
      {(manager && meetingTimes && selfCoords && managerCoords && poiLst) ?
        isLoading(false) : isLoading(true)
      }

    </React.Fragment>
  );
}



