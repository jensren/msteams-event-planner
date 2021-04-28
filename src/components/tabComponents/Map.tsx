import React from 'react';
import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { mapSubscription } from '../../config';

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: mapSubscription
    },
}

const MapComponent: React.FC = () => (
    <div className="w-100 h-100">
        <AzureMap options={option}>
        </AzureMap>
    </div>
)

export default MapComponent;