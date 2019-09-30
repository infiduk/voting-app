import React, { Component } from 'react';
import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
            name: '',
            name_ex: '',
        }
    }

    componentDidMount() {
        this.setState({ voteId: this.props.match.params.voteId })
        this.callApi()
            .then(res => {
                if (!res.result) {
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
                                window.location.assign('/');
                            }}> 확인 </button>
                            </div>
                        )},
                        closeOnClickOutside: false
                    })
                } else {
                }
            })
            .catch(err => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleElectorateSubmit = async e => {
        e.preventDefault();

        let electorateInfo = {
            'vote_id': this.state.voteId,
            'name': this.state.name,
            'name_ex': this.state.name_ex,
            'limit': this.state.limit
        };

        const response = fetch('/admin/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(electorateInfo),
        });
        response.then(result => result.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            });
    };

    callApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.json().msg);
        return response.json();
    }

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
                        <h3 style={{ marginTop: 30, marginBottom: 50, textAlign: 'center' }}>회원 인증번호 생성</h3>
                        <Accordion defaultActiveKey='0'>
                            <Card style={{ margin: 10 }}>
                                <Card.Header style={{ backgroundColor: '#fff' }}>
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
                                    <InputGroup className='mb-3' size='lg'>
                                        <InputGroup.Append>
                                            <Accordion.Toggle as={Button} variant='link' eventKey='1' onClick={this.handleElectorateSubmit}>
                                                인증번호 받기
                                            </Accordion.Toggle>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Card.Header>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}