
import { AzureMapsProvider } from 'react-azure-maps';
import React from 'react';
import MapController from './MapController';

function MapWrapper(props: {center: {"lat": number, "lon": number}}) {
  return (
    <AzureMapsProvider>
        <MapController center={props.center}/>
    </AzureMapsProvider>
  );
};

export default MapWrapper;