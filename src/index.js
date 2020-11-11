import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Home from "layouts/Home.js";
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/app" component={Admin} key={2} />
      <Route exact path="/" component={Home} key={1} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
