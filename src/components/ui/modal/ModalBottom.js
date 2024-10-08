import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Modal.css'

const ModalBottom = ({ modalActive,  children }) => {

  const { Setting } = useContext(SettingContext)

  return (
    <div className={modalActive ? `modal_bottom active ${Setting.app_theme === 'light' ? '' : 'dark'}` : `modal_bottom ${Setting.app_theme === 'light' ? '' : 'dark'}`} >{children}</div>
  )
}

export default ModalBottom