import React from 'react'
import { ListGroup } from 'react-bootstrap'

export const VoteListItem = props => {
    return (
        <ListGroup.Item action href={props.href}>
            <div className='row'>
                <img
                    alt=''
                    src={require('../images/jeongeui_logo_icon.png')}
                    width='30'
                    height='30'
                    style={{ marginRight: 10 }}
                />
                <h4>{props.title}</h4>
            </div>
            <h5 style={{ textAlign: 'right' }}>{props.begin_date} ~ {props.end_date}</h5>
        </ListGroup.Item>
    )
}