import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    componentDidMount() {
        this.callApi()
            .then(res => {
                if (!res.result) {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                        return (
                            <div className='custom-confirm-ui'>
                            <div className='text-center'>
                                <p style={{ marginBottom: 20 }}>
                                    관리자만 접근 가능합니다.
                                </p>
                            </div>
                            <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                                onClose();
                                window.location.assign('/');
                            }}> 확인 </button>
                            </div>
                        )},
                        closeOnClickOutside: false
                    })
                }
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.msg);
        return response.json();
    }

    // 관리자 등록 api fetch
    handleSubmit = async e => {
        e.preventDefault();

        const { uid, password, name, name_ex, phone } = this.state;

        let adminInfo = {
            'uid': uid,
            'password': password,
            'name': name,
            'name_ex': name_ex,
            'phone': phone
        };

        if(uid === null || password === null || name === null || name_ex === null || phone === null) {
            confirmAlert({
                customUI: () => {
                return (
                    <div className='custom-confirm-ui'>
                    <div className='text-center'>
                        <p style={{ marginBottom: 20 }}>모든 항목에 값을 입력해주세요.
                        </p>
                    </div>
                    <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                        window.location.assign('/adminSignup');
                    }}> 확인 </button>
                    </div>
                )},
                closeOnClickOutside: false
            })
        } else {
            await fetch('/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminInfo),
            });
            
            window.location.assign('/');
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 25, padding: 25 }}>
                    <div style={{
                            display: 'initial',
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