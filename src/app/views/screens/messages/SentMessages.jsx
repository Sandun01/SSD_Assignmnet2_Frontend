import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Card,
    Grid,
    Snackbar,
    CardContent,
    Typography,
} from '@material-ui/core'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert } from '@material-ui/lab'
import { SimpleCard } from 'app/components'
import { CircularProgress } from '@material-ui/core'
import { BACKEND_API_ENDPOINT } from 'app/views/utilities/ApiRoutes'
import useAuth from 'app/hooks/useAuth'

const SentMessages = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    //data setup
    const [allMessages, setAllMessages] = useState([])

    // snackbar
    const [openSnackbar, handleSnackbar] = useState(false)
    const [snackbarSeverity, handleSnackbarSeverity] = useState('')
    const [snackbarMessage, handleSnackbarMessage] = useState('')

    const loadData = async () => {
        //token
        const accessToken = window.localStorage.getItem('accessToken')
        var config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
        }

        await axios
            .get(BACKEND_API_ENDPOINT + 'messages/sent/' + user._id, config)
            .then((res) => {
                // console.log(res)
                if (res.data && res.data.length > 0) {
                    setAllMessages(res.data)
                    setLoading(false)
                } else {
                    handleSnackbar(true)
                    handleSnackbarSeverity('error')
                    handleSnackbarMessage('Error! Please try again later.')
                }
            })
            .catch((error) => {
                console.log(error)
                handleSnackbar(true)
                handleSnackbarSeverity('error')
                handleSnackbarMessage('Error! Please try again later.')
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <SimpleCard title="All Sent Messages">
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    // cards
                    <Grid container>
                        {allMessages.map((msg, key) => (
                            <Grid item lg={4} md={4} sm={6} xs={12} key={key}>
                                <Card
                                    elevation={5}
                                    className="p-3 m-3 hover-bg-secondary"
                                >
                                    <div>
                                        <CardContent>
                                            <Typography
                                                variant="h5"
                                                className="mb-2"
                                            >
                                                <b>Message</b>
                                            </Typography>
                                            <Typography className="mt-3">
                                                <b>To : </b>
                                                {msg.receiver.name}
                                            </Typography>
                                            <Typography className="mt-2">
                                                <b>Message : </b>
                                            </Typography>
                                            <Typography className="mr-2 ml-2">
                                                {msg.message}
                                            </Typography>
                                            <Typography className="mt-10 text-right">
                                                {msg.createdAt.split('T', 1)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </SimpleCard>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={() => handleSnackbar(false)}
            >
                <Alert
                    onClose={() => handleSnackbar(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SentMessages
