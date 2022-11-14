import React, { useState } from 'react'
import { Grid, Button, Snackbar } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { LoadingDialog, SimpleCard } from 'app/components'
import { Alert, Autocomplete } from '@material-ui/lab'

import axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/views/utilities/ApiRoutes'

const AddNewUser = () => {
    const [loading, setLoading] = useState(false)
    const [formKey, setFormKey] = useState(false)

    //data
    const [userInfo, setUserInfo] = useState({})

    // snackbar
    const [openSnackbar, handleSnackbar] = useState(false)
    const [snackbarSeverity, handleSnackbarSeverity] = useState('')
    const [snackbarMessage, handleSnackbarMessage] = useState('')

    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        // console.log(e)
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
        // console.log(userInfo)
    }

    const handleFormSubmit = async () => {
        var messageRes = null
        var variantRes = null
        var form_data = userInfo

        //token
        const accessToken = window.localStorage.getItem('accessToken')
        var config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
        }

        await axios
            .post(BACKEND_API_ENDPOINT + 'users', form_data, config)
            .then((res) => {
                if (res.status == 201) {
                    // console.log(res)
                    messageRes = 'User Creation Success!'
                    variantRes = 'success'

                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage(messageRes)
                    setUserInfo({})
                    setFormKey(!formKey)
                    setLoading(false)
                } else {
                    variantRes = 'error'
                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage('Error User Creation!')
                    setFormKey(!formKey)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log(error)
                messageRes = error.message
                variantRes = 'error'
                handleSnackbar(true)
                handleSnackbarSeverity(variantRes)
                handleSnackbarMessage('Error:' + messageRes)
                setFormKey(!formKey)
                setLoading(false)
            })
    }

    return (
        <div>
            <SimpleCard title="Add New User">
                {/* loader */}
                {loading && <LoadingDialog />}

                {/* Form */}
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-full"
                                src="/assets/images/user_registration.jpg"
                                alt="addVariant"
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm
                                onSubmit={handleFormSubmit}
                                key={formKey}
                            >
                                <TextValidator
                                    className="mb-3 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    helperText="Name"
                                    onChange={handleChange}
                                    value={userInfo.name}
                                    type="text"
                                    name="name"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <TextValidator
                                    className="mb-3 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Username"
                                    helperText="Username"
                                    onChange={handleChange}
                                    value={userInfo.username}
                                    type="text"
                                    name="username"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <Autocomplete
                                    className="mb-3 w-full"
                                    label="User Role"
                                    options={['Manager', 'Worker']}
                                    getOptionLabel={(opt) => opt}
                                    size="small"
                                    name="type"
                                    onChange={(e, v) =>
                                        handleChange({
                                            target: {
                                                name: 'type',
                                                value: v,
                                            },
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="User Role"
                                            helperText="Select User Role"
                                            value={userInfo.type}
                                            validators={['required']}
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    )}
                                />

                                <TextValidator
                                    className="mb-3 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    helperText="Email"
                                    onChange={handleChange}
                                    value={userInfo.email}
                                    type="text"
                                    name="email"
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'This field is required',
                                        'Please enter valid email',
                                    ]}
                                />

                                <TextValidator
                                    className="mb-3 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Password"
                                    helperText="Password"
                                    onChange={handleChange}
                                    value={userInfo.password}
                                    type="password"
                                    name="password"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <div>
                                    <div className="text-right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
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

export default AddNewUser
