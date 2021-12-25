import React from 'react'

import Card from '../card/Card'

import { Link } from 'react-router-dom'

import './BtnListItem.css'

const BtnListItem = (props) => {
    return (
        <Link to={props.path} className="item">
            <h1 className="t-a-center">{props.title}</h1>
            <Card image={props.image} type={props.type}/>

        </Link>
    )
}

export default BtnListItem
