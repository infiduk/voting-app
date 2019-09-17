import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-bootstrap';

export default class NavbarClass extends Component {
  render() {
    return (
      <div>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Navbar.Brand href='/'>
            <img src={require('./images/jeongeui_logo.png')}
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>진행중인 선거 목록</Nav.Link>
              <Nav.Link href='/finList'>완료된 선거 목록</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='#admin'>관리자</Nav.Link>
              {/* 세션 있으면 */}
              <Nav.Link href='#logout'>로그아웃</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}