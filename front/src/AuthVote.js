import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div style={{margin: 25}}>
                    <Button variant="outline-primary" size="lg" block>
                        핸드폰 인증
                    </Button>
                    <Button variant="outline-secondary" size="lg" block>
                        현장 인증
                    </Button>
                </div>
            </div>
        );
    }
}