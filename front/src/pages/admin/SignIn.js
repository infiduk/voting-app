import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { Alert } from '../../components/Alert'
import { InputForm } from '../../components/Form'
import { BlockButton } from '../../components/Button'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            password: ''
        }
    }

    // 관리자 로그인
    signSubmit = async e => {
        e.preventDefault()

        const { phone, password } = this.state

        let signInfo = {
            'phone': phone,
            'password': password
        }

        try {
            await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInfo),
            })
                .then(result => result.json())
                .then(json => {
                    json.result
                        ? window.location.assign('/')
                        : confirmAlert({
                            customUI: () => {
                                return (
                                    <Alert content='휴대폰 번호 또는 비밀번호를 확인해주세요.' label='확인' href='/signin' />
                                )
                            },
                            closeOnClickOutside: false
                        })
                })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div style={{ marginTop: 25, padding: 25 }}>
                <h3 style={{ marginTop: 30, textAlign: 'center' }}>관리자 로그인</h3>
                <Form style={{ padding: 25, marginTop: 10 }} onSubmit={this.signSubmit}>
                    <InputForm label='핸드폰 번호' type='number' name='phone' placeholder='핸드폰 번호를 입력하세요.' change={this.handleChange} />
                    <InputForm label='비밀번호' type='password' name='password' placeholder='비밀번호를 입력하세요.' change={this.handleChange} />
                    <BlockButton label='로그인' type='submit' />
                </Form>
            </div>
        )
    }
}