import React from 'react';
import { render } from 'react-dom';


export default function EventLaunch(props) {
    return (
        <React.Fragment>
            <h2>New Event</h2>
            <p>Your query is: {props.history.location.state.query}</p>
        </React.Fragment>
    );
}