import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AdminSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            password: '',
            name: '',
            name_ex: '',
            phone: ''
        };
    }

    // 관리자 등록 api fetch
    handleSubmit = async e => {
        e.preventDefault();

        let adminInfo = {
            'uid': this.state.uid,
            'password': this.state.password,
            'name': this.state.name,
            'name_ex': this.state.name_ex,
            'phone': this.state.phone
        };

        const response = await fetch('/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminInfo),
        });
        
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
                        <h3 style={{marginTop: 30, textAlign: 'center'}}>관리자 회원가입</h3>
                        <Form style={{padding: 25, marginTop: 10}} onSubmit={this.handleSubmit}>
                            <Form.Group controlId='adminId'>
                                <Form.Label>ID</Form.Label>
                                <Form.Control type='id' name='uid' size='lg' placeholder='아이디를 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='adminPw'>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type='password' name='password' size='lg' placeholder='비밀번호를 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='adminName'>
                                <Form.Label>이름</Form.Label>
                                <Form.Control type='text' name='name' size='lg' placeholder='이름을 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='adminNameEx'>
                                <Form.Label>중복 방지 영어 단어</Form.Label>
                                <Form.Control type='text' name='name_ex' size='lg' placeholder='중복 방지 영어 단어를 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='adminPhone'>
                                <Form.Label>핸드폰 번호</Form.Label>
                                <Form.Control type='number' name='phone' size='lg' placeholder='핸드폰 번호를 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant='primary' type='submit' block
                                style={{marginTop: 50, padding: 10, alignSelf: 'center'}}>
                                회원가입
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}