import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from './Navbar';

export default class FinList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteList: [],
        }
    }

    componentDidMount() {
        this.sessionApi()
            .then(res => {
                if (!res.result) {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                        return (
                            <div className='custom-confirm-ui'>
                            <div className='text-center'>
                                <p style={{ marginBottom: 20 }}>관리자만 접근 가능합니다.
                                </p>
                            </div>
                            <button className="btn btn-cn btn-secondary" autoFocus onClick={() => {
                                onClose();
                                window.location.assign('/');
                            }}> 확인 </button>
                            </div>
                        )},
                        closeOnClickOutside: false
                    })
                }
            })
            .catch(err => console.log(err));
        this.callApi()
            .then(res => this.setState({ voteList: res.data }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/list/2');
        if (response.status !== 200) throw Error(response.msg);
        return response.json();
    };

    sessionApi = async () => {
        const response = await fetch('/session');
        if (response.status !== 200) throw Error(response.msg);
        return response.json();
    }

    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: 25 }}>
                    <h3>완료된 선거 목록</h3>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>
                        <ListGroup variant='flush'>
                            <hr />
                            {this.state.voteList.map(voteList => {
                                return <ListGroup.Item action href={`/voteResult/${voteList.id}`} key={`vostList-${voteList.id}`}>
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