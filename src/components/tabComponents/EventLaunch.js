import React, { useState, useRef, useEffect } from 'react';
import { Providers } from '@microsoft/mgt';
import { Client } from '@microsoft/microsoft-graph-client';
import { getManager, getMeetingTime, getSelf, getTimezone } from './GraphService';
import { addressSearch, getMidpoint, poiSearch } from './MapService';


import { meetingTimeSuggestionsResult, selfLocation, managerLocation, fraction, poiQuery } from './testData';
import NewEvent from './NewEvent';
import Loading from './Loading';


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

  const options = {
    authProvider: Providers.globalProvider,
  };

  const client = Client.initWithMiddleware(options);

  useDidRender(async () => {
    
    const selfCoordsPromise = addressSearch(selfLocation);

    const tempSelf = await getSelf(client);
    const tempManager = await getManager(client);
    const timeZone = await getTimezone(client);
    setSelf(tempSelf);
    setManager(tempManager);

    const meetingData = meetingTimeSuggestionsResult(tempSelf, tempManager, timeZone);
    const meetingTimesPromise = getMeetingTime(client, meetingData, timeZone);

    const managerCoordsPromise = addressSearch(managerLocation);

    const tempSelfCoords = await selfCoordsPromise;
    const tempManagerCoords = await managerCoordsPromise;
    setSelfCoords(tempSelfCoords);
    setManagerCoords(tempManagerCoords);

    const midpoint = getMidpoint(tempSelfCoords, tempManagerCoords, fraction);
    const poiLstPromise = poiSearch(midpoint[0], midpoint[1], poiQuery);  // [longitude, latitude]

    setMeetingTimes(await meetingTimesPromise);
    setPoiLst(await poiLstPromise);
  });


  return (
    <React.Fragment>
      {(manager && meetingTimes && selfCoords && managerCoords && poiLst)
        ? <NewEvent
          client={client}
          self={self}
          manager={manager}
          meetingTimes={meetingTimes}
          selfCoords={selfCoords}
          managerCoords={managerCoords}
          poiLst={poiLst}
          setEventSubmit={props.setEventSubmit}
        />
        : <Loading />
      }

    </React.Fragment>
  );
}




