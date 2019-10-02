import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import List from 'react-list-select';
import update from 'react-addons-update';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [], // 선거 정보 가져옴
            candidate: [], // 후보자 정보 가져옴
            ingLimit: 0, // 선택한 후보자 수
            canList: [], // 리스트 띄우기용 후보자의 이름 저장
            canIdArray: [], // 리스트 번호랑 후보자 번호 매칭용
            canArray: [], // 선택한 리스트의 번호
            canNewArray: [], // 선택한 후보자의 번호
            status: false, // 후보자를 더 선택할 수 있으면 false, 아니면 true
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        try {
            this.callApi();
        } catch (err) {
            console.log(err);
        }
    }

    callApi = () => {
        try {
            fetch('/vote', {
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
                this.state.candidate.map((c) => {
                    this.setState({
                        canList: update(this.state.canList, { $push: [c.name + c.name_ex] }),
                        canIdArray: update(this.state.canIdArray, { $push: [c.id] })
                    })
                });
            })
            .catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleVoteSubmit = async e => {
        this.state.canArray.map((c) => {
            if(c !== null) {
                let ca = this.state.canIdArray[c];
                this.state.canNewArray.push(ca);              
            };
            console.log(this.state.canNewArray);
        });

        if(this.state.canNewArray[0] != null) {
            e.preventDefault();
            try {
                await fetch('/vote', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'vote_id': this.state.voteId,
                        'candidates': this.state.canNewArray
                    })
                })
                .then(result => result.json())
                .then(json => {
                    console.log(json);
                })
                .catch(err => {
                    console.log(err);
                });
            } catch (err) {
                console.log(err);
            }
            this.setState({
                canNewArray: update(this.state.canNewArray, { $splice: [[0, this.state.canNewArray.length]] })
            })

            window.location.assign('/');
        } else {
            confirmAlert({
                customUI: ({ onClose }) => {
                return (
                    <div className='custom-confirm-ui'>
                    <div className='text-center'>
                        <p style={{ marginBottom: 20 }}>최소 한 명 이상의 후보자를 선택해주세요.
                        </p>
                    </div>
                    <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                        onClose();
                    }}> 확인 </button>
                    </div>
                )},
                closeOnClickOutside: false
            })
        }
    };

    handleChecked = async (selected) => {
        let indexId;
        if(selected.length > 1) {
            indexId = selected[selected.length - 1];
        } else {
            indexId = selected[0];
        }
        try {
            this.state.canArray.map((elem, index) => {
                if (elem === indexId) {
                    this.state.ingLimit -= 1;
                    this.state.status = true;
                    this.setState({
                        canArray: update(this.state.canArray, { $splice: [[index, 1]] })
                    })
                }
            });
            if(!this.state.status) {
                if (this.state.ingLimit < this.state.vote.limit) {
                    this.state.ingLimit += 1;
                    this.setState({
                        canArray: update(this.state.canArray, { $push: [indexId] }),
                     })
                } else {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                        return (
                            <div className='custom-confirm-ui'>
                            <div className='text-center'>
                                <p style={{ marginBottom: 20 }}>더 이상 선택하실 수 없습니다.
                                </p>
                            </div>
                            <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                                onClose();
                            }}> 확인 </button>
                            </div>
                        )},
                        closeOnClickOutside: false
                    })
                }
            }
            this.state.status = false;
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let canNameList = this.state.canArray.map(c => {
            return (
                <h5 style={{margin: 10 }}>{this.state.canList[c]}</h5>
            )
        });

        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>{this.state.vote.title}</h3>
                    <h4 style={{ margin: 10 }}>선택한 후보자 : {this.state.ingLimit}명 / {this.state.vote.limit}명</h4>
                    {canNameList}
                    <div className='card' style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        <List
                        items={this.state.canList}
                        multiple={true}
                        onChange={(selected: number) => {this.handleChecked(selected)}}
                    />
                    </div>
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} block onClick={this.handleVoteSubmit}>확인</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

