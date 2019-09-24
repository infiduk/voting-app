import React, { Component, useState } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVotePhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
            name: '',
            name_ex: '',
            phone: '',
            auth: '',

            authMsg: '',
            getAuth: '',
        } 
    }

    componentDidMount() {
        this.setState({ voteId: this.props.match.params.voteId })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // 휴대폰 번호로 인증번호 조회
    handleSendAuthSubmit = async e => {
        e.preventDefault();
        try {
            const response = fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                'vote_id': this.state.voteId,
                'name': this.state.name,
                'name_ex': this.state.name_ex,
                'phone': this.state.phone,
                })
            })
            response.then(result => result.json())
                .then(json => {
                    console.log(json.auth);
                    this.setState({ getAuth: json.auth });
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
        try {
            const response = fetch('/electorate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                'vote_id': this.state.voteId,
                'name': this.state.name,
                'name_ex': this.state.name_ex,
                'auth': this.state.auth
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

        if(this.state.auth == this.state.getAuth) {
            console.log('성공이라고고옹오오오오');
            this.props.history.push('/Voting/' + `${this.state.voteId}`);
        } else {
            console.log('인증번호 제대로 치셈');
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 25, padding: 15, flex: 1 }}>
                    <div style={{
                        display: 'inline-block',
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