import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { SettingContext, TranslateContext, UserInfoContext } from '../..'
import { useFetching } from '../../hooks/useFetching'
import { fetchSettings } from '../../http/settingApi'
import SettingItem from './SettingItem'
import './Setting.css'
import { Button } from '../ui/button/Button'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const Container = styled.div`
display:flex;
flex-direction:column;
gap:5px;
align-items:left;
`

const SettingsComponent = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Translate } = useContext(TranslateContext)
    const [fetchStart, setFetchStart] = useState(false)

    const sortSetings = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }

    const [fetching, error] = useFetching(async () => {
        await fetchSettings(UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
        setFetchStart(false)
    })

    useEffect(() => {
        fetching()
    }, [])

    return (
        <>
            <div className={Setting.app_theme === 'light' ? 'setting_container' : 'setting_container setting_container_dark'}>
                <div className='settings_list'>
                    {Setting.user_settings.slice().sort(sortSetings).map(setting =>
                        <SettingItem id={setting.id} key={setting.id} name={setting.name} value={setting.value} />)}
                </div>
                {/* <div className='account_actions_container'>
                    <Button>{SetNativeTranslate(Translate.language, {
                        russian: ['Удалить аккаунт'],
                        english: ['Delete account']
                    }, '')}</Button>
                </div> */}

            </div>

        </>
    )
})

export default SettingsComponent