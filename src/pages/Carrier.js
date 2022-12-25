import React, { useContext, useEffect, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import { Area50 } from '../components/ui/area/Area50'
import PageBanner from './banner/PageBanner'
import PageContainer from '../components/ui/page/PageContainer'
import { BookMark } from '../components/ui/button/BookMark'
import OrderList from '../components/order/OrderList'
import UserInfoForm from '../components/account/UserInfoForm'
import TransportComponent from '../components/transport/TransportComponent'
import { ComponentFunctionContext, OrderContext, PartnerContext, RatingContext, UserInfoContext, FilterAndSortContext, NotificationContext, SubscriptionContext, StateContext, AdressContext, LimitContext, SettingContext, TranslateContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import { useFetching } from '../hooks/useFetching'
import { fetchUserInfos } from '../http/userInfoApi'
import { fetchGroups, fetchPartners } from '../http/partnerApi'
import Partners from '../components/partner/Partners'
import { fetchOtherRatings } from '../http/ratingApi'
import FlexContainer from '../components/ui/page/FlexContainer'
import { fetchNotifications, updateNotifications } from '../http/notificationApi'
import { v4 } from "uuid";
import Modal from '../components/ui/modal/Modal'
import ServerNotificationList from '../components/notification/ServerNotificationList'
import NotificationIcon from '../components/notification/NotificationIcon'
import { fetchSubscription } from '../http/subscriptionApi'
import { fetchUserState } from '../http/stateApi'
import SettingsComponent from '../components/setting/SettingsComponent'
import { fetchUserLimits } from '../http/limitApi'
import { VerticalContainer } from '../components/ui/page/VerticalContainer'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'


const Container = styled.div`
display:flex;
`
const Carrier = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { UserInfo } = useContext(UserInfoContext)
  const [fetchPartnersStart, setFetchPartnersStart] = useState(false)
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Notification } = useContext(NotificationContext)
  const [modalActive, setModalActive] = useState(false)
  const { Subscription } = useContext(SubscriptionContext)
  const { State } = useContext(StateContext)
  const { Adress } = useContext(AdressContext)
  const { Limit } = useContext(LimitContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)

  const [fetching, error] = useFetching(async () => { 
    if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
      if ((ComponentFunction.PageFunction === 'customers' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
        await fetchPartners(UserInfo.userInfo.id, undefined).then(async data => {
          fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))
          Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.userInfoId))
          await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => {
            Partner.setPartnerInfos(data)
          })
          Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
          Partner.setMyFavorite(data.filter(el => el.status === 'priority').map(el => el.partnerUserInfoId))
          Partner.setPartners(data);
          await fetchPartners(undefined, UserInfo.userInfo.id).then(async data => {
            Partner.setIAmBlocked(data.filter(el => el.status === 'blocked').map(el => el.userInfoId))
            Partner.setIAmFavorite(data.filter(el => el.status === 'favorite').map(el => el.userInfoId))
          })
          await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
        })
      }
    }
    if (Object.keys(UserInfo.userInfo).length > 0) {
      await fetchNotifications(UserInfo.userInfo.id).then(async data => {
        Notification.setServerNotifications(data.filter(el => el.viewed === true))
        Notification.setNewServerNotifications(data.filter(el => el.viewed === false))
      })
      await fetchUserLimits(UserInfo.userInfo.id).then(data => Limit.setUserLimits(data))
      await fetchSubscription(UserInfo.userInfo.id).then(data => Subscription.setSubscription(data))
      await fetchUserState(UserInfo.userInfo.id).then(data => State.setUserState(JSON.parse(data.state)))
    }
    setFetchPartnersStart(false)
  })

  useEffect(() => {
    fetching()
  }, [])

  useEffect(() => {
    fetching()
  }, [fetchPartnersStart, ComponentFunction.Function, ComponentFunction.PageFunction])

  setInterval(() => {
    fetching()
  }, 60000 * 15)

  useEffect(() => {
    Notification.new_server_notifications.forEach(async element => {
      Notification.addNotification([{ id: v4(), type: element.type, message: element.message }])
    });
    let ids = Notification.new_server_notifications.map(el => el.id)
    updateNotifications(ids, true)
  }, [Notification.new_server_notifications])

  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    // id: "__googleMapsScriptId",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: 'RU',
    language: 'ru'
  })

  if (!isLoaded) { return <PageContainer /> }
  else {

    return (
      <PageContainer>
        <title>{SetNativeTranslate(Translate.language,{},'carriers_office')}</title>

        <NotificationIcon
          modalActive={modalActive}
          setModalActive={setModalActive} />
        <Modal
          parent={'serverNotifications'}
          modalActive={modalActive}
          setModalActive={setModalActive}
        >
          <ServerNotificationList setModalActive={setModalActive} setFetchPartnersStart={setFetchPartnersStart} />
        </Modal>

        <PageBanner>{SetNativeTranslate(Translate.language,{},'carriers_office')}</PageBanner>

        <Container>
          {Object.keys(UserInfo.userInfo).length === 0 ?
            <VerticalContainer
              style={{
                gap: '0px'
              }}
            >
              <BookMark>{SetNativeTranslate(Translate.language,{},'fill_account')}</BookMark>
              <UserInfoForm />
            </VerticalContainer>

            :


            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
              <div className='scroll_content_container'>
                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('orderList'); ComponentFunction.setFunction('inWork');
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  order.setOrders([])
                  order.setOrder({})

                }} style={{
                  color: ComponentFunction.PageFunction === 'orderList' && 'grey',
                }}>{SetNativeTranslate(Translate.language,{},'orders')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('transport')
                }} style={{
                  color: ComponentFunction.PageFunction === 'transport' && 'grey',
                }}>{SetNativeTranslate(Translate.language,{},'transports')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('customers')
                  ComponentFunction.setFunction('partners')
                  ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'customers' && 'grey',
                }}>{SetNativeTranslate(Translate.language,{},'customers')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('account'); ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'account' && 'grey',
                }}>{SetNativeTranslate(Translate.language,{},'account')}</BookMark>

                {/* <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('settings'); ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'settings' && 'lightgrey',
                }}>{SetNativeTranslate(Translate.language,{},'settings')}</BookMark> */}
              </div>
            </div>


          }

        </Container>

        {
          ComponentFunction.PageFunction === 'orderList' ? <OrderList setFetchPartnersStart={setFetchPartnersStart} /> :
            ComponentFunction.PageFunction === 'account' ? <Account setFetchPartnersStart={setFetchPartnersStart} /> :
              ComponentFunction.PageFunction === 'transport' ? <TransportComponent /> :
                ComponentFunction.PageFunction === 'customers' ? <Partners setFetchPartnersStart={setFetchPartnersStart} /> :
                  ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                    <></>
        }

        <Area50></Area50>

      </PageContainer>
    )
  }
})

export default Carrier