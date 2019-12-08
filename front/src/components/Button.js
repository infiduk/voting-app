import React from 'react'

import { Button } from 'react-bootstrap'

const BlockButtonStyle = {
    marginTop: 30,
    padding: 10,
    alignSelf: 'center'
}

const SqureButtonStyle = {
    width: '40vw',
    height: '50vw',
    fontWeight: '900',
    fontSize: '1.8rem',
    display: 'table-cell'
}

const BoldButtonStyle = {
    width: '83vw',
    height: '15vw',
    fontWeight: '900',
    fontSize: '1.8rem',
    display: 'table-cell'
}

export const BlockButton = props => {
    return (
        <Button variant='primary' type={props.type} style={BlockButtonStyle} onClick={props.click} block>
            {props.label}
        </Button>
    )
}

export const SqureButton = props => {
    return (
        <Button variant={props.variant} size='lg' href={props.href} style={SqureButtonStyle}>
            {props.label}
        </Button>
    )
}

export const BoldButton = props => {
    return (
        <Button variant={props.variant} size='lg' href={props.href} onClick={props.click} style={BoldButtonStyle}>
            {props.label}
        </Button>
    )
}
