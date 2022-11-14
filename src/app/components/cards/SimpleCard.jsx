import React from 'react'
import { Card, Divider, Typography } from '@material-ui/core'

const SimpleCard = ({ children, title, icon }) => {
    return (
        <Card elevation={6} className="p-5 m-5 h-full">
            <Typography variant="h4" component="h2">
                {title}
            </Typography>
            <Divider className="mb-5" />
            {children}
        </Card>
    )
}

export default SimpleCard
