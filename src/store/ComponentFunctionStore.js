import { makeAutoObservable } from "mobx";
export default class ComponentFunctionStore {
  constructor() {
    this._Function = localStorage.getItem("Function")
      ? localStorage.getItem("Function")
      : "inWork";
    this._PageFunction = localStorage.getItem("pageFunction")
      ? localStorage.getItem("pageFunction")
      : "orderList";
    this._OrdersComponentFunction = localStorage.getItem(
      "OrdersComponentFunction"
    )
      ? localStorage.getItem("OrdersComponentFunction")
      : "orderList";
    this._OfferListMoreInfo = localStorage.getItem("OfferListMoreInfo")
      ? localStorage.getItem("OfferListMoreInfo")
      : false;
    this._orderFormFunction = localStorage.getItem("orderFormFunction")
      ? localStorage.getItem("orderFormFunction")
      : "newOrder";
    this._partnersComponentFunction = localStorage.getItem(
      "partnersComponentFunction"
    )
      ? localStorage.getItem("partnersComponentFunction")
      : "list";
    this._agreement = "";
    this._agreement_modal = false;
    makeAutoObservable(this);
  }
  setPartnersComponentFunction(value) {
    this._partnersComponentFunction = value;
    localStorage.setItem("partnersComponentFunction", value);
  }
  setOrdersComponentFunction(ordersComponentFunction) {
    this._OrdersComponentFunction = ordersComponentFunction;
    localStorage.setItem("OrdersComponentFunction", ordersComponentFunction);
  }
  setOfferListMoreInfo(offerListMoreInfo) {
    this._OfferListMoreInfo = offerListMoreInfo;
    localStorage.setItem("OfferListMoreInfo", offerListMoreInfo);
  }
  setFunction(Function) {
    this._Function = Function;
    localStorage.setItem("Function", Function);
    localStorage.removeItem("groupOrders");
  }
  setPageFunction(pageFunction) {
    if (pageFunction === "orderForm" && localStorage.getItem("formData")) {
      localStorage.removeItem("formData");
    }
    if (pageFunction === "orderForm" && localStorage.getItem("pointFormData")) {
      localStorage.removeItem("pointFormData");
    }
    this._PageFunction = pageFunction;
    localStorage.setItem("pageFunction", pageFunction);
  }
  setOrderFormFunction(value) {
    this._orderFormFunction = value;
    localStorage.setItem("orderFormFunction", value);
  }
  setAgreement(value) {
    this._agreement = value;
  }
  setAgreementModal(value) {
    this._agreement_modal = value;
  }
  get partnersComponentFunction() {
    return this._partnersComponentFunction;
  }
  get Function() {
    return this._Function;
  }
  get PageFunction() {
    return this._PageFunction;
  }
  get OrdersComponentFunction() {
    return this._OrdersComponentFunction;
  }
  get OfferListMoreInfo() {
    return this._OfferListMoreInfo;
  }
  get orderFormFunction() {
    return this._orderFormFunction;
  }
  get agreement() {
    return this._agreement;
  }
  get agreement_modal() {
    return this._agreement_modal;
  }
}
