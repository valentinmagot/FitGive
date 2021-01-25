import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from './context/authContext'
import PrivateRoute from './privateRoute'


// core components
import Home from "layouts/Home.js";
import Admin from "layouts/Admin.js";
import SignUp from "layouts/SignUp/SignUp.js";
import SignIn from "layouts/SignIn/SignIn.js";
import ForgotPassword from "layouts/ForgotPassword/ForgotPassword.js";

import "assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <AuthProvider>
    <Switch>
    <Route exact path="/signin" component={SignIn} key={5} />
      <Route exact path="/signup" component={SignUp} key={4} />
      <Route exact path="/forgot-password" component={ForgotPassword} key={3} />
      <PrivateRoute path="/app" component={Admin} key={2} />
      <Route exact path="/" component={Home} key={1} />
    </Switch>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
