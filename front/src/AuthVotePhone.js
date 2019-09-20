import React, { Component } from 'react';
import { Accordion, Button, Card, FormControl, InputGroup } from 'react-bootstrap';

import Navbar from './Navbar';

export default class IngList extends Component {
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
                                    <InputGroup className='mb-3'size='lg'>
                                        <FormControl
                                            placeholder='휴대폰 번호를 입력해주세요.'
                                            aria-label='010-1234-5678'
                                            aria-describedby='basic-addon'
                                        />
                                        <InputGroup.Append>
                                            <Accordion.Toggle as={Button} variant='link' eventKey='1'>
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
                                                aria-label='1234'
                                                aria-describedby='basic-addon'
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary">확인</Button>
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