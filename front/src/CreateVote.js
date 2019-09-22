import React, { Component, createRef } from 'react';
import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';

export default class CreateVote extends Component {
    constructor(props) {
        super(props);
        this.statsRef = createRef();
        this.state = {
            response: '',
            post: '',
            responseToPost: '',

            title: '',
            begin_date: '',
            end_date: '',
            limit: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // 새로운 선거 등록 api fetch
    handleCreateVoteSubmit = async e => {
        e.preventDefault();

        let voteInfo = {
            'title': this.state.title,
            'begin_date': this.state.begin_date,
            'end_date': this.state.end_date,
            'limit': this.state.limit
        };

        console.log(voteInfo);

        const response = await fetch('/admin/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voteInfo),
        });

        console.log(response);
    };

    // 새로운 후보자 등록 api fetch
    handleCreateVoteCandidateSubmit = async e => {
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

    // 새로운 선거권자 등록 api fetch
    handleCreateVoteElectorateSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/admin/electorate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });
    };

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
                        <p>{this.state.responseToPost}</p>
                        <h3 style={{ marginTop: 30, marginBottom: 20, textAlign: 'center' }}>선거 만들기</h3>
                        <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateVoteSubmit}>
                            <Form.Group controlId='title'>
                                <Form.Label>선거 명</Form.Label>
                                <Form.Control type='text' name='title' size='lg' placeholder='선거 명을 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='begin_date'>
                                <Form.Label>시작 날짜</Form.Label>
                                <Form.Control type='date' name='begin_date' size='lg' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='end_date'>
                                <Form.Label>종료 날짜</Form.Label>
                                <Form.Control type='date' name='end_date' size='lg' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId='limit'>
                                <Form.Label>투표 선출 인원</Form.Label>
                                <Form.Control type='number' name='limit' size='lg' placeholder='투표 선출 인원 수를 입력하세요.' onChange={this.handleChange} />
                            </Form.Group>
                            {/* <Button variant='primary' type='submit' block
                                style={{ marginTop: 50, padding: 10, alignSelf: 'center' }}
                                onClick={this.handleScrollToStats}>
                                다음
                            </Button> */}
                            <Form.Group controlId='candidateList'>
                                <Form.Label>후보자 명단 파일(.xlsx)</Form.Label>
                                <Form.Control type="file" name="file" onChange={this.onChangeHandler} />
                            </Form.Group>
                            <Form.Group controlId='electorateList'>
                                <Form.Label>투표자 명단 파일(.xlsx)</Form.Label>
                                <Form.Control type="file" name="file" onChange={this.onChangeHandler} />
                            </Form.Group>
                            <Button variant='primary' type='submit' size='lg'
                            style={{ marginTop: 13, marginBottom: 20, width: '80%', alignSelf: 'center' }}>
                            확인
                            </Button>
                        </Form>
                    </div>
                    {/* <div ref={this.statsRef}>
                        <Divider horizontal> Statistics </Divider>
                    </div> */}
                </div>
            </div>
        )
    }
}