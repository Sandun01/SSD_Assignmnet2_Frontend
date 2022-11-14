import React from 'react'
import useSettings from 'app/hooks/useSettings'

const TMFLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return (
        <img src="/assets/images/topLogo.png" height="40px" width="40px" ></img>
    )
}

export default TMFLogo
