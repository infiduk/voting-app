import React, { Component } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';

import Navbar from './Navbar';

export default class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteId: this.props.match.params.voteId,
            vote: [],
            candidate: [],
            bgColor: [
                {
                    position: '',
                    active: null,
                }
            ],
        }
    }

    // _insertContact(name, phone){
    //     let newState = update(this.state, {
    //         contactData: {
    //             $push: [{"name": name, "phone": phone}]
    //         }
    //     });
    //     this.setState(newState);
    // }

    toggle = (position) => {
        //     let poState = update(this.state, {
        //         bgColor: {
        //             $push: [{"position": position}]
        //         }
        //     });
        //     this.setState(poState);

        //     if (this.state.bgColor.position === position) {
        //         this.setState({
        //             bgColor: update(
        //                 this.state.bgColor, {
        //                     [position]: {
        //                         active: { $set: position }
        //                     }
        //                 }
        //             )
        //         });
        //     } else {
        //         this.setState({
        //             bgColor: update(
        //                 this.state.bgColor, {
        //                     [position]: {
        //                         active: { $set: null }
        //                     }
        //                 }
        //             )
        //         });
        //     }
    }

    // myColor = (position) => {
    //     if (this.state.bgColor.active === position) {
    //         return '#f0f0f0';
    //     }
    //     return '#fff';
    // }

    async componentDidMount() {
        try {
            await this.callApi();
        } catch (err) {
            console.log(err);
        }
    }

    callApi = async () => {
        try {
            await fetch('/vote', {
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
                    console.log(json.msg);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>선거 제목 불러와서 넣기</h3>
                    {/* 자동으로 따라다니는 애로 넣기 */}
                    <h4 style={{ margin: 10 }}>투표 인원 : 몇명 / 몇명</h4>
                    <Form inline style={{ marginBottom: 10 }}>
                        <FormControl type='text' placeholder='검색할 후보자의 이름을 입력하세요.' className='mr-sm-2' style={{ width: '70%' }} />
                        <Button variant='primary'>검색</Button>
                    </Form>
                    <div className='card' style={{ padding: '5px', backgroundColor: '#fafafa' }}>
                        <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={() => this.toggle(0)}>
                            <Card.Body>
                                <Card.Title>김수한</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={() => this.toggle(1)}>
                            <Card.Body>
                                <Card.Title>무거북</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={() => this.toggle(2)}>
                            <Card.Body>
                                <Card.Title>이와두</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className='card' style={{ height: '4rem', margin: 3, backgroundColor: '#fff' }} onClick={() => this.toggle(3)}>
                            <Card.Body>
                                <Card.Title>루미삼천감ㅂ</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <Form>
                        <Button variant='primary' size='lg' style={{ marginTop: 25 }} block>확인</Button>
                    </Form>
                </div>
            </div>
        )
    }
}