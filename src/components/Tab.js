// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { Login } from "@microsoft/mgt-react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


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
      context: {}
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
    
    microsoftTeams.registerOnThemeChangeHandler(theme => {
      if (theme !== this.state.theme) {
        this.setState({ theme });
      }
    });
    // Next steps: Error handling using the error object
  }


  render() {
    const isTheme = this.state.theme

    let newTheme

    if (isTheme === "default") {
      newTheme = {
        backgroundColor: "#EEF1F5",
        color: "#16233A"
      };
    } else {
      newTheme = {
        backgroundColor: "#2B2B30",
        color: "#FFFFFF"
      };
    }

    return (
      <React.Fragment>
        <h1>Events Manager</h1>
        <Login />
        <Switch>
          <Route exact path="/tab" component={Dashboard} />
          <Route path="/tab/new-event" component={EventLaunch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Tab;