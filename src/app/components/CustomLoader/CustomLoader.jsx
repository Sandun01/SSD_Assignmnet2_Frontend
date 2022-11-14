import { CircularProgress } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

const CustomLoader = () => {
    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen'
            )}
        >
            <CircularProgress />
        </div>
    )
}

export default CustomLoader
