import React, { Component } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVoteLive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            authStatus: false,

            name: '',
            name_ex: '',
            auth: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // 선거권자 인증
    handleAuthSubmit = async e => {
        e.preventDefault();

        const { voteId, name, name_ex, auth } = this.state;

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
                    'auth': auth,
                })
            })
            response.then(result => result.json())
                .then(json => {
                    this.setState({ authStatus: json.status });
                    if (this.state.authStatus) {
                        window.location.assign('/voting/' + `${this.state.voteId}`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
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
                        <h3 style={{ marginTop: 30, marginBottom: 50, textAlign: 'center' }}>현장 인증</h3>
                        <Accordion defaultActiveKey='0'>
                            <Card style={{ margin: 0 }}>
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
                                        <FormControl
                                            placeholder='인증번호를 입력해주세요.'
                                            name='auth'
                                            onChange={this.handleChange}
                                            aria-describedby='basic-addon2'
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={this.handleAuthSubmit}>확인</Button>
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