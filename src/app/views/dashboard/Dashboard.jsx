import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { SimpleCard } from 'app/components'

const Analytics = () => {
    const theme = useTheme()

    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                <SimpleCard>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h4">
                                Welcome to ABC Company
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h6">
                                ABC Messaging Service - ABC Messenger
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="p">
                                Simple. Secure. Reliable messaging. With ABC
                                Messenger, you'll get fast, simple, secure
                                messaging and calling for free*, available on
                                phones all over the world.
                            </Typography>
                            <Typography variant="p">
                                Some of your most personal moments are shared on
                                ABC Messenger, which is why we built end-to-end
                                encryption into the latest versions of our app.
                                When end-to-end encrypted, your messages and
                                calls are secured so only you and the person
                                you're communicating with can read or listen to
                                them, and nobody in between, not even ABC
                                Messenger.
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h6">
                                ABC File Sharing Service - ABC Messenger
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="p">
                                Send PDFs, documents, spreadsheets, slideshows
                                and more, without the hassle of email or file
                                sharing apps. You can send documents up to 100
                                MB, so it's easy to get what you need over to
                                who you want.
                            </Typography>
                        </Grid>
                    </Grid>
                </SimpleCard>
            </div>
        </Fragment>
    )
}

export default Analytics
