
import { AzureMapsProvider } from 'react-azure-maps';
import React from 'react';
import MapController, { MapProps } from './MapController';


function MapWrapper(props: MapProps) {
  return (
    <AzureMapsProvider>
        <MapController startSelfCoords={props.startSelfCoords} selfCoords={props.selfCoords} managerCoords={props.managerCoords} poi={props.poi} managerName={props.managerName}/>
    </AzureMapsProvider>
  );
};

export default MapWrapper;