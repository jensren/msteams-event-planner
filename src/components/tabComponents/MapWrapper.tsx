
import { AzureMapsProvider } from 'react-azure-maps';
import React from 'react';
import MapController, { MapProps } from './MapController';


function MapWrapper(props: MapProps) {
  return (
    <AzureMapsProvider>
        <MapController startCoords={props.startCoords} poi={props.poi}/>
    </AzureMapsProvider>
  );
};

export default MapWrapper;