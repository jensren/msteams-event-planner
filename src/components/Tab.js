// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { Login } from "@microsoft/mgt-react"
import { Route, Switch } from "react-router-dom";


// Component imports

import Dashboard from './tabComponents/Dashboard';
import EventLaunch from './tabComponents/EventLaunch';

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: {},
      loggedIn: false,
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
    });
  }


  render() {

    return (
      <React.Fragment>
        <h1>Events Manager</h1>
        <Login 
          loginCompleted={() => {this.setState({ loggedIn: true}); console.log("Log in success") }}
          logoutCompleted={() => this.setState({ loggedIn: false})}
          loginInitiated={() => console.log("Starting log in")}
          loginFailed={() => {console.log("Log in failed")}}
        />
        <Switch>
          <Route exact path="/tab" 
            children={(routeProps) => <Dashboard {...routeProps} loggedIn={this.state.loggedIn} />} 
          />
          <Route path="/tab/new-event" children={(routeProps) => <EventLaunch {...routeProps}/>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Tab;