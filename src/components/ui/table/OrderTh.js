import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import '../../order/Order.css'

const OrderTh = observer(({children, ...props}) => {
    const {Setting} = useContext(SettingContext)

    return (
        <th className={Setting.app_theme === 'light' ? 'order_th' : 'order_th order_th_dark'} {...props}>{children}</th>
    )
})

export { OrderTh }