import React, { useContext, useEffect, useState } from 'react';
import { AzureMapsContext, IAzureMapsContextProps } from 'react-azure-maps';
import { data, layer, source } from 'azure-maps-control';
import MapComponent from './Map';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

function MapController(props: {center: {"lat": number, "lon": number}}) {
  // Here you use mapRef from context
  const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);
  const [showTileBoundaries, setShowTileBoundaries] = useState(true);

  const changeMapCenter = () => {
    if (mapRef) {
      // Simple Camera options modification
      mapRef.setCamera({ center: getRandomPosition() });
    }
  };

  useEffect(() => {
    if (mapRef) {
      // Simple Style modification
      console.log("mapRef exsits, ready to set the map style");
      mapRef.setStyle({ showTileBoundaries: !showTileBoundaries });
      mapRef.setCamera({ center: [props.center.lat, props.center.lon] });
    }
  }, [showTileBoundaries]);

  const toggleTitleBoundaries = () => {
    setShowTileBoundaries((prev) => !prev);
  };


  useEffect(() => {
    if (isMapReady && mapRef) {
      // Need to add source and layer to map on init and ready
      mapRef.sources.add(dataSourceRef);
      mapRef.layers.add(layerRef);
    }
  }, [isMapReady]);

  // Util function to add pin
  const addRandomMarker = () => {
    const randomLongitude = Math.floor(Math.random() * (180 - -180) + -180);
    const randomLatitude = Math.floor(Math.random() * (-90 - 90) + 90);
    const newPoint = new data.Position(randomLongitude, randomLatitude);

    dataSourceRef.add(new data.Feature(new data.Point(newPoint)));
  };

  return (
    <>
      <MapComponent />
      <ButtonGroup role="group" aria-label="map controls" className="btn-group-sm">
        <Button className="btn-secondary" onClick={toggleTitleBoundaries}>
          Toggle Title Boundaries
        </Button>
        <Button className="btn-secondary" onClick={changeMapCenter}>
          Change Map Center
        </Button>
        <Button className="btn-secondary" onClick={addRandomMarker}>
          Add Pin
        </Button>
      </ButtonGroup>
    </>
  );
};

// Util Function to generate random position
const getRandomPosition = () => {
  const randomLongitude = Math.floor(Math.random() * (180 - -180) + -180);
  const randomLatitude = Math.floor(Math.random() * (-90 - 90) + 90);
  return [randomLatitude, randomLongitude];
};


export default MapController;
