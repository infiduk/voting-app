import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import Navbar from './Navbar';

export default class UserList extends Component {

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ voteList: res.data }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/admin/auth');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>회원 목록</h3>
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
        )
    }
}