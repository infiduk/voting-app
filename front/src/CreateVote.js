import React, { Component, createRef } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import update from 'react-addons-update';
import { Button, Card, Col, Form, FormGroup, InputGroup } from 'react-bootstrap';

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

            name: '',
            name_ex: '',
            phone: '',

            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            uploadedFileName: '',
            rows: null,
            cols: null,

            xlsxJson: {
                name: '',
                name_ex: '',
                phone: '',
            }
        }

        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.fileInput = React.createRef();
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


        const response = await fetch('/admin/candidate', {
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

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    dataLoaded: true,
                    cols: resp.cols,
                    rows: resp.rows
                });
            }

            var count = Object.keys(resp.rows).length;
            console.log(count);

            let jsonArray = JSON.stringify(this.state.rows);
            console.log(jsonArray);

            console.log(JSON.stringify(this.state.rows));

            for (let i = 1; i < count; i++) {
                let newState = update(this.state, {
                    xlsxJson: {
                        $push: [{"name": resp.rows[`${i}`][0],
                        "name_ex": [`${i}`][1], 
                        
                    }]
                    }
                });
                this.setState(newState);
                console.log(JSON.stringify(xlsxJson));
            }
            console.log(xlsxJson);
        });
    }

    fileHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;

            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false
                });
                this.renderFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: ""
                })
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
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
                        height: '1000px',
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
                            <Button variant='primary' type='submit' size='lg'
                                style={{ marginTop: 13, width: '80%', alignSelf: 'center' }}>
                                다음
                            </Button>
                        </Form>
                        <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateCandidateSubmit}>
                            <h6 style={{ marginBottom: 10 }}>후보자 파일 등록</h6>
                            <Form>
                                <FormGroup row='true'>
                                    <Col>
                                        <InputGroup>
                                            <Button color='primary' style={{ color: 'white', zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className='cui-file'></i> 파일 등록</Button>
                                            <input type='file' hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ 'padding': '10px' }} />
                                            <input type='text' className='form-control' value={this.state.uploadedFileName} readOnly invalid='false' />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                            {this.state.dataLoaded &&
                                <div style={{ margin: 20 }}>
                                <Card body outline color='secondary' className='restrict-card'>
                                    <OutTable data={this.state.rows} columns={this.state.cols} tableClassName='ExcelTable2007' />
                                </Card>
                            </div>}
                            <Button variant='primary' type='submit' size='lg'
                            style={{ marginTop: 13, marginBottom: 20, width: '80%', alignSelf: 'center' }}>
                            다음
                            </Button>
                        </Form>
                    <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateElectorateSubmit}>
                        <h6 style={{ marginBottom: 10 }}>선거권자 파일 등록</h6>
                        <Form>
                            <FormGroup row='true'>
                                <Col>
                                    <InputGroup>
                                        <Button color='primary' style={{ color: 'white', zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className='cui-file'></i> 파일 등록</Button>
                                        <input type='file' hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ 'padding': '10px' }} />
                                        <input type='text' className='form-control' value={this.state.uploadedFileName} readOnly invalid='false' />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                        </Form>
                        {this.state.dataLoaded &&
                            <div style={{ margin: 20 }}>
                                <Card body outline color='secondary' className='restrict-card'>
                                    <OutTable data={this.state.rows} columns={this.state.cols} tableClassName='ExcelTable2007' />
                                </Card>
                            </div>}
                        <Button variant='primary' type='submit' size='lg'
                            style={{ marginTop: 13, marginBottom: 20, width: '80%', alignSelf: 'center' }}>
                            다음
                            </Button>
                    </Form>
                </div>
            </div>
            </div >
        )
    }
}