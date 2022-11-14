import React, { Fragment } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { navigations } from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import useAuth from 'app/hooks/useAuth'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    scrollable: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    sidenavMobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.54)',
        zIndex: -1,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}))

const Sidenav = ({ children }) => {
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()

    const { user } = useAuth()

    let nav = []

    const getFilteredNav = (navList = [], role) => {
        return navList.reduce((array, nav) => {
            // console.log(nav.auth);

            if (nav.auth) {
                //authenticated parent node routes
                if (nav.auth.includes(role)) {
                    //authenticated children node routes
                    if (nav.children) {
                        var arr = nav.children
                        var new_arr = []

                        //auth children
                        arr.forEach((navItem) => {
                            if (navItem.auth.includes(role)) {
                                new_arr.push(navItem)
                                // console.log(navItem);
                            }
                        })

                        //add authorized children to parent
                        nav.children = new_arr
                        array.push(nav)
                    } else {
                        //root node not have children
                        array.push(nav)
                    }
                }
            }

            return array
        }, [])
    }

    const createUserSideBarFilter = () => {
        let filteredNav = getFilteredNav(navigations, user.type)
        nav = filteredNav
        // console.log("--", filteredNav)
    }

    createUserSideBarFilter()

    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }

    return (
        <Fragment>
            <Scrollbar
                options={{ suppressScrollX: true }}
                className={clsx('relative px-4', classes.scrollable)}
            >
                {children}
                <MatxVerticalNav items={nav} />
            </Scrollbar>

            <div
                onClick={() => updateSidebarMode({ mode: 'close' })}
                className={classes.sidenavMobileOverlay}
            />
        </Fragment>
    )
}

export default Sidenav
