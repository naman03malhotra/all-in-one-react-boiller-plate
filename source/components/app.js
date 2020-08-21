import React from "react";

import { Route, Link, Switch } from "react-router-dom";

import Landing from "./landing";
import About from "./about";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">Aboutxxx</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
};

export default App;
