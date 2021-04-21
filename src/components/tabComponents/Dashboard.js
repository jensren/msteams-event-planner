import React, { useState } from 'react';


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
      <form 
        onSubmit={handleSubmit}
      >
        <p>
          <input 
            placeholder="e.g. have lunch with my boss" 
            autoFocus 
            aria-label="create an event"
            onChange={handleChange}
          />
        </p>
        <p>
          <button
            type="submit"
          >
            Go
          </button>
        </p>
      </form>
      <h2>Upcoming Events</h2>
      <ul>
        <li>Meet Alex at the park at 1pm</li>
        <li>Teams call with Anna at 3pm</li>
      </ul>
    </React.Fragment>     
  );
}