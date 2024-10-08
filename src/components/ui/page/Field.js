import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Page.css'

const Field = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div {...props} className={Setting.app_theme === 'light' ? 'field' : 'field field_dark'}>{children}</div>
    )
}
)
export { Field }