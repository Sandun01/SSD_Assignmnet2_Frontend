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

import { makeStyles } from '@material-ui/core/styles'
import { SimpleCard } from 'app/components'

import { Fragment } from 'react'

import history from 'history.js'

const LearningMaterials = () => {
    return (
        <Fragment>
            <SimpleCard title="Learning Materials">
                <Grid container>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Card
                            className="px-4 m-3 pb-3 hover-bg-primary w-250"
                            elevation={6}
                        >
                            <CardContent>
                                <div className="p-4 flex justify-center items-center h-full">
                                    <img
                                        width={180}
                                        height={150}
                                        src="/assets/images/banking_img.jpg"
                                    />
                                </div>
                            </CardContent>
                            <Typography
                                className="text-center"
                                variant="h6"
                                component="p"
                            >
                                Learning Premiere League
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Card
                            className="px-4 m-3 pb-3 hover-bg-green w-250"
                            elevation={6}
                        >
                            <CardContent>
                                <div className="p-4 flex justify-center items-center h-full">
                                    <img
                                        width={160}
                                        height={150}
                                        src="/assets/images/two_man_img.jpg"
                                    />
                                </div>
                            </CardContent>
                            <Typography
                                className="text-center"
                                variant="h6"
                                component="p"
                            >
                                Spark
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Card
                            className="px-4 m-3 pb-3 hover-bg-secondary w-250"
                            elevation={6}
                        >
                            <CardContent>
                                <div className="p-4 flex justify-center items-center h-full">
                                    <img
                                        width={200}
                                        height={150}
                                        src="/assets/images/quiz_img.jpg"
                                    />
                                </div>
                            </CardContent>
                            <Typography
                                className="text-center"
                                variant="h6"
                                component="p"
                            >
                                Talent Space
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </SimpleCard>
        </Fragment>
    )
}

export default LearningMaterials
