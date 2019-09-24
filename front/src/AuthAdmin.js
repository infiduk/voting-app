import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';

import Navbar from './Navbar';

export default class AuthAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            password: '',
        };
    }

    // 관리자 로그인 api fetch
    handleSubmit = async e => {
        e.preventDefault();

        let adminInfo = {
            'uid': this.state.uid,
            'password': this.state.password
        };
        try {
            const response = fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminInfo),
            })
            response.then(result => result.json())
                .then(json => {
                    console.log(json.data.admin);
                })
                .catch(err => {
                    console.log(err);
                }
            );
        } catch (err) {
            console.log(err);
        }

        this.props.history.push('/');
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 25, padding: 25, flex: 1 }}>
                    <div style={{
                        display: 'inline-block',
                        marginTop: 20,
                        marginBotom: 20,
                        width: '60vw',
                        height: '80%',
                        backgroundColor: '#f1f1f1',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ marginTop: 30, textAlign: 'center' }}>관리자 로그인</h3>
                        <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleSubmit}>
                            <Form.Group controlId='adminId'>
                                <Form.Label>관리자 ID</Form.Label>
                                <Form.Control type='id' size='lg' name='uid' placeholder='ID' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='adminPw'>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type='password' size='lg' name='password' placeholder='Password' onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant='primary' type='submit' block
                                style={{ marginTop: 50, padding: 10, alignSelf: 'center' }}>
                                로그인
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}