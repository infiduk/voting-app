import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import List from 'react-list-select';
import update from 'react-addons-update';
import values from 'lodash/values'

import Navbar from './Navbar';

export default class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [],
            candidate: [],
            ingLimit: 0,

            canList: [],
            canArray: [],
            status: false,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    // handleCheck(e) {
    //     alert(e.currentTarget.dataset.id);
    // }

    componentDidMount() {
        this._isMounted = true;
        try {
            this.callApi();
        } catch (err) {
            console.log(err);
        }
    }

    callApi = () => {
        try {
            fetch('/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'vote_id': this.state.voteId
                })
            })
            .then(result => result.json())
            .then(json => {
                this.setState({ vote: json.voteData, candidate: json.candidateData });
                this.state.candidate.map((c) => {
                    this.setState({
                        canList: update(this.state.canList, { $push: [c.name + c.name_ex] })
                    })
                });
            })
            .catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleVoteSubmit = async e => {
        e.preventDefault();
        try {
            await fetch('/vote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'vote_id': this.state.canArray,
                    'candidates': this.state.candidate
                })
            })
            .then(result => result.json())
            .then(json => {
                console.log(json.data);
            })
            .catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleChecked = async (selected) => {
        let indexId;
        if(selected.length > 1) {
            indexId = selected[selected.length - 1];
        } else {
            indexId = selected[0];
        }
        try {
            this.state.canArray.map((elem, index) => {
                if (elem === indexId) {
                    this.state.ingLimit -= 1;
                    this.state.status = true;
                    this.setState({
                        canArray: update(this.state.canArray, { $splice: [[index, 1]] })
                    })
                }
            });
            if(!this.state.status) {
                if (this.state.ingLimit < this.state.vote.limit) {
                    this.state.ingLimit += 1;
                    this.setState({
                        canArray: update(this.state.canArray, { $push: [indexId] }),
                     })
                } else {
                    console.log('full');
                }
            }
            this.state.status = false;
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>{this.state.vote.title}</h3>
                    <h4 style={{ margin: 10 }}>선택한 후보자 : {this.state.ingLimit}명 / {this.state.vote.limit}명</h4>
                    <div className='card' style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        <List
                        items={this.state.canList}
                        multiple={true}
                        onChange={(selected: number) => { this.handleChecked(selected)}}
                    />
                    </div>
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} block onClick={this.handleVoteSubmit}>확인</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

