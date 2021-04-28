
import { AzureMapsProvider } from 'react-azure-maps';
import React from 'react';
import MapController from './MapController';

const MapWrapper = () => {
  return (
    <AzureMapsProvider>
        <MapController />
    </AzureMapsProvider>
  );
};

export default MapWrapper;