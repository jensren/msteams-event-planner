// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { Providers, TeamsProvider } from '@microsoft/mgt';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { config } from "../config";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {

  // Initialize the Microsoft Teams SDK
  microsoftTeams.initialize();
  TeamsProvider.microsoftTeamsLib = microsoftTeams;

  Providers.globalProvider = new TeamsProvider(config)


  // Display the app home page hosted in Teams
  return (
    <Router>
      <Switch>
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/termsofuse" component={TermsOfUse} />
        <Route path="/tab" component={Tab} />
        <Route path="/">
          <h1>404: Path not found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
