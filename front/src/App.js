import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Result from './pages/vote/Result';
import ResultDetail from './pages/vote/ResultDetail';

import SelectAuth from './pages/auth/SelectAuth';
import Auth_Phone from './pages/auth/Phone';
import Auth_Live from './pages/auth/Live';
import Auth_Admin from './pages/auth/Admin';

import Create from './pages/vote/Create';

import Voting from './pages/vote/Voting';

import Admin_SignUp from './pages/admin/SignUp';
import Admin_SignIn from './pages/admin/SignIn';

import NavBar from './Navbar';

export default class App extends Component {
  render() {
    return (
      <Router>
          <NavBar />
          <Switch>
            {/* 진행중인 선거 목록, 메인 */}  
            <Route exact path='/' component={Main} />
            {/* 완료된 선거 목록 */}
            <Route path='/results' component={Result} />
            {/* 인증 */}
            <Route path='/auth/:voteId' component={SelectAuth} />
            <Route path='/phone/:voteId' component={Auth_Phone} />
            <Route path='/live/:voteId' component={Auth_Live} />
            <Route path='/admin/:voteId' component={Auth_Admin} />
            {/* 관리자 로그인, 회원가입 */}
            <Route path='/signin' component={Admin_SignIn} />
            <Route path='/signup' component={Admin_SignUp} />
            {/* 선거 만들기 */}
            <Route path='/create' component={Create} />
            {/* 투표하기 */}
            <Route path='/voting/:voteId' component={Voting} />
            {/* 투표 완료 상세정보*/}
            <Route path='/result/:voteId' component={ResultDetail} />
          </Switch>
      </Router>
    );
  }
}