import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavbarClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        if (res.session === null || res.session === undefined) {
            this.setState({ loggedIn: false });
        } else {
          this.setState({ loggedIn: true });
        }
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/session');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  logout = async () => {
    const response = await fetch('/logout');
    const body = await response.json();
    this.setState({ loggedIn: false });
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Navbar.Brand href='/'>
            <img
              alt=''
              src={require('./images/jeongeui_logo.png')}
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>진행중인 선거 목록</Nav.Link>
              <Nav.Link href='/finList'>완료된 선거 목록</Nav.Link>
            </Nav>
            {this.state.loggedIn === true ? <Nav><Nav.Link href='/createVote'>선거 만들기</Nav.Link><Nav.Link href='/' onClick={this.logout}>로그아웃</Nav.Link></Nav>
              : <Nav><Nav.Link href='/authAdmin'>관리자</Nav.Link>
                <Nav.Link href='/adminSignup'>회원가입</Nav.Link></Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}