import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Dashboard(props) {
  const [eventQuery, setEventQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.history.push({
      pathname: '/tab/new-event',
      state: {query: eventQuery},
    });
  }

  function handleChange(e) {
    setEventQuery(e.target.value);
  }

  return (
    <React.Fragment>
      <h2>Add a new event</h2>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Control
            type="input" 
            placeholder="e.g. have lunch with my boss" 
            aria-label="create an event"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Go</Button>
      </Form>

      <h2>Upcoming Events</h2>
      <ul>
        <li>Meet Alex at the park at 1pm</li>
        <li>Teams call with Anna at 3pm</li>
      </ul>
    </React.Fragment>     
  );
}