import React, { Component } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import ReactExport from 'react-export-excel';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class VoteResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [],
            candidate: [],
            exportVote: [],
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

                    if (this.state.vote.status !== 2) {
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
            let result = ((c.votes / this.state.totalVote) * 100).toFixed(1);
            if (result >= 50) this.state.exportVote.push([c.name, c.name_ex, c.votes]);
            // this.state.exportVote.push([c.name, c.name_ex, c,phone, c.votes]);
            return (
                <>
                    <h5 style={{ marginTop: 10 }}>{c.name}{c.name_ex}님 - 총 {this.state.totalVote}표 중, {c.votes}표 득표</h5>
                    { result >= 50 ?
                        <ProgressBar striped variant="info" now={result} label={`${result}%`} />
                        : <ProgressBar striped variant="warning" now={result} label={`${result}%`} />
                    }
                </>
            );
        });

        let dataSet = [
            {
                columns: ["name", "name_ex", "phone", "votes"],
                data: this.state.exportVote,
            }
        ];

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
                        filename={`${this.state.vote.title} 결과`}
                        element={<Button variant='primary' size='lg' style={{ marginTop: 25 }} block>엑셀 파일로 결과 저장</Button>}>
                        <ExcelSheet dataSet={dataSet} name='vote' />
                    </ExcelFile>
                </div>
            </div>
        )
    }
}