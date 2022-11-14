import React, { useState } from 'react'
import {
    Grid,
    Button,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { LoadingDialog, SimpleCard } from 'app/components'
import { Alert, Autocomplete } from '@material-ui/lab'
import { documentTypes } from 'app/AppConst'
import useAuth from 'app/hooks/useAuth'

import axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/views/utilities/ApiRoutes'

const SaveDocument = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [formKey, setFormKey] = useState(false)
    const [serverVerifyDialog, setServerVerifyDialog] = useState(false)

    //data
    const [documentInfo, setDocumentInfo] = useState({})
    const [attachmentData, setAttachmentData] = useState([])

    // snackbar
    const [openSnackbar, handleSnackbar] = useState(false)
    const [snackbarSeverity, handleSnackbarSeverity] = useState('')
    const [snackbarMessage, handleSnackbarMessage] = useState('')

    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        // console.log(e)
        let temp = { ...documentInfo }
        temp[name] = value
        setDocumentInfo(temp)
        // console.log(documentInfo)
    }

    const verifyServerBeforeUpload = async () => {
        setLoading(true)
        const accessToken = window.localStorage.getItem('accessToken')
        var messageRes = null
        var variantRes = null
        await axios
            .get(BACKEND_API_ENDPOINT + 'users/token/' + accessToken)
            .then((res) => {
                if (res.status == 200 && res.data.success) {
                    variantRes = 'success'
                    messageRes = 'Verification Success!'
                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage(messageRes)
                    handleFormSubmit()
                    setServerVerifyDialog(false)
                } else {
                    variantRes = 'error'
                    handleSnackbar(true)
                    handleSnackbarSeverity(variantRes)
                    handleSnackbarMessage('Error Verifying!')
                    setLoading(false)
                    setServerVerifyDialog(false)
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
                setServerVerifyDialog(false)
            })
    }

    const handleFormSubmit = async () => {
        if (attachmentData.length > 0) {
            var messageRes = null
            var variantRes = null
            var form_data = documentInfo

            var data = new FormData()
            data.append('attachment', attachmentData[0])
            data.append('uploadedBy', user._id)
            data.append('name', form_data.documentName)
            data.append('type', form_data.documentType)

            //token
            const accessToken = window.localStorage.getItem('accessToken')
            var config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'content-type': 'multipart/form-data',
                },
            }

            await axios
                .post(BACKEND_API_ENDPOINT + 'documents', data, config)
                .then((res) => {
                    if (res.status == 201) {
                        // console.log(res)
                        messageRes = 'File Upload Success'
                        variantRes = 'success'

                        handleSnackbar(true)
                        handleSnackbarSeverity(variantRes)
                        handleSnackbarMessage(messageRes)
                        setDocumentInfo({})
                        setAttachmentData([])
                        setFormKey(!formKey)
                        setLoading(false)
                    } else {
                        variantRes = 'error'
                        handleSnackbar(true)
                        handleSnackbarSeverity(variantRes)
                        handleSnackbarMessage('Error Uploading File!')
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
        } else {
            handleSnackbar(true)
            handleSnackbarSeverity('error')
            handleSnackbarMessage('Error: Please Upload and Document!')
            setLoading(false)
        }
    }

    const handleFileUpload = (event) => {
        event.persist()

        var files = []

        if (event.target.files[0] !== undefined) {
            if (event.target.files.length < 2) {
                for (let j = 0; j < event.target.files.length; j++) {
                    let file = event.target.files[j]

                    if (file.size > 10000000) {
                        handleSnackbar(true)
                        handleSnackbarSeverity('error')
                        handleSnackbarMessage(
                            'For each file size must be less than 10MB.'
                        )
                        break
                    } else {
                        files.push(file)
                    }
                }
            } else {
                handleSnackbar(true)
                handleSnackbarSeverity('error')
                handleSnackbarMessage("Error: Can't Upload More Than 1 File.")
            }
        }

        setAttachmentData(files)
    }

    return (
        <div>
            <SimpleCard title="Add New Document">
                {/* loader */}
                {loading && <LoadingDialog />}

                {/* Form */}
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-280"
                                src="/assets/images/illustrations/adding_variant.svg"
                                alt="addVariant"
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm
                                onSubmit={() => setServerVerifyDialog(true)}
                                key={formKey}
                            >
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Document Name"
                                    helperText="Document Name"
                                    onChange={handleChange}
                                    value={documentInfo.documentName}
                                    type="text"
                                    name="documentName"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <Autocomplete
                                    className="mb-6 w-full"
                                    label="Document Types"
                                    options={documentTypes}
                                    getOptionLabel={(opt) => opt}
                                    size="small"
                                    name="documentType"
                                    onChange={(e, v) =>
                                        handleChange({
                                            target: {
                                                name: 'documentType',
                                                value: v,
                                            },
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="Document Types"
                                            helperText="Select Document Types"
                                            value={documentInfo.documentType}
                                            validators={['required']}
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    )}
                                />

                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    helperText="Please upload document"
                                    onChange={handleFileUpload}
                                    value={documentInfo.documentFile}
                                    type="file"
                                    name="documentFile"
                                />

                                <div>
                                    <div className="text-right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Confirm Upload
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

            <Dialog open={serverVerifyDialog}>
                <DialogTitle>Verify Server Before Upload</DialogTitle>
                <DialogContent>
                    Please click this button to verify your identity with the
                    server identity.
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={verifyServerBeforeUpload}
                        color="primary"
                        autoFocus
                    >
                        Verify Server
                    </Button>
                    <Button
                        onClick={() => {
                            setServerVerifyDialog(false)
                        }}
                        color="primary"
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SaveDocument
