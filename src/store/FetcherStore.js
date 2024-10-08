import { makeAutoObservable } from "mobx";

export default class FetcherStore {
  constructor() {
    this._server_notifications = false;
    this._subscriptions = false;
    this._user_state = false;
    this._partners = false;
    this._transports = false;
    this._account_user = false;
    this._account_user_info = false;
    this._user_info = false;

    //orders
    this._orders = false;
    this._divided_orders = false;
    this._orders_all = false;
    this._orders_new = false;
    this._orders_in_work = false;
    this._create = false;
    this._order_viewed = false;

    //statuses
    this._new_status = "";
    this._status = "";

    //management
    this._management_users = false;
    this._management_orders = false;
    this._management_transports = false;
    this._management_visits = false;
    this._management_registrations = false;

    //ad
    this._main_counters = false;
    this._ad_transports = false;

    //setting
    this._user_app_setting = false;

    //loading
    this._loading = false;
    this._custom_loading = false;

    //drivers
    this._drivers = false;

    makeAutoObservable(this);
  }
  //set
  setServerNotifications(value) {
    this._server_notifications = value;
  }
  setSubscriptions(value) {
    this._subscriptions = value;
  }
  setUserState(value) {
    this._user_state = value;
  }
  setPartners(value) {
    this._partners = value;
  }
  setOrders(value) {
    this._orders = value;
  }
  setOrdersAll(value) {
    this._orders_all = value;
  }
  setOrdersNew(value) {
    this._orders_new = value;
  }
  setOrdersInWork(value) {
    this._orders_in_work = value;
  }
  setDrivers(value) {
    this._drivers = value;
  }
  setTransports(value) {
    this._transports = value;
  }
  setAccountUser(value) {
    this._account_user = value;
  }
  setAccountUserInfo(value) {
    this._account_user_info = value;
  }
  setDividedOrders(value) {
    this._divided_orders = value;
  }
  setNewStatus(value) {
    this._new_status = value;
  }
  setStatus(value) {
    this._status = value;
  }
  setCreate(value) {
    this._create = value;
  }
  setManagementUsers(value) {
    this._management_users = value;
  }
  setManagementOrders(value) {
    this._management_orders = value;
  }
  setManagementTransports(value) {
    this._management_transports = value;
  }
  setManagementVisits(value) {
    this._management_visits = value;
  }
  setManagementRegistrations(value) {
    this._management_registrations = value;
  }
  setMainCounters(value) {
    this._main_counters = value;
  }
  setAdTransports(value) {
    this._ad_transports = value;
  }
  setOrderViewed(value) {
    this._order_viewed = value;
  }
  setUserAppSetting(value) {
    this._user_app_setting = value;
  }
  setLoading(value) {
    this._loading = value;
  }
  setCustomLoading(value) {
    this._custom_loading = value;
  }
  setUserInfo(value) {
    this._user_info = value;
  }

  //get
  get server_notifications() {
    return this._server_notifications;
  }
  get subscriptions() {
    return this._subscriptions;
  }
  get user_state() {
    return this._user_state;
  }
  get partners() {
    return this._partners;
  }
  get orders() {
    return this._orders;
  }
  get orders_all() {
    return this._orders_all;
  }
  get orders_new() {
    return this._orders_new;
  }
  get orders_in_work() {
    return this._orders_in_work;
  }
  get drivers() {
    return this._drivers;
  }
  get transports() {
    return this._transports;
  }
  get account_user() {
    return this._account_user;
  }
  get account_user_info() {
    return this._account_user_info;
  }

  get divided_orders() {
    return this._divided_orders;
  }
  get new_status() {
    return this._new_status;
  }
  get status() {
    return this._status;
  }
  get create() {
    return this._create;
  }
  get management_users() {
    return this._management_users;
  }
  get management_orders() {
    return this._management_orders;
  }
  get management_transports() {
    return this._management_transports;
  }
  get management_visits() {
    return this._management_visits;
  }
  get management_registrations() {
    return this._management_registrations;
  }
  get main_counters() {
    return this._main_counters;
  }
  get ad_transports() {
    return this._ad_transports;
  }
  get order_viewed() {
    return this._order_viewed;
  }
  get user_app_setting() {
    return this._user_app_setting;
  }
  get loading() {
    return this._loading;
  }
  get custom_loading() {
    return this._custom_loading;
  }
  get user_info() {
    return this._user_info;
  }
}
