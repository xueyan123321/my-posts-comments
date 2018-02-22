import React from 'react'
import './noMatch.css'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

const NoMatch = () => (
    <div className="not-found">
        <strong>
            not found 404
        </strong>
        <div className="back-to-main">
            <Link to={'/'}>
                <Button type="primary">
                    <Icon type="left" />
                    back to post list
                </Button>
            </Link>
        </div>
    </div>
)

export default NoMatch