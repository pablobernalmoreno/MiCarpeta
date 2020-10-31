import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import config from "./auth/firebaseConfig";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

export const history = createHistory();



function App() {
  const [currentUser, setCurrentUser] = useState();

  config.auth().onAuthStateChanged(function (user) {
    if (user) {
      setCurrentUser(user.l);
    }
  });

  return (
    <Router>
      <Switch>
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/" exact component={Login} />
        {currentUser !== undefined ? (
          <Route path="/Home" exact component={Home} />
        ) : (
          <Route path="/" exact component={Login} />
        )}
      </Switch>
    </Router>
  );
}

export default App;
