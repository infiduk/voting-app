import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Navbar from './Navbar';

export default class IngList extends Component {      
      render() {
          return (
            <div>
                <Navbar />
                <div style={{margin: 25}}>
                    <h3>진행중인 선거 목록</h3>
                    <div style={{marginLeft: 10, marginRight: 10}}>
                        <ListGroup variant='flush'>
                            <hr />
                            <ListGroup.Item action href='/'>
                                <img
                                    src={require('./images/jeongeui_logo_icon.png')}
                                    width='30'
                                    height='30'
                                />
                                <h4>제 2회 교회 총 선거선거선거선</h4>
                                <h5 style={{textAlign: 'right'}}>2019.09.16 ~ 2019.09.30</h5>
                            </ListGroup.Item>
                            <ListGroup.Item action href='#link2'>
                                <img
                                    src={require('./images/jeongeui_logo_icon.png')}
                                    width='30'
                                    height='30'
                                />
                                <h4>제 2회 교회 총 선거선거선거선</h4>
                                <h5 style={{textAlign: 'right'}}>2019.09.16 ~ 2019.09.30</h5>
                            </ListGroup.Item>
                            <ListGroup.Item action href='#link3'>
                                <img
                                    src={require('./images/jeongeui_logo_icon.png')}
                                    width='30'
                                    height='30'
                                />
                                <h4>제 2회 교회 총 선거선거선거선</h4>
                                <h5 style={{textAlign: 'right'}}>2019.09.16 ~ 2019.09.30</h5>
                            </ListGroup.Item>
                            <hr />
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
}