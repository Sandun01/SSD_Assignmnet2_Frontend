import React, { useState } from 'react'
import { Grid, Button, Snackbar } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { LoadingDialog, SimpleCard } from 'app/components'
import { Alert, Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/views/utilities/ApiRoutes'
import { useEffect } from 'react'
import useAuth from 'app/hooks/useAuth'

const NewMessage = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [formKey, setFormKey] = useState(false)

    //data
    const [messageInfo, setMessageInfo] = useState({})
    const [allUsers, setAllUsers] = useState([])

    // snackbar
    const [openSnackbar, handleSnackbar] = useState(false)
    const [snackbarSeverity, handleSnackbarSeverity] = useState('')
    const [snackbarMessage, handleSnackbarMessage] = useState('')

    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        // console.log(e)
        let temp = { ...messageInfo }
        temp[name] = value
        setMessageInfo(temp)
        // console.log(messageInfo)
    }

    const handleFormSubmit = async () => {
        var messageRes = null
        var variantRes = null

        //form data
        var form_data = messageInfo
        var receiverData = messageInfo.receiver
        form_data.receiver = receiverData._id
        form_data.sender = user._id

        //token
        const accessToken = window.localStorage.getItem('accessToken')
        var config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
        }
        // console.log(form_data)
        await axios
            .post(BACKEND_API_ENDPOINT + 'messages', form_data, config)
            .then((res) => {
                if (res.status == 201) {
                    // console.log(res)
                    messageRes = 'Message Saved Successfully!'
                    variantRes = 'success'

                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage(messageRes)
                    setMessageInfo({})
                    setFormKey(!formKey)
                    setLoading(false)
                } else {
                    variantRes = 'error'
                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage('Error!')
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

    //get all users
    const getAllUsers = async () => {
        var messageRes = null
        var variantRes = null
        const accessToken = window.localStorage.getItem('accessToken')
        var config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
        }

        await axios
            .get(BACKEND_API_ENDPOINT + 'users/all', config)
            .then((res) => {
                if (res.status == 200) {
                    setAllUsers(res.data)
                    setLoading(false)
                } else {
                    variantRes = 'error'
                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage('Error!')
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
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div>
            <SimpleCard title="Send New Message">
                {/* loader */}
                {loading && <LoadingDialog />}

                {/* Form */}
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-full"
                                src="/assets/images/sendMessage.png"
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
                                <Autocomplete
                                    className="mb-3 w-full"
                                    label="Receiver"
                                    options={allUsers}
                                    getOptionLabel={(opt) => opt.name}
                                    size="small"
                                    name="type"
                                    onChange={(e, v) =>
                                        handleChange({
                                            target: {
                                                name: 'receiver',
                                                value: v,
                                            },
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="Receiver"
                                            helperText="Select Receiver"
                                            value={messageInfo.receiver}
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
                                    label="Message"
                                    helperText="Message"
                                    onChange={handleChange}
                                    value={messageInfo.message}
                                    type="text"
                                    name="message"
                                    multiline
                                    rows={8}
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

export default NewMessage
