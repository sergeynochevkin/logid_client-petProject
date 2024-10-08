import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import '../../order/Order.css'

const OrderTd = observer( ({children, ...props}) => {

const {Setting} = useContext(SettingContext)

  return (
    <td className={Setting.app_theme === 'light' ? 'order_td' : 'order_td order_td_dark'} {...props}>{children}</td>
  )
})

export  {OrderTd}