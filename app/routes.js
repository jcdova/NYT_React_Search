import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Main from "./components/Main";
import Search from "./components/Search";
import Saved from "./components/Saved";

const Routes = (props) => (
  <Router {...props}>
    <Main>
      <Route exact path="/" component={Search} />
      <Route path="/search" component={Search} />
      <Route path="/saved" component={Saved} />
    </Main>
  </Router>
);

export default Routes;
