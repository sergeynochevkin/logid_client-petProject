import { makeAutoObservable } from "mobx";

export default class AdStore {
    constructor() {
        this._customers_count = 0
        this._carriers_count = 0
        this._finished_orders_count = 0
        this._ip = ''

        this._transports = []
        this._transport_option = ''
        this._transport_images = []
        this._users = []


        makeAutoObservable(this)
    }

    setCustomersCount(value) {
        this._customers_count = value
    }
    setCarriersCount(value) {
        this._carriers_count = value
    }
    setFinishedOrdersCount(value) {
        this._finished_orders_count = value
    }
    setTransports(value) {
        this._transports = value
    }
    setTransportImages(value) {
        this._transport_images = value
    }
    setUsers(value) {
        this._users = value
    }
    setIp(value) {
        this._ip = value
        localStorage.setItem('currentIp', JSON.stringify(this._ip))
    }
    setTransportOption(value) {
        this._transport_option = value
    }

    get customers_count() {
        return this._customers_count
    }
    get carriers_count() {
        return this._carriers_count
    }
    get finished_orders_count() {
        return this._finished_orders_count
    }
    get transports() {
        return this._transports
    }
    get transport_images() {
        return this._transport_images
    }
    get users() {
        return this._users
    }
    get ip() {
        return this._ip
    }
    get transport_option() {
        return this._transport_option
    }
}