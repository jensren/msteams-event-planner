import React from 'react';


export default function Dashboard(props) {
  return (
    <React.Fragment>
      <h2>Add a new event</h2>
      <form>
        <p>
          <input placeholder="e.g. have lunch with my boss" autoFocus aria-label="create an event"/>
        </p>
        <p>
          <button>Go</button>
        </p>
      </form>
    </React.Fragment>     
  );
}