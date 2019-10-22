import React, { Component } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import ReactExport from 'react-export-excel';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

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
                            )
                        },
                        closeOnClickOutside: false
                    })
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

                    if (this.state.vote.status != 2) {
                        confirmAlert({
                            customUI: ({ onClose }) => {
                                return (
                                    <div className='custom-confirm-ui'>
                                        <div className='text-center'>
                                            <p style={{ marginBottom: 20 }}>
                                                완료된 선거의 결과만 볼 수 있습니다.
                                </p>
                                        </div>
                                        <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                                            onClose();
                                            window.location.assign('/');
                                        }}> 확인 </button>
                                    </div>
                                )
                            },
                            closeOnClickOutside: false
                        })
                    }
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
            let result = ((votes / this.state.totalVote) * 100).toFixed(1);
            return (
                <>
                    <h5 style={{ marginTop: 10 }}>{c.name}{c.name_ex}</h5>
                    <ProgressBar striped variant="info" now={result} label={`${result}%`} />
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
                    <ExcelFile
                        filename={`${this.state.vote.title}` + ' 결과'}
                        element={<Button variant='primary' size='lg' style={{ marginTop: 25 }} block>엑셀 파일로 결과 저장</Button>}>
                        <ExcelSheet data={resultPg} name='Result'>
                            <ExcelColumn label='이름' value='name' />
                            <ExcelColumn label='이름 구분자' value='names' />
                            <ExcelColumn label='득표수' value='votes' />
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            </div>
        )
    }
}