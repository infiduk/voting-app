import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
        }
    }
    
    componentDidMount() {
        this.setState({ voteId: this.props.match.params.voteId })
    }

    handleSessionSubmit = () => {
        this.callApi()
          .then(res => {
              if (res.session === null || res.session === undefined) {
                console.log(res.session);
            } else {
                console.log(res.session);
                window.location.assign('/UserList/' + `${this.state.voteId}`);
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

    render() {
        return (
            <div>
                <Navbar />
                <div className='row' style={{ margin: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginTop: 20, marginRight: 20 }}>
                        <Button
                            variant='outline-primary'
                            size='lg'
                            href={'/authPhone/' + `${this.state.voteId}`}
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem' }}>
                            모바일 인증
                        </Button>
                    </div>
                    <div style={{ marginTop: 20, marginLeft: 20 }}>
                        <Button
                            variant='outline-secondary'
                            size='lg'
                            href={'/authLive/' + `${this.state.voteId}`}
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem' }}>
                            현장 인증
                        </Button>
                    </div>
                    <Button
                            variant='outline-secondary'
                            size='lg'
                            onClick={this.handleSessionSubmit}
                            style={{ width: '83vw', height: '15vw', fontWeight: '900', fontSize: '1.8rem', marginTop: 20 }}>
                            회원 목록 보기
                        </Button>
                </div>
            </div>
        );
    }
}