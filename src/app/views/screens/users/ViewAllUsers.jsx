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

const ViewAllUsers = () => {
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')

    //data setup
    const [allUsers, setAllUsers] = useState([])

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
            .get(BACKEND_API_ENDPOINT + 'users', config)
            .then((res) => {
                // console.log(res)
                if (res.data && res.data.length > 0) {
                    setAllUsers(res.data)
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

    const handleChange = (e) => {
        var value = e.target.value
        setSearchValue(value)
        // console.log(searchValue)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <SimpleCard title="All Users">
                {/* filter */}
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="p-5 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={() => {}}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <TextValidator
                                            className="w-full"
                                            variant="outlined"
                                            size="small"
                                            label="Search User Name"
                                            helperText="Search User Name"
                                            onChange={handleChange}
                                            value={searchValue}
                                            type="text"
                                            name="search"
                                            validators={['required']}
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>

                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    // cards
                    <Grid container>
                        {allUsers
                            .filter((val) => {
                                if (searchValue == '') {
                                    return val
                                } else if (
                                    val.name
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase())
                                ) {
                                    return val
                                }
                            })
                            .map((user, key) => (
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    key={key}
                                >
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
                                                    <b>{user.name}</b>
                                                </Typography>
                                                <Typography>
                                                    <b>Username : </b>
                                                    {user.username}
                                                </Typography>
                                                <Typography>
                                                    <b>User Email : </b>
                                                    {user.email}
                                                </Typography>
                                                <Typography>
                                                    <b>User Role : </b>
                                                    {user.type}
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

export default ViewAllUsers
