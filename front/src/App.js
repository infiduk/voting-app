import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import IngList from './IngList';
import FinList from './FinList';

import AuthVote from './AuthVote';
import AuthVotePhone from './AuthVotePhone';
import AuthVoteLive from './AuthVoteLive';
import AuthAdmin from './AuthAdmin';

import CreateVote from './CreateVote';

import Voting from './Voting';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* 진행중인 선거 목록, 메인 */}
            <Route exact path='/' component={IngList} />
            {/* 완료된 선거 목록 */}
            <Route path='/finList' component={FinList} />
            {/* 인증 */}
            <Route path='/auth' component={AuthVote} />
            <Route path='/authPhone' component={AuthVotePhone} />
            <Route path='/authLive' component={AuthVoteLive} />
            <Route path='/authAdmin' component={AuthAdmin} />
            {/* 선거 만들기 */}
            <Route path='/createVote' component={CreateVote} />
            {/* 투표하기 */}
            <Route path='/voting' component={Voting} />
          </Switch>
        </div>
      </Router>
    );
  }
}