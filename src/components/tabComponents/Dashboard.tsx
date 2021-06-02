import React, { useState } from 'react';

import { Agenda } from '@microsoft/mgt-react'
import { RouteChildrenProps } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


interface Props extends RouteChildrenProps {
  loggedIn: boolean,
  eventSubmit: boolean,
  setEventSubmit: Function
}

export default function Dashboard(props: Props) {
  const [eventQuery, setEventQuery] = useState('');
  const [validated, setValidated] = useState(false);

  function handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false || !props.loggedIn) {
      e.stopPropagation();
    } else {
      props.history.push({
        pathname: '/tab/new-event',
        state: { query: eventQuery },
      });
    }
    setValidated(true);
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setEventQuery(e.target.value);
  }

  return (
    <React.Fragment>
      {props.eventSubmit &&
        <Alert
          variant="success"
          className="mt-3 mb-0 alert-style"
          dismissible
          aria-live="polite"
          onClose={() => { props.setEventSubmit(false) }}
        >
          Event submission successful!
        </Alert>
      }

      <h2>Add a new event</h2>
      <Form
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <Container fluid>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="e.g. have lunch with my boss"
                  aria-label="create an event"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {props.loggedIn ? "Event cannot be empty" : "Log in to create an event"}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit">Go</Button>
            </Col>
          </Row>
        </Container>
      </Form>

      <h2>Upcoming Events</h2>
      <Agenda />
    </React.Fragment>
  );
}