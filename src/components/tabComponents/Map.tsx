import React from 'react';
import { AzureMap, IAzureMapOptions, IAzureMapControls } from 'react-azure-maps';
import { AuthenticationType, ControlOptions } from 'azure-maps-control';
import { mapSubscription } from '../../config';

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: mapSubscription
    },
};

const controls: IAzureMapControls[] = [
    {
      controlName: 'StyleControl',
      controlOptions: { mapStyles: 'all' },
      options: { position: 'top-right' } as ControlOptions,
    },
    {
      controlName: 'ZoomControl',
      options: { position: 'top-right' } as ControlOptions,
    },
    {
      controlName: 'CompassControl',
      controlOptions: { rotationDegreesDelta: 10 },
      options: { position: 'top-right' } as ControlOptions,
    },
    {
      controlName: 'TrafficControl',
      controlOptions: { incidents: true },
      options: { position: 'top-left' } as ControlOptions,
    },
    {
      controlName: 'TrafficLegendControl',
      controlOptions: {},
      options: { position: 'bottom-left' } as ControlOptions,
    },
  ];

const MapComponent: React.FC = () => (
    <div className="w-100 h-100">
        <AzureMap options={option} controls={controls}>
        </AzureMap>
    </div>
)

export default MapComponent;