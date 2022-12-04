import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, StateContext, TransportContext, UserInfoContext } from '../../index'
import { fetchOrderConnections, fetchOrders } from '../../http/orderApi'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import OrderItem from './OrderItem'
import { useFetching } from '../../hooks/useFetching'
import { fetchOffers } from '../../http/offerApi'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { fetchPoints } from '../../http/pointApi'
import { fetchOrderRatings } from '../../http/ratingApi'
import { fetchUserInfos } from '../../http/userInfoApi'
import { fetchTransport } from '../../http/transportApi'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import useDebounce from '../../hooks/useDebounce'
import { v4 } from "uuid";
import { CardButton } from '../ui/button/CardButton'
import OrderStatusButtons from './OrderStatusButtons'
import { fetchUserState } from '../../http/stateApi'
import MapComponent from '../map/MapComponent'
import { SetTranslate } from '../../modules/SetTranslate'

const Orders = observer(({ orderItemFunction, setOrderItemFunction, setFetchPartnersStart, fetchStart, setFetchStart }) => {
  const { order } = useContext(OrderContext)
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Transport } = useContext(TransportContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Offer } = useContext(OfferContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Point } = useContext(PointContext)
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const [totalCount, setTotalCount] = useState(0)
  const { Notification } = useContext(NotificationContext)
  const { State } = useContext(StateContext)


  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  const debouncedSearchTerm = useDebounce(FilterAndSort.filters[ComponentFunction.Function], 500);
  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        setFetchStart(true)
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  )

  const [fetching, error] = useFetching(async () => {

    if (Object.keys(UserInfo.userInfo).length !== 0) {
      if (user.user.role === 'carrier') {
        await fetchTransport(UserInfo.userInfo.id).then(data => Transport.setTransports(data))
      }
      await fetchOrders(UserInfo.userInfo.id, user.user.role, UserInfo.userInfo.id, ComponentFunction.Function, UserInfo.userInfo.country, UserInfo.userInfo.city, user.user.role === 'carrier' ? Transport.transports : [], Partner.myBlocked, Partner.iAmBlocked, Partner.myFavorite, '', FilterAndSort.filters).then(async data => {
        setTotalCount(data.count)
        order.setTotalCount(data.total_count.new, 'new')
        order.setTotalCount(data.total_count.canceled, 'canceled')
        order.setTotalCount(data.total_count.completed, 'completed')
        order.setTotalCount(data.total_count.postponed, 'postponed')
        order.setTotalCount(data.total_count.inWork, 'inWork')
        order.setTotalCount(data.total_count.arc, 'arc')
        order.setTotalCount(data.total_count.pattern, 'pattern')
        // отключил код, так как он при смене вкладки с заказами чистил state
        // if (State.user_state.favorite_order_state.length > 0) {
        //   State.setUserStateField(State.user_state.favorite_order_state.filter(el => data.totalCount.ids.includes(el)), 'favorite_order_state', UserInfo.userInfo.id)
        // }
        order.setAdded(data.added)
        if (data.rows.length !== 0) {
          await fetchPoints(data.rows.map(el => el.pointsIntegrationId), UserInfo.userInfo.id).then(data => {
            Point.setPoints(data.rows);
            Point.setAdded(data.added)
            if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
              Point.setThisOrderPoints(data.rows.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
            }
          })
        }
        if ((ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') && data.length !== 0) {
          await fetchOrderRatings(data.rows.map(el => el.id), UserInfo.userInfo.id).then(data => Rating.setOrderRatings(data))
        }
        if ((ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed') && data.length !== 0) {

          await fetchOrderConnections(data.rows.map(el => el.id), 'groups').then(data => order.setOrdersByGroup(data))
          await fetchOrderConnections(data.rows.map(el => el.id), 'partners').then(data => order.setOrdersByPartner(data))

          await fetchOffers(data.rows.filter(el => el.order_type !== 'order').map(el => el.id), UserInfo.userInfo.id).then(async data => {
            Offer.setOffers(data.rows)
            Offer.setChanges(data.changes)
            await fetchUserInfos(Offer.offers.map(el => el.carrierId), FilterAndSort.partnerFilters).then(data => Partner.setNoPartnerInfos(data)
            )
          })

        }
        if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
          order.setOrder(data.rows.find(el => el.id === order.order.id))
        }
        //засетить точки           
        order.setOrders(data.rows)
        order.setMapOrders(data.map_rows)
        setFetchStart(false)
      })
    }
  })

  useEffect(() => {
    if (ComponentFunction.Function === 'inWork') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval)
    }
    else if (ComponentFunction.Function === 'new' && user.user.role === 'carrier') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval);
    } else if (ComponentFunction.Function === 'new' && user.user.role === 'customer') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        fetching()
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [fetchStart, ComponentFunction.Function])

  useEffect(() => {
    fetching()
    // setFetchStart(true)
  }, [ComponentFunction.Function])

  useEffect(() => {
    setFetchStart(true)
  }, [])

  useEffect(() => {
    fetching()
    setFetchStart(false)
    setIsSearching(false)
  }, [fetchStart])



  const scrollHandler = (e) => {
    if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 400 && order.orders.length < totalCount) {
      FilterAndSort.filters[ComponentFunction.Function].limit = FilterAndSort.filters[ComponentFunction.Function].limit + 10
      setFetchStart(true)
    }
  }
  useEffect(() => {
    if (Object.keys(order.added).length > 0) {
      if (order.added.new.length > 0) {
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.new.length > 1 ? SetTranslate('new_orders_received') : SetTranslate('new_order_received')} ${order.added.new.map(el => el.id).toString()}` }])
        }
        // if (user.user.role === 'customer') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.new.length > 1 ? 'Отправлены заказы:' : 'Отправлен заказ'} ${order.added.new.map(el => el.id).toString()}` }])
        // }
      }
      if (order.added.inWork.length > 0) {
        if (user.user.role === 'customer' && order.added.inWork[0].updated_by_role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? SetTranslate('orders_taken') : SetTranslate('order_taken')} ${order.added.inWork.map(el => el.id).toString()}` }])
        }
        if (user.user.role === 'customer' && order.added.inWork[0].updated_by_role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? SetTranslate('offers_accepted') : SetTranslate('offer_accepted')} ${order.added.inWork.map(el => el.id).toString()}` }])
        }
        if (user.user.role === 'carrier' && order.added.inWork[0].updated_by_role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? SetTranslate('offers_accepted_carrier') : SetTranslate('offer_accepted_carrier')} ${order.added.inWork.map(el => el.id).toString()}, ${SetTranslate('start_doing')}` }])
        }
        // if (user.user.role === 'carrier') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? 'Вы взяли в работу заказы:' : 'Вы взяли в работу заказ'} ${order.added.inWork.map(el => el.id).toString()}` }])
        // }
      }
      if (order.added.postponed.filter(el => el.disrupted_by === '').length > 0) {
        // if (user.user.role === 'customer') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? 'Вы отложили заказы:' : 'Вы отложили заказ'} ${order.added.postponed.map(el => el.id).toString()}` }])
        // } 
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? SetTranslate('postponed_orders') : SetTranslate('postponed_order')} ${order.added.postponed.map(el => el.id).toString()}` }])
        }
      }
      if (order.added.postponed.filter(el => el.disrupted_by !== '').length > 0) {
        if (user.user.role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? SetTranslate('restored_orders') : SetTranslate('restored_order')} ${order.added.postponed.map(el => el.id).toString()}, ${SetTranslate('check_restored')}` }])
        }
      }
      if (order.added.canceled.filter(el => el.disrupted_by === '').length > 0) {
        // if (user.user.role === 'customer') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.canceled.length > 1 ? 'Вы отменили заказы:' : 'Вы отменили заказ'} ${order.added.canceled.map(el => el.id).toString()}` }])
        // } 
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${order.added.canceled.length > 1 ? SetTranslate('orders_canceled') : SetTranslate('order_canceled')} ${order.added.canceled.map(el => el.id).toString()}` }])
        }
      }
      else if (order.added.canceled.filter(el => el.disrupted_by !== '').length > 0) {
        if (order.added.canceled.filter(el => el.disrupted_by === 'carrier').length > 0 && user.user.role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${order.added.canceled.length > 1 ? SetTranslate('canceled_disrupted_orders') : SetTranslate('canceled_disrupted_order')} ${order.added.canceled.map(el => el.id).toString()}, ${SetTranslate('restore_to_resend')}. ${SetTranslate('affect_carrier_rating')}` }])
        } if (order.added.canceled.filter(el => el.disrupted_by === 'carrier' && el.carrierId === UserInfo.userInfo.id).length > 0 && user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${SetTranslate('non_arrival')} ${order.added.canceled.length > 1 ? SetTranslate('orders_canceled').toLowerCase() : SetTranslate('order_canceled').toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${SetTranslate('affect_your_rating')}` }])
        }
        if (order.added.canceled.filter(el => el.disrupted_by === 'customer').length > 0 && user.user.role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${SetTranslate('not_loading')} ${order.added.canceled.length > 1 ? SetTranslate('orders_canceled').toLowerCase() : SetTranslate('order_canceled').toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${SetTranslate('affect_your_rating')}` }])
        }
        if (order.added.canceled.filter(el => el.disrupted_by === 'customer').length > 0 && user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${SetTranslate('not_loading')} ${order.added.canceled.length > 1 ? SetTranslate('orders_canceled').toLowerCase() : SetTranslate('order_canceled').toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${SetTranslate('affect_customer_rating').toLowerCase()}` }])
        }
      }
      if (order.added.completed.filter(el => el.updated_by_role === 'customer').length > 0) {
        // if (user.user.role === 'carrier') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? 'Вы завершили заказы:' : 'Вы завершили заказ'} ${order.added.completed.map(el => el.id).toString()}` }])
        // }
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? SetTranslate('customer_completed_orders') : SetTranslate('customer_completed_order')} ${order.added.completed.map(el => el.id).toString()}` }])
        }
      }
      if (order.added.completed.filter(el => el.updated_by_role === 'carrier').length > 0) {
        // if (user.user.role === 'carrier') {
        //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? 'Вы завершили заказы:' : 'Вы завершили заказ'} ${order.added.completed.map(el => el.id).toString()}` }])
        // }
        if (user.user.role === 'customer') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? SetTranslate('completed_orders') : SetTranslate('completed_order')} ${order.added.completed.map(el => el.id).toString()}` }])
        }
      }
      if (order.added.newType.filter(el => el.order_type === 'auction').length > 0) {
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.newType.length > 1 ? SetTranslate('orders_notifications') : SetTranslate('order_notifications')} ${order.added.newType.map(el => el.id).toString()} ${order.added.newType.length > 1 ? SetTranslate('converted_many') : SetTranslate('converted_one')} ${SetTranslate('to_auction')}` }])
        }
      }
      if (order.added.newType.filter(el => el.order_type === 'order').length > 0) {
        if (user.user.role === 'carrier') {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.newType.length > 1 ? SetTranslate('auctions_notifications') : SetTranslate('auction_notifications')} ${order.added.newType.map(el => el.id).toString()} ${order.added.newType.length > 1 ? SetTranslate('converted_many') : SetTranslate('converted_one')} ${SetTranslate('to_auction')} ${SetTranslate('can_take_it')}` }])
        }
      }
    }
  }, [order.added])
  useEffect(() => {
    if (Object.keys(Offer.changes).length > 0) {
      if (Offer.changes.new.length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.new.length > 1 ? SetTranslate('new_offers') : SetTranslate('new_offer')} ${Offer.changes.new.map(el => el.orderId).toString()}` }])
      }
      if (Offer.changes.updated.length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.updated.length > 1 ? SetTranslate('changed_offers') : SetTranslate('changed_offer')} ${Offer.changes.updated.map(el => el.orderId).toString()}` }])
      }
      if (Offer.changes.deleted.length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.deleted.length > 1 ? SetTranslate('removed_offers') : SetTranslate('removed_offer')} ${Offer.changes.deleted.map(el => el.orderId).toString()}` }])
      }
    }
  }, [Offer.changes])
  useEffect(() => {
    if (Object.keys(Point.added).length > 0) {
      if (Point.added.postponed.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.postponed.length > 1 ? SetTranslate('postponed_points') : SetTranslate('postponed_point')} ${Point.added.postponed.map(el => el.sequence).toString()} ${Point.added.postponed.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.postponed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.canceled.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.canceled.length > 1 ? SetTranslate('canceled_points') : SetTranslate('canceled_point')} ${Point.added.canceled.map(el => el.sequence).toString()} ${Point.added.canceled.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.canceled.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.new.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role === 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.new.filter(el => el.updatedAt !== el.createdAt).length > 1 ? SetTranslate('restored_points') : SetTranslate('restored_point')} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.sequence).toString()} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.completed.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.completed.length > 1 ? SetTranslate('completed_points') : SetTranslate('completed_point')} ${Point.added.completed.map(el => el.sequence).toString()} ${Point.added.completed.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.completed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.in_work.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.in_work.length > 1 ? SetTranslate('in_work_points') : SetTranslate('in_work_point')} ${Point.added.in_work.map(el => el.sequence).toString()} ${Point.added.in_work.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.in_work.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }

      if (Point.added.postponed.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.postponed.length > 1 ? SetTranslate('postponed_points') : SetTranslate('postponed_point')} ${Point.added.postponed.map(el => el.sequence).toString()} ${Point.added.postponed.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.postponed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.canceled.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.canceled.length > 1 ? SetTranslate('canceled_points') : SetTranslate('canceled_point')} ${Point.added.canceled.map(el => el.sequence).toString()} ${Point.added.canceled.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.canceled.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.new.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.new.filter(el => el.updatedAt !== el.createdAt).length > 1 ? SetTranslate('restored_points') : SetTranslate('restored_point')} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.sequence).toString()} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.completed.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.completed.length > 1 ? SetTranslate('completed_points') : SetTranslate('completed_point')} ${Point.added.completed.map(el => el.sequence).toString()} ${Point.added.completed.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.completed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
      if (Point.added.in_work.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.in_work.length > 1 ? SetTranslate('in_work_points') : SetTranslate('in_work_point')} ${Point.added.in_work.map(el => el.sequence).toString()} ${Point.added.in_work.map(el => el.orderIntegrationId).length > 1 ? SetTranslate('on_orders') : SetTranslate('on_order')} ${order.orders.filter(el => Point.added.in_work.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
      }
    }
  }, [Point.added])
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  let thisOrder = { order_status: '' }

  return (
    <>
      <HorizontalContainer style={{ width: '100%' }}
      >
        {ComponentFunction.OrdersComponentFunction === 'orderList' && Object.keys(UserInfo.userInfo).length !== 0 ?
          <VerticalContainer
            style={{
              gap: '0px',
              alignItems: 'center'
            }}>
            {order.totalCount[ComponentFunction.Function] > 0 ? <>
              <FilterAndSortComponentForServer parent={'orders'} setFetchStart={setFetchStart} setFetchPartnersStart={setFetchPartnersStart} />
              <HorizontalContainer>

                {order &&
                  <>
                    {/* eslint-disable-next-line no-undef */}
                    {order.group.length !== 0 ?
                      <HorizontalContainer
                        style={{
                          marginTop: '5px',
                          fontSize: '12px',
                          alignItems: 'center',
                          border: 'solid 1px rgb(245, 245, 245, 0.8)',
                          width: '400px',
                          minHeight: '18px',
                          borderRadius: '5px',
                        }}
                      >
                        {`${SetTranslate('selected_orders')} ${order.group.length}`}
                        <OrderStatusButtons parent={'selector'} thisOrder={thisOrder} setFetchStart={setFetchStart} />
                        {user.user.role === 'carrier' && ComponentFunction.Function === 'new' ? <></> :
                          <>
                            {order.group.length < order.orders.length ?
                              <CardButton
                                onClick={() => { order.setGroup(order.orders.map(el => el.id)) }}
                              >{SetTranslate('select_all')}</CardButton> :
                              <CardButton
                                onClick={() => { order.setGroup([]) }}
                              >{SetTranslate('reset')}</CardButton>
                            }
                          </>}
                      </HorizontalContainer>
                      : <></>
                    }
                  </>}

                {State.user_state.favorite_order_state.length !== 0 ?
                  <HorizontalContainer
                    style={{
                      marginTop: '5px',
                      fontSize: '12px',
                      alignItems: 'center',
                      border: 'solid 1px rgb(245, 245, 245, 0.8)',
                      width: '400px',
                      minHeight: '18px',
                      borderRadius: '5px',
                    }}
                  >
                    {`В избранном ${order.orders.filter(el => State.user_state.favorite_order_state.includes(el.id)).length}`}
                    {FilterAndSort.filters.selected.length === 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                          setFetchStart(true)
                        }}
                      >{SetTranslate('just_favorites')}</CardButton>
                      : <></>}
                    {FilterAndSort.filters.selected.length > 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters([], 'selected')
                          setFetchStart(true)
                        }}
                      >{SetTranslate('reset_favorites')}</CardButton>
                      : <></>}
                    <CardButton
                      onClick={() => {
                        State.setUserStateField([], 'favorite_order_state', UserInfo.userInfo.id)
                        FilterAndSort.setFilters([], 'selected')
                        setFetchStart(true)
                      }}
                    >{SetTranslate('clear_favorites')}</CardButton>
                  </HorizontalContainer>
                  : <></>}

              </HorizontalContainer>
              <HorizontalContainer
                style={{ marginTop: '10px' }}>
                {
                  order.orders.map(oneOrder => <OrderItem
                    key={oneOrder.id}
                    oneOrder={oneOrder}
                    oneOrderOffers={Offer.offers.filter(el => el.orderId === oneOrder.id)}
                    oneOrderPoints={Point.points.filter(el => el.orderIntegrationId === oneOrder.pointsIntegrationId)}
                    oneOrderNoPartners={Partner.noPartnerInfos}
                    user={user}
                    orderItemFunction={orderItemFunction}
                    setOrderItemFunction={setOrderItemFunction}
                    setFetchStart={setFetchStart}
                    onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === oneOrder.carrierId) : ''}
                    onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.carrierId) : ''}
                    setFetchPartnersStart={setFetchPartnersStart}
                  />)}
              </HorizontalContainer>
            </>
              : <div
                style={{
                  marginTop: '10vh',
                  fontSize: '20px'
                }}
              >{SetTranslate('no_orders')}</div>}
          </VerticalContainer> :
          ComponentFunction.OrdersComponentFunction === 'orderItem' ?
            <>
              <OrderItem
                oneOrder={order.order}
                oneOrderOffers={Offer.offers.filter(el => el.orderId === order.order.id)}
                oneOrderPoints={Point.points.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId)}
                oneOrderNoPartners={Partner.noPartnerInfos}
                user={user}
                orderItemFunction={orderItemFunction}
                setOrderItemFunction={setOrderItemFunction}
                setFetchStart={setFetchStart}
                onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === order.order.userInfoId) :
                  user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === order.order.carrierId) : ''}
                onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.userInfoId) :
                  user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.carrierId) : ''}
                setFetchPartnersStart={setFetchPartnersStart}
              />
            </>
            :
            <></>}
      </HorizontalContainer>
      <div style={{ width: '100%' }}>
        {(ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent setFetchStart={setFetchStart} />}
      </div>
    </>
  )
})

export default Orders