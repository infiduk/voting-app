import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class IngList extends Component {
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