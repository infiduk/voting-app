import React, { Component, createRef } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'
import { Button, Form } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import moment from 'moment'

import { Alert } from '../../components/Alert'
import { VoteForm } from '../../components/Form'

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.statsRef = createRef()
        this.state = {
            title: '',
            dates: null,
            context: '',
            maxDate: moment().add(24, 'days').toDate(),
            limit: '',
            vote_id: '',

            name: '',
            name_ex: '',
            phone: '',
            candidateList1: '',
            candidateList2: '',
            candidateList3: '',
            electorateList: '',

            isOpen: false,
            can1DataLoaded: false,
            can2DataLoaded: false,
            can3DataLoaded: false,
            eleDataLoaded: false,
            isFormInvalidCan1: false,
            isFormInvalidCan2: false,
            isFormInvalidCan3: false,
            isFormInvalidEle: false,
            uploadedCan1FileName: '',
            uploadedCan2FileName: '',
            uploadedCan3FileName: '',
            uploadedEleFileName: '',
            can1Rows: null,
            can1Cols: null,
            can2Rows: null,
            can2Cols: null,
            can3Rows: null,
            can3Cols: null,
            eleRows: null,
            eleCols: null,

            isVoteSubmit: false,
            isCandidate1Submit: false,
            isCandidate2Submit: false,
            isCandidate3Submit: false,
        }

        this.fileCan1Input = React.createRef()
        this.fileCan2Input = React.createRef()
        this.fileCan3Input = React.createRef()
        this.fileEleInput = React.createRef()
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                if (!res.result) {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                            return (
                                <Alert content='관리자만 접근 가능합니다.' href='/' label='확인' />
                            )
                        },
                        closeOnClickOutside: false
                    })
                }
            })
            .catch(err => console.log(err))
    }

    onSelect = dates => this.setState({ dates })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // 새로운 선거 등록 api fetch
    handleCreateVoteSubmit = async e => {
        e.preventDefault()

        const { title, dates, limit, context } = this.state

        let voteInfo = {
            'title': title,
            'context': context,
            'begin_date': moment(dates.start).format('YYYY-MM-DD HH:mm:ss'),
            'end_date': moment(dates.end).format('YYYY-MM-DD HH:mm:ss'),
            'limit': limit
        }
        console.log(JSON.stringify(voteInfo))

        const response = fetch('/admin/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voteInfo),
        })
        response.then(result => result.json())
            .then(json => {
                console.log(json.msg)
                this.setState({ vote_id: json.data, isVoteSubmit: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 새로운 후보자1 등록 api fetch
    handleCreateVoteCandidate1Submit = async e => {
        e.preventDefault()

        const { vote_id, candidateList1 } = this.state

        await fetch('/admin/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': vote_id,
                'candidates': candidateList1
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json.msg)
                this.setState({ isCandidate1Submit: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 새로운 후보자2 등록 api fetch
    handleCreateVoteCandidate2Submit = async e => {
        e.preventDefault()

        const { vote_id, candidateList2 } = this.state

        await fetch('/admin/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': vote_id,
                'candidates': candidateList2
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json.msg)
                this.setState({ isCandidate2Submit: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 새로운 후보자3 등록 api fetch
    handleCreateVoteCandidate3Submit = async e => {
        e.preventDefault()

        const { vote_id, candidateList3 } = this.state

        await fetch('/admin/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': vote_id,
                'candidates': candidateList3
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json.msg)
                this.setState({ isCandidate3Submit: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 새로운 선거권자 등록 api fetch
    handleCreateVoteElectorateSubmit = async e => {
        e.preventDefault()

        const { vote_id, electorateList } = this.state

        await fetch('/admin/electorate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'vote_id': vote_id,
                'electorates': electorateList
            })
        })
        window.location.assign('/')
    }

    handleScrollToStats = () => {
        window.scrollTo({
            top: this.statsRef.current.offsetTop
        })
    }

    renderCandidate1File = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            }
            else {
                this.setState({
                    can1DataLoaded: true,
                    can1Cols: resp.cols,
                    can1Rows: resp.rows
                })
            }
            this.setState({ candidateList1: JSON.stringify(resp.rows) })
        })
    }

    renderCandidate2File = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            }
            else {
                this.setState({
                    can2DataLoaded: true,
                    can2Cols: resp.cols,
                    can2Rows: resp.rows
                })
            }
            this.setState({ candidateList2: JSON.stringify(resp.rows) })
        })
    }

    renderCandidate3File = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            }
            else {
                this.setState({
                    can3DataLoaded: true,
                    can3Cols: resp.cols,
                    can3Rows: resp.rows
                })
            }
            this.setState({ candidateList3: JSON.stringify(resp.rows) })
        })
    }

    renderElectorateFile = (fileObj) => {
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            }
            else {
                this.setState({
                    eleDataLoaded: true,
                    eleCols: resp.cols,
                    eleRows: resp.rows
                })
            }
            this.setState({ electorateList: JSON.stringify(resp.rows) })
        })
    }

    fileCandidate1Handler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0]
            let fileName = fileObj.name

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedCan1FileName: fileName,
                    isFormInvalidCan1: false
                })
                this.renderCandidate1File(fileObj)
            }
            else {
                this.setState({
                    isFormInvalidCan1: true,
                    uploadedCan1FileName: ""
                })
            }
        }
    }

    fileCandidate2Handler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0]
            let fileName = fileObj.name

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedCan2FileName: fileName,
                    isFormInvalidCan2: false
                })
                this.renderCandidate2File(fileObj)
            }
            else {
                this.setState({
                    isFormInvalidCan2: true,
                    uploadedCan2FileName: ""
                })
            }
        }
    }

    fileCandidate3Handler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0]
            let fileName = fileObj.name

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedCan3FileName: fileName,
                    isFormInvalidCan3: false
                })
                this.renderCandidate3File(fileObj)
            }
            else {
                this.setState({
                    isFormInvalidCan3: true,
                    uploadedCan3FileName: ""
                })
            }
        }
    }

    fileElectorateHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0]
            let fileName = fileObj.name

            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedEleFileName: fileName,
                    isFormInvalidEle: false
                })
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

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    openCan1FileBrowser = () => {
        this.fileCan1Input.current.click()
    }

    openCan2FileBrowser = () => {
        this.fileCan2Input.current.click()
    }

    openCan3FileBrowser = () => {
        this.fileCan3Input.current.click()
    }

    openEleFileBrowser = () => {
        this.fileEleInput.current.click()
    }

    callApi = async () => {
        const response = await fetch('/session')
        if (response.status !== 200) throw Error(response.msg)
        return response.json()
    }

    render() {
        return (
            <div style={{ marginTop: 25, padding: 15 }}>
                <h3 style={{ marginTop: 30, marginBottom: 20, textAlign: 'center' }}>선거 만들기</h3>
                <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.handleCreateVoteSubmit}>
                    <Form.Group controlId='title'>
                        <Form.Label>선거 명</Form.Label>
                        <Form.Control type='text' name='title' size='lg' placeholder='선거 명을 입력하세요.' onChange={this.handleChange} disabled={this.state.isVoteSubmit} />
                    </Form.Group>
                    <Form.Group controlId='context'>
                        <Form.Label>선거 내용</Form.Label>
                        <Form.Control type='text' name='context' size='lg' placeholder='선거 설명을 입력하세요.' onChange={this.handleChange} disabled={this.state.isVoteSubmit} />
                    </Form.Group>
                    <Form.Group controlId='begin_date'>
                        <Form.Label>선거 날짜 범위 선택</Form.Label><br />
                        <DateRangePicker
                            maximumDate={this.state.maxDate}
                            onSelect={this.onSelect}
                            value={this.state.dates}
                            disabled={this.state.isVoteSubmit}
                        />
                    </Form.Group>
                    <Form.Group controlId='limit'>
                        <Form.Label>투표 선출 인원</Form.Label>
                        <Form.Control type='number' name='limit' size='lg' placeholder='투표 선출 인원 수를 입력하세요.' onChange={this.handleChange} disabled={this.state.isVoteSubmit} />
                    </Form.Group>
                    <Button variant='primary' type='submit' size='lg' disabled={this.state.isVoteSubmit}
                        style={{ marginTop: 13, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        다음
                            </Button>
                </Form>
                <VoteForm
                    onSubmit={this.handleCreateVoteCandidate1Submit}
                    title='후보자1 파일 등록'
                    onClick={this.openCan1FileBrowser}
                    disabled={this.candidateList1}
                    label='후보자1 파일 등록'
                    onChange={this.fileCandidate1Handler}
                    refs={this.fileCan1Input}
                    value={this.state.uploadedCan1FileName}
                    dataLoaded={this.state.can1DataLoaded}
                    data={this.state.can1Rows}
                    columns={this.state.can1Cols}
                    subBtn={this.state.isCandidate1Submit} />
                <VoteForm
                    onSubmit={this.handleCreateVoteCandidate2Submit}
                    title='후보자2 파일 등록'
                    onClick={this.openCan2FileBrowser}
                    disabled={this.candidateList2}
                    label='후보자2 파일 등록'
                    onChange={this.fileCandidate2Handler}
                    refs={this.fileCan2Input}
                    value={this.state.uploadedCan2FileName}
                    dataLoaded={this.state.can2DataLoaded}
                    data={this.state.can2Rows}
                    columns={this.state.can2Cols}
                    subBtn={this.state.isCandidate2Submit} />
                <VoteForm
                    onSubmit={this.handleCreateVoteCandidate3Submit}
                    title='후보자3 파일 등록'
                    onClick={this.openCan3FileBrowser}
                    disabled={this.candidateList3}
                    label='후보자3 파일 등록'
                    onChange={this.fileCandidate3Handler}
                    refs={this.fileCan3Input}
                    value={this.state.uploadedCan3FileName}
                    dataLoaded={this.state.can3DataLoaded}
                    data={this.state.can3Rows}
                    columns={this.state.can3Cols}
                    subBtn={this.state.isCandidate3Submit} />
                <VoteForm
                    onSubmit={this.handleCreateVoteElectorateSubmit}
                    title='선거권자 파일 등록'
                    onClick={this.openEleFileBrowser}
                    label='선거권자 파일 등록'
                    onChange={this.fileElectorateHandler}
                    refs={this.fileEleInput}
                    value={this.state.uploadedEleFileName}
                    dataLoaded={this.state.eleDataLoaded}
                    data={this.state.eleRows}
                    columns={this.state.eleCols} />
            </div>
        )
    }
}