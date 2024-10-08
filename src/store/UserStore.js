import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._supervisor = {};
    this._role = [
      { id: 1, name: "customer" },
      { id: 2, name: "carrier" },
      { id: 3, name: "admin" },
      { id: 4, name: "manager" },
    ];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
  setSupervisor(value) {
    this._supervisor = value;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get supervisor() {
    return this._supervisor;
  }
}
