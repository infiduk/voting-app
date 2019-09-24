import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Navbar from './Navbar';

export default class AuthVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: '',
        }
    }
    
    componentWillMount() {
        this.setState({ voteId: this.props.match.params.voteId })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='row' style={{ margin: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginTop: 20, marginRight: 20 }}>
                        <Button
                            variant='outline-primary'
                            size='lg'
                            href={'/authPhone/' + `${this.state.voteId}`}
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem' }}>
                            모바일 인증
                        </Button>
                    </div>
                    <div style={{ marginTop: 20, marginLeft: 20 }}>
                        <Button
                            variant='outline-secondary'
                            size='lg'
                            href={'/authLive/' + `${this.state.voteId}`}
                            style={{ width: '40vw', height: '50vw', fontWeight: '900', fontSize: '1.8rem' }}>
                            현장 인증
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}