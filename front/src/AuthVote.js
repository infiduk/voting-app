import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div class='row' style={{margin: 25}}>
                    <div style={{marginRight: 50}}>
                        <Button
                            variant='outline-primary'
                            size='lg'
                            block
                            style={{height: '200'}}>
                            핸드폰 인증
                        </Button>
                    </div>
                    <div style={{marginLeft: 50}}>
                        <Button
                            variant='outline-secondary'
                            size='lg'
                            block>
                            현장 인증
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}