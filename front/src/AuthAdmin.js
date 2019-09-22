import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/testExpress');
        console.log(response);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/sendExpress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });
    };

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
                            height: '420px',
                            backgroundColor: '#f1f1f1',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                        <h3 style={{marginTop: 30, textAlign: 'center'}}>관리자 로그인</h3>
                        <Form style={{padding: 25, marginTop: 10}}>
                            <Form.Group controlId='adminId'>
                                <Form.Label>관리자 ID</Form.Label>
                                <Form.Control type='id' size='lg' placeholder='ID' />
                            </Form.Group>
                            <Form.Group controlId='adminPw'>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type='password' size='lg' placeholder='Password' />
                            </Form.Group>
                            <Button variant='primary' type='submit' block
                                style={{marginTop: 50, padding: 10, alignSelf: 'center'}}>
                                로그인
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}