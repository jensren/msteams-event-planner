import React, { useContext, useEffect, useState } from 'react';
import { AzureMapsContext, IAzureMapsContextProps } from 'react-azure-maps';
import { data, layer, source } from 'azure-maps-control';
import { SubscriptionKeyCredential, MapsURL, RouteURL, Aborter } from 'azure-maps-rest';

import { mapSubscription } from '../../config';
import MapComponent from './Map';



export type Coords = { "lat": number, "lon": number }
export type MapProps = {
  selfCoords: Coords,
  poi: { "name": string, "address": string, "position": Coords } | null,
};


const dataSourceRef = new source.DataSource();

function MapController(props: MapProps) {
  // Here you use mapRef from context
  const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);


  useEffect(() => {
    if (isMapReady && mapRef) {
      // Need to add source and layer to map on init and ready
      mapRef.sources.add(dataSourceRef);
      mapRef.setCamera({ center: [props.selfCoords.lon, props.selfCoords.lat], zoom: 10 });
    }
  }, [isMapReady, mapRef, props.selfCoords.lon, props.selfCoords.lat]);



  // plot the route
  useEffect(() => {
    if (isMapReady && mapRef && props.poi) {
      dataSourceRef.clear();

      mapRef.layers.add(new layer.LineLayer(dataSourceRef, "route-" + props.poi.name, {
        strokeColor: '#2272B9',
        strokeWidth: 5,
        lineJoin: 'round',
        lineCap: 'round'
      }));

      mapRef.layers.add(new layer.SymbolLayer(dataSourceRef, "coords-" + props.poi.name, {
        iconOptions: {
          image: ['get', 'icon'],
          allowOverlap: true
        },
        textOptions: {
          textField: ['get', 'title'],
          offset: [0, 1.2]
        },
        filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']] //Only render Point or MultiPoints in this layer.
      }));

      let startPoint = new data.Feature(new data.Point([props.selfCoords.lon, props.selfCoords.lat]), {
        title: "Your Office",
        icon: "pin-round-blue"
      });

      let endPoint = new data.Feature(new data.Point([props.poi.position.lon, props.poi.position.lat]), {
        title: props.poi.name,
        icon: "pin-round-red"
      });

      dataSourceRef.add([startPoint, endPoint]);
      mapRef.setCamera({
        bounds: data.BoundingBox.fromData([startPoint, endPoint]),
        padding: 40
      });

      // Use SubscriptionKeyCredential with a subscription key
      let subscriptionKeyCredential = new SubscriptionKeyCredential(mapSubscription);

      // Use subscriptionKeyCredential to create a pipeline
      let pipeline = MapsURL.newPipeline(subscriptionKeyCredential);

      // Construct the RouteURL object
      let routeURL = new RouteURL(pipeline);

      //Start and end point input to the routeURL
      let coordinates = [[startPoint.geometry.coordinates[0], startPoint.geometry.coordinates[1]], [endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]]];

      //Make a search route request
      routeURL.calculateRouteDirections(Aborter.timeout(10000), coordinates).then((directions: any) => {
        //Get data features from response
        var data = directions.geojson.getFeatures();
        dataSourceRef.add(data);
      });

    }
  }, [isMapReady, mapRef, props.poi]);

  return (
    <>
      <MapComponent />
    </>
  );
};

export default MapController;
