import React, { Component } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';

import Navbar from './Navbar';

export default class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [],
            candidate: [],
            isClicked: [
                {
                    candidateId: '',
                    clicked: false
                }
            ]
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e) {
        alert(e.currentTarget.dataset.id);
    }

    async componentDidMount() {
        try {
            await this.callApi();
        } catch (err) {
            console.log(err);
        }
    }

    callApi = async () => {
        try {
            await fetch('/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'vote_id': this.state.voteId
                })
            })
                .then(result => result.json())
                .then(json => {
                    this.setState({ vote: json.voteData, candidate: json.candidateData });
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    handleVoteSubmit = async e => {
        e.preventDefault();
        try {
            await fetch('/vote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'votd_id': this.state.vote_id,
                    'candidates': this.state.candidate
                })
            })
                .then(result => result.json())
                .then(json => {
                    this.setState({ vote: json.voteData, candidate: json.candidateData });
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
                <div style={{ margin: 25 }}>
                    <h3>{this.state.vote.title}</h3>
                    {/* 자동으로 따라다니는 애로 넣기 */}
                    <h4 style={{ margin: 10 }}>투표 인원 : 몇명 / 몇명</h4>
                    <Form inline style={{ marginBottom: 10 }}>
                        <FormControl type='text' placeholder='검색할 후보자의 이름을 입력하세요.' className='mr-sm-2' style={{ width: '70%' }} />
                        <Button variant='primary'>검색</Button>
                    </Form>
                    <div className='card' style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        {this.state.candidate.map(candidate => {
                            return <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={this.handleCheck} key={candidate.id} data-id={candidate.id}>  
                                <Card.Body>
                                    <Form.Check inline id={candidate.id} /><Card.Title>{candidate.name} {candidate.name_ex}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        })}
                    </div>
                    {/*  return <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={this.handleCheck} key={candidate.id} data-id={candidate.id}>
                                <Card.Body>
                                    <Card.Title>{candidate.name} {candidate.name_ex}</Card.Title>
                                </Card.Body>
                            </Card> */}
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} block onClick={this.handleVoteSubmit}>확인</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

