import React, { Component } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class VoteResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [],
            candidate: [],
            canVote: 0,
            totalVote: 0,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        try {
            this.callApi();
        } catch (err) {
            console.log(err);
        }
        this.sessionApi()
            .then(res => {
                if (!res.json().result) {
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
                } else {
                    console.log(res.session);
                }
            })
            .catch(err => console.log(err));
    }

    sessionApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.json().msg);
        return response.json();
    }

    callApi = () => {
        try {
            fetch('/finvote', {
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
                this.setState({ vote: json.voteData, candidate: json.candidateData, totalVote: json.totalVote });
            })
            .catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleGoBack = () => {
        window.location.assign('/finList');
    }

    render() {
        let resultPg = this.state.candidate.map((c) => {
            let votes = c.votes;
            let result = ((votes/this.state.totalVote) * 100).toFixed(1);
            return(
                <>
                <h5 style={{ marginTop: 10 }}>{c.name}</h5>
                <ProgressBar striped variant="info" now={result} label={`${result}%`}/>
                </>
            );
        });

        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3 style={{ marginBottom: 15 }}>{this.state.vote.title}</h3>
                    <div style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        <div style={{ padding: '10px' }}>
                            {resultPg}
                        </div>
                    </div>
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} onClick={this.handleGoBack} block>뒤로가기</Button>
                    </Form>
                </div>
            </div>
        )
    }
}