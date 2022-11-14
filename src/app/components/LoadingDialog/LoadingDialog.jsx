import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import React from 'react'

function LoadingDialog() {
    return (
        <div>
            <Dialog open={true}>
                <DialogTitle>Loading...</DialogTitle>
                <DialogContent style={{ padding: '10px', textAlign: 'center' }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LoadingDialog
