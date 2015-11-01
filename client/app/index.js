import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

require("bootstrap-webpack");


import { App, About, Inbox } from './test';


var container = document.getElementById('app');

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
  ),
  container
);
