import React, { Component, createRef } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Button, Card, Col, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class CreateVote extends Component {
    constructor(props) {
        super(props);
        this.statsRef = createRef();
        this.state = {
            title: '',
            begin_date: '',
            end_date: '',
            limit: '',
            vote_id: '',

            name: '',
            name_ex: '',
            phone: '',
            candidateList: '',
            electorateList: '',

            isOpen: false,
            canDataLoaded: false,
            eleDataLoaded: false,
            isFormInvalidCan: false,
            uploadedCanFileName: '',
            isFormInvalidEle: false,
            uploadedEleFileName: '',
            canRows: null,
            canCols: null,
            eleRows: null,
            eleCols: null,
        }

        this.fileCandidateHandler = this.fileCandidateHandler.bind(this);
        this.fileElectorateHandler = this.fileElectorateHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openCanFileBrowser = this.openCanFileBrowser.bind(this);
        this.openEleFileBrowser = this.openEleFileBrowser.bind(this);
        this.renderCandidateFile = this.renderCandidateFile.bind(this);
        this.renderElectorateFile = this.renderElectorateFile.bind(this);
        this.fileCanInput = React.createRef();
        this.fileEleInput = React.createRef();
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                if (!res.result) {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                        return (
                            <div className='custom-confirm-ui'>
                            <div className='text-center'>
                                <p style={{ marginBottom: 20 }}>관리자만 접근 가능합니다.
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
                }
            })
            .catch(err => console.log(err));
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

        const response = fetch('/admin/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voteInfo),
        });
        response.then(result => result.json())
            .then(json => {
                console.log(json.data);
                this.setState({ vote_id: json.data });
            })
            .catch(err => {
                console.log(err);
            });
    };

    // 새로운 후보자 등록 api fetch
    handleCreateVoteCandidateSubmit = async e => {
        e.preventDefault();
        await fetch('/admin/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': this.state.vote_id,
                'candidates': this.state.candidateList
            })
        });
    };

    // 새로운 선거권자 등록 api fetch
    handleCreateVoteElectorateSubmit = async e => {
        e.preventDefault();
        await fetch('/admin/electorate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': this.state.vote_id,
                'electorates': this.state.electorateList
            })
        });
        window.location.assign('/');
    };

    handleScrollToStats = () => {
        window.scrollTo({
            top: this.statsRef.current.offsetTop
        })
    }

    renderCandidateFile = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    canDataLoaded: true,
                    canCols: resp.cols,
                    canRows: resp.rows
                });
            }
            this.setState({ candidateList: JSON.stringify(resp.rows) });
        });
    }

    renderElectorateFile = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    eleDataLoaded: true,
                    eleCols: resp.cols,
                    eleRows: resp.rows
                });
            }
            this.setState({ electorateList: JSON.stringify(resp.rows) });
        });
    }

    fileCandidateHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedCanFileName: fileName,
                    isFormInvalidCan: false
                });
                this.renderCandidateFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalidCan: true,
                    uploadedCanFileName: ""
                })
            }
        }
    }

    fileElectorateHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedEleFileName: fileName,
                    isFormInvalidEle: false
                });
                this.renderElectorateFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalidEle: true,
                    uploadedEleFileName: ""
                })
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openCanFileBrowser = () => {
        this.fileCanInput.current.click();
    }

    openEleFileBrowser = () => {
        this.fileEleInput.current.click();
    }

    callApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.msg);
        return response.json();
    }

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 25, padding: 15 }}>
                    <div style={{
                        display: 'initial',
                        marginTop: 20,
                        marginBotom: 20,
                        width: '80vw',
                        height: '80%',
                        backgroundColor: '#fafafa',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
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
                            <Button variant='primary' type='submit' size='lg'
                                style={{ marginTop: 13, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                다음
                            </Button>
                        </Form>
                        <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateVoteCandidateSubmit}>
                            <h6 style={{ marginBottom: 10 }}>후보자 파일 등록</h6>
                            <FormGroup row='true'>
                                <Col>
                                    <InputGroup>
                                        <Button color='primary' style={{ color: 'white', zIndex: 0 }} onClick={this.openCanFileBrowser.bind(this)}> 파일 등록</Button>
                                        <input type='file' hidden onChange={this.fileCandidateHandler.bind(this)} ref={this.fileCanInput} onClick={(event) => { event.target.value = null }} style={{ 'padding': '10px' }} />
                                        <input type='text' className='form-control' value={this.state.uploadedCanFileName} readOnly invalid='false' />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {this.state.canDataLoaded &&
                                <div style={{ margin: 20 }}>
                                    <Card body outline='true' className='restrict-card'>
                                        <OutTable data={this.state.canRows} columns={this.state.canCols} tableClassName='ExcelTable2007' />
                                    </Card>
                                </div>}
                            <Button variant='primary' type='submit' size='lg'
                                style={{ marginTop: 13, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                다음
                            </Button>
                        </Form>
                        <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateVoteElectorateSubmit}>
                            <h6 style={{ marginBottom: 10 }}>선거권자 파일 등록</h6>
                            <FormGroup row='true'>
                                <Col>
                                    <InputGroup>
                                        <Button color='primary' style={{ color: 'white', zIndex: 1 }} onClick={this.openEleFileBrowser.bind(this)}> 파일 등록</Button>
                                        <input type='file' hidden onChange={this.fileElectorateHandler.bind(this)} ref={this.fileEleInput} onClick={(event) => { event.target.value = null }} style={{ 'padding': '10px' }} />
                                        <input type='text' className='form-control' value={this.state.uploadedEleFileName} readOnly invalid='false' />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {this.state.eleDataLoaded &&
                                <div style={{ margin: 20 }}>
                                    <Card body outline='true' className='restrict-card'>
                                        <OutTable data={this.state.eleRows} columns={this.state.eleCols} tableClassName='ExcelTable2007' />
                                    </Card>
                                </div>}
                            <Button variant='primary' type='submit' size='lg'
                                style={{ marginTop: 13, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                확인
                            </Button>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}