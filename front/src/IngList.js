import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import Navbar from './Navbar';

export default class IngList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            voteList: [], // 선거 목록 저장
        }
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ voteList: res.data }))
            .catch(err => console.log(err));
    }

    // status가 1(진행 중)인 선거 목록 가져오기
    callApi = async () => {
        const response = await fetch('/list/1');
        if (response.status !== 200) throw Error(response.json().msg);
        return response.json();
    };

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>진행중인 선거 목록</h3>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>
                        <ListGroup variant='flush'>
                            <hr />
                            {this.state.voteList.map(voteList => {
                                return <ListGroup.Item action href={'/authVote/' + `${voteList.id}`} key={`vostList-${voteList.id}`}>
                                <div className='row'>
                                    <img
                                        alt=''
                                        src={require('./images/jeongeui_logo_icon.png')}
                                        width='30'
                                        height='30'
                                        style={{ marginRight: 10 }}
                                    />
                                    <h4>{voteList.title}</h4>
                                </div>
                                <h5 style={{ textAlign: 'right' }}>{voteList.begin_date} ~ {voteList.end_date}</h5>
                            </ListGroup.Item>
                            })}
                            <hr />
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
}