import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Login from "./Screen/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../src/Screen/Homepage";
import Register from "./Screen/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/homepage/:userid" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
