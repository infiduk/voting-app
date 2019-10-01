import React, { Component } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class AuthVotePhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            name: '',
            name_ex: '',
            phone: '',
            auth: '',

            authMsg: '',
            getAuth: '',
            getAuthStatus: false,
        } 
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // 휴대폰 번호로 인증번호 조회
    handleSendAuthSubmit = async e => {
        e.preventDefault();

        const { voteId, name, name_ex, phone, getAuthStatus } = this.state;

        try {
            const response = fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                'vote_id': voteId,
                'name': name,
                'name_ex': name_ex,
                'phone': phone,
                })
            })
            response.then(result => result.json())
                .then(json => {
                    console.log(json.status);
                    this.setState({ getAuth: json.auth, getAuthStatus: json.status });

                    if(!getAuthStatus) {
                        confirmAlert({
                            customUI: ({ onClose }) => {
                            return (
                                <div className='custom-confirm-ui'>
                                <div className='text-center'>
                                    <p style={{ marginBottom: 20 }}>선거권자 목록에 등록되지 않은 회원입니다.
                                    </p>
                                </div>
                                <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                                    window.location.assign('/authPhone/' + `${this.state.voteId}`);
                                }}> 확인 </button>
                                </div>
                            )},
                            closeOnClickOutside: false
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                }
            );            
        } catch (err) {
            console.log(err);
        }
    };

    // 선거권자 인증
    handleAuthSubmit = async e => {
        e.preventDefault();

        const { voteId, name, name_ex, phone, auth, getAuth } = this.state;

        try {
            const response = fetch('/electorate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                'vote_id': voteId,
                'name': name,
                'name_ex': name_ex,
                'phone': phone
                })
            })
            response.then(result => result.json())
                .then(json => {
                    this.setState({ authMsg: json.msg });
                })
                .catch(err => {
                    console.log(err);
                }
            );
        } catch (err) {
            console.log(err);
        }

        if(auth === getAuth) {
            window.location.assign('/voting/' + `${this.state.voteId}`);
        } 
    };

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 25, padding: 15, flex: 1 }}>
                    <div style={{
                        display: 'initial',
                        marginTop: 20,
                        marginBotom: 20,
                        width: '80vw',
                        height: '420px',
                        backgroundColor: '#fafafa',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ marginTop: 30, marginBottom: 50, textAlign: 'center' }}>모바일 인증</h3>
                        <Accordion defaultActiveKey='0'>
                            <Card style={{margin: 10}}>
                                <Card.Header style={{backgroundColor: '#fff'}}>
                                <Form.Control size='lg'
                                            placeholder='이름을 입력해주세요.'
                                            aria-describedby='basic-addon'
                                            name='name'
                                            onChange={this.handleChange}
                                            style={{ marginBottom: 8 }}
                                        />
                                        <Form.Control size='lg'
                                            placeholder='이름 구분자를 입력해주세요.'
                                            aria-describedby='basic-addon'
                                            name='name_ex'
                                            onChange={this.handleChange}
                                            style={{ marginBottom: 8 }}
                                        />
                                    <InputGroup className='mb-3'size='lg'>
                                    <Form.Control size='lg'
                                            placeholder='휴대폰 번호를 입력해주세요.'
                                            aria-label='01000000000'
                                            aria-describedby='basic-addon'
                                            name='phone'
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            <Accordion.Toggle as={Button} variant='link' eventKey='1' onClick={this.handleSendAuthSubmit}>
                                                인증번호 받기
                                            </Accordion.Toggle>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Card.Header>
                                <Accordion.Collapse eventKey='1'>
                                    <Card.Body style={{margin: 0}}>
                                        <InputGroup className='mb-3'size='lg'>
                                            <FormControl
                                                placeholder='인증번호를 입력해주세요.'
                                                aria-describedby='basic-addon'
                                                name='auth'
                                                onChange={this.handleChange}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={this.handleAuthSubmit}>확인</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}