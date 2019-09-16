import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Button variant="primary" size="lg" block>
                    Block level button
                </Button>
                <Button variant="secondary" size="lg" block>
                    Block level button
                </Button>
            </div>
        );
    }
}