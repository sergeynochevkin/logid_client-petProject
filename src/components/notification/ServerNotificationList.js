import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import ServerNotificationItem from './ServerNotificationItem'
import { CardButton } from '../ui/button/CardButton'
import './Notification.css'
import { FetcherContext, NotificationContext, TranslateContext } from '../..'
import { deleteNotifications } from '../../http/notificationApi'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const ServerNotificationList = observer(({ setModalActive, }) => {
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)

    const deleteNotificationsAction = () => {
        deleteNotifications(Notification.server_notifications.map(el => el.id))
        fetcher.setServerNotifications(true)
        setModalActive(false)
    }

    const sortNotifications = (a, b) => {
        if (a.createdAt > b.createdAt) {
            return -1
        } else {
            return 1
        }
    }

    return (

        <div>
            <div className={'list_buttons_container'}>
                <CardButton
                    onClick={() => {
                        setModalActive(false)
                    }}
                >{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
                <CardButton
                    onClick={deleteNotificationsAction}
                >{SetNativeTranslate(Translate.language, {}, 'clear')}</CardButton>
            </div>
            <div className={'list_container'}>
                {Notification.server_notifications.slice().sort(sortNotifications).map(notification =>
                    <ServerNotificationItem
                        setModalActive={setModalActive}
                        key={notification.id}
                        notification={notification}
                    />)}
            </div>
        </div>

    )
})

export default ServerNotificationList
