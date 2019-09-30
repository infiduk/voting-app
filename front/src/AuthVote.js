import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
            isAdmin: false, // 사용자 구분
        }
    }

    componentDidMount() {
        this.setState({ voteId: this.props.match.params.voteId })
        this.callApi()
        .then(res => {
            if (!res.result) {
                this.setState({ loggedIn: false });
            } else {
            this.setState({ loggedIn: true });
            }
        })
        .catch(err => console.log(err));
    }

    handleSessionSubmit = () => {
        try {
            if (this.state.isAdmin) {
                window.location.assign('/UserList/' + `${this.state.voteId}`);
            } else {
                confirmAlert({
                    customUI: ({ onClose }) => {
                    return (
                        <div className='custom-confirm-ui'>
                        <div className='text-center'>
                            <p style={{ marginBottom: 20 }}>관리자만 접근 가능합니다.
                            </p>
                        </div>
                        <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                            onClose();
                        }}> 확인 </button>
                        </div>
                    )},
                    closeOnClickOutside: false
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    callApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.json().msg);
        return response.json();
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
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
                            모바일 인증
                        </Button>
                    </div>
                    <div style={{ marginTop: 20, marginLeft: 20 }}>
                        <Button
                            variant='outline-secondary'
                            size='lg'
                            href={'/authLive/' + `${this.state.voteId}`}
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
                            현장 인증
                        </Button>
                    </div>
                    {this.state.isAdmin === true ?
                        <Button
                            variant='outline-secondary'
                            size='lg'
                            onClick={this.handleSessionSubmit}
                            style={{ width: '83vw', height: '15vw', fontWeight: '900', fontSize: '1.8rem', marginTop: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
                            회원 목록 보기
                        </Button> : <div /> }
                </div>
            </div>
        );
    }
}