import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Card,
    Grid,
    Button,
    Snackbar,
    CardContent,
    Typography,
} from '@material-ui/core'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, Autocomplete } from '@material-ui/lab'
import { SimpleCard } from 'app/components'

import CustomLoader from 'app/components/CustomLoader/CustomLoader'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const ViewDocuments = () => {
    const [loading, setLoading] = useState(true)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    //data setup
    const [allDocuments, setAllDocuments] = useState([])

    // snackbar
    const [openSnackbar, handleSnackbar] = useState(false)
    const [snackbarSeverity, handleSnackbarSeverity] = useState('')
    const [snackbarMessage, handleSnackbarMessage] = useState('')

    const loadData = async () => {
        await axios
            .get('http://localhost:5000/api/documents')
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setAllDocuments(res.data.documents)
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
            <SimpleCard title="All Documents">
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
                                            label="Search Document Name"
                                            helperText="Search Document Name"
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
                    <CustomLoader />
                ) : (
                    // cards
                    <Grid container>
                        {allDocuments
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
                            .map((itm, key) => (
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
                                        className="p-3 m-3 hover-bg-green"
                                    >
                                        <div>
                                            <CardContent>
                                                <Typography
                                                    variant="h5"
                                                    className="mb-2"
                                                >
                                                    <b>Document</b>
                                                </Typography>
                                                <Typography>
                                                    <b>Document Name: </b>
                                                    {itm.name}
                                                </Typography>
                                                <Typography>
                                                    <b>Document Type: </b>
                                                    {itm.type}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="text-right">
                                            <Button
                                                className="m-1 bg-secondary"
                                                variant="contained"
                                                size="small"
                                                style={{ color: 'white' }}
                                                // onClick={() => console.log('View')}
                                                onClick={() => {
                                                    window.open(
                                                        'http://localhost:5000/' +
                                                            itm.url,
                                                        '_blank'
                                                    )
                                                }}
                                            >
                                                Download Document
                                            </Button>
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

export default ViewDocuments
