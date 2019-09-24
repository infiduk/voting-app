import React, { Component } from 'react';
import { Accordion, Button, Card, FormControl, InputGroup } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVoteLive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
        }
    }

    componentDidMount() {
        this.setState({ voteId: this.props.match.params.voteId });
    }

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
                        <h3 style={{ marginTop: 30, marginBottom: 50, textAlign: 'center' }}>현장 인증</h3>
                        <Accordion defaultActiveKey='0'>
                            <Card style={{ margin: 0 }}>
                                <InputGroup className='mb-3' size='lg'>
                                    <FormControl
                                        placeholder='인증번호를 입력해주세요.'
                                        aria-label='ㅇㅇ'
                                        aria-describedby='basic-addon2'
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary">확인</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}