import React, { Component, createRef } from 'react';
import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';

export default class CreateVote extends Component {
    constructor(props) {
        super(props);
        this.statsRef = createRef();
    }

    handleScrollToStats = () => {
        window.scrollTo({
            top: this.statsRef.current.offsetTop
        })
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
                        height: '600    px',
                        backgroundColor: '#fafafa',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ marginTop: 30, marginBottom: 20, textAlign: 'center' }}>선거 만들기</h3>
                        <Form style={{ padding: 25, marginTop: 10 }}>
                            <Form.Group controlId='name'>
                                <Form.Label>선거 명</Form.Label>
                                <Form.Control type='textm' size='lg' placeholder='선거 명을 입력하세요.' />
                            </Form.Group>
                            <Form.Group controlId='begin_date'>
                                <Form.Label>시작 날짜</Form.Label>
                                <Form.Control type='date' size='lg' />
                            </Form.Group>
                            <Form.Group controlId='end_date'>
                                <Form.Label>종료 날짜</Form.Label>
                                <Form.Control type='date' size='lg' />
                            </Form.Group>
                            <Form.Group controlId='limit'>
                                <Form.Label>투표 선출 인원</Form.Label>
                                <Form.Control type='number' size='lg' placeholder='투표 선출 인원 수를 입력하세요.' />
                            </Form.Group>
                            {/* <Button variant='primary' type='submit' block
                                style={{ marginTop: 50, padding: 10, alignSelf: 'center' }}
                                onClick={this.handleScrollToStats}>
                                다음
                            </Button> */}
                            <Form.Group controlId='limit'>
                                <Form.Label>후보자 명단 파일(.xlsx)</Form.Label>
                                <Form.Control type="file" name="file" onChange={this.onChangeHandler}/>
                            </Form.Group>
                            <Form.Group controlId='limit'>
                                <Form.Label>투표자 명단 파일(.xlsx)</Form.Label>
                                <Form.Control type="file" name="file" onChange={this.onChangeHandler}/>
                            </Form.Group>
                        </Form>
                        <Button variant='primary' type='submit' size='lg'
                                style={{ marginTop: 13, marginBottom: 20, width: '80%', alignSelf: 'center' }}
                                onClick={this.handleScrollToStats}>
                                확인
                        </Button>
                    </div>
                    {/* <div ref={this.statsRef}>
                        <Divider horizontal> Statistics </Divider>
                    </div> */}
                </div>
            </div>
        )
    }
}