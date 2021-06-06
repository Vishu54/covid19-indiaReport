import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // const statesCode = [
  //   "AN",
  //   "AP",
  //   "AR",
  //   "AS",
  //   "BR",
  //   "CH",
  //   "CT",
  //   "DN",
  //   "DD",
  //   "DL",
  //   "GA",
  //   "GJ",
  //   "HR",
  //   "HP",
  //   "JK",
  //   "JH",
  //   "KA",
  //   "KL",
  //   "LD",
  //   "LA",
  //   'MP',
  //   "MH",
  //   'MN',
  //   'ML',
  //   'MZ',
  //   "NL",
  //   "OR",
  //   "PY",
  //   "PB",
  //   "RJ",
  //   "SK",
  //   "TN",
  //   "TG",
  //   "TR",
  //   "UP",
  //   "UT",
  //   "WB",
  // ];
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
