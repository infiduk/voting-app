import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import IngList from './IngList';
import FinList from './FinList';
import AuthVote from './AuthVote';
import Voting from './Voting';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={IngList} />
            <Route path='/finList' component={FinList} />
            <Route path='/auth' component={AuthVote} />
            <Route path='/voting' component={Voting} />
          </Switch>
        </div>
      </Router>
    );
  }
}