import React, { Component } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

import Navbar from './Navbar';

export default class VoteResult extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3 style={{ marginBottom: 15 }}>선거 제목 불러와서 넣기</h3>
                    <div style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        <div style={{ padding: '10px' }}>
                            <h5>누구누구</h5>
                            <ProgressBar striped variant="info" now={80} label={`${80}%`}/>
                            <h5 style={{ marginTop: 10 }}>누구누구누구</h5>
                            <ProgressBar striped variant="info" now={60} label={`${60}%`}/>
                            <h5 style={{ marginTop: 10 }}>누구누김수한무</h5>
                            <ProgressBar striped variant="info" now={55} label={`${55}%`}/>
                            <h6 style={{ marginTop: 10 }}>거북이와두루미</h6>
                            <ProgressBar striped variant="warning" now={20} label={`${20}%`}/>
                            <h6 style={{ marginTop: 10 }}>아쉬워요</h6>
                            <ProgressBar striped variant="warning" now={9} label={`${9}%`}/>
                        </div>
                    </div>
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} block>뒤로가기</Button>
                    </Form>
                </div>
            </div>
        )
    }
}