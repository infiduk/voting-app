import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { Alert } from '../../components/Alert'
import { SqureButton, BoldButton } from '../../components/Button'

export default class SelectAuth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voteId: this.props.match.params.voteId,
            isAdmin: false, // 사용자 구분
        }
    }

    componentDidMount() {
        this.sessionApi()
            .then(res => {
                res.result
                    ? this.setState({ isAdmin: true })
                    : this.setState({ isAdmin: false })
            })
            .catch(err => console.log(err))
    }

    // 선거 삭제
    deleteVote = async () => {
        const { voteId } = this.state

        try {
            this.state.isAdmin
                ? await fetch('/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ voteId }),
                })
                    .then(result => result.json())
                    .then(json => {
                        json.result && confirmAlert({
                            customUI: () => {
                                return (
                                    <Alert content='선거 삭제가 완료되었습니다.' label='확인' href='/' />
                                )
                            },
                            closeOnClickOutside: false
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                : confirmAlert({
                    customUI: () => {
                        return (
                            <Alert content='잘못된 접근입니다.' label='확인' href='/' />
                        )
                    },
                    closeOnClickOutside: false
                })
        } catch (err) {
            console.log(err)
        }
    }

    sessionApi = async () => {
        try {
            const response = await fetch('/session')
            if (response.status !== 200) throw Error(response.json().msg)
            return response.json()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className='row' style={{ margin: 25, alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginTop: 20, marginRight: 5 }}>
                    <SqureButton variant='outline-primary' href={`/phone/${this.state.voteId}`} label='모바일 인증' />
                </div>
                <div style={{ marginTop: 20, marinLeft: 5 }}>
                    <SqureButton variant='outline-secondary' href={`/live/${this.state.voteId}`} label='현장 인증' />
                </div>
                {this.state.isAdmin
                    && <>
                        <div style={{ marginTop: 40 }}>
                            <BoldButton variant='outline-info' href={`/admin/${this.state.voteId}`} label='회원 인증번호 생성' />
                        </div>
                        <div style={{ marginTop: 40 }}>
                            <BoldButton variant='outline-warning' click={this.deleteVote} label='해당 선거 삭제' />
                        </div>
                    </>
                }
            </div>
        )
    }
}