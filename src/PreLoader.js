import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AdContext,
  AdressContext,
  EquipmentTypeContext,
  FetcherContext,
  LinkContext,
  SettingContext,
  StateContext,
  SubscriptionContext,
  TranslateContext,
  TransportTypeContext,
  UserContext,
  UserInfoContext,
} from ".";
import { fetchDefaultData } from "./http/defaultDataApi";
import { fetchUserState } from "./http/stateApi";
import { check } from "./http/userAPI";
import { fetchUserInfo } from "./http/userInfoApi";
import { MAIN_ROUTE } from "./utils/consts";
import axios from "axios";
import PageLoader from "./components/ui/loader/PageLoader ";
import { addVisit } from "./http/adApi";
import { useJsApiLoader } from "@react-google-maps/api";
import { YMInitializer } from "react-yandex-metrika";
import ComingSoon from './components/comingSoon/ComingSoon';

const PreLoader = observer(({ children, ...props }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { Ad } = useContext(AdContext);
  const { TransportType } = useContext(TransportTypeContext);
  const { EquipmentType } = useContext(EquipmentTypeContext);
  const { link } = useContext(LinkContext);
  const { Adress } = useContext(AdressContext);
  const { Subscription } = useContext(SubscriptionContext);
  const { Translate } = useContext(TranslateContext);
  const { State } = useContext(StateContext);
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { Setting } = useContext(SettingContext);
  const { fetcher } = useContext(FetcherContext);
  const order_id = queryParams.get("o_i");
  const order_status = queryParams.get("o_s");
  const referal_id = queryParams.get("referal_id");
  const action = queryParams.get("action");

  let location = useLocation();
  let id;
  if (location) {
    location = location.pathname.split("/");
    if (location[1] === "board" && location[2] === "item") {
      id = location[3];
    }
  }

  //now just in russia!
  const [libraries] = useState(["places"]);
  let language = "ru";
  let region = "RU";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: region,
    language: language,
  });

  //attach google and lets go to design!

  const getIp = async () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        Ad.setIp(data.ip);
        addVisit(data.ip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (order_id) {
      link.setOrder(order_id, "id");
      link.setOrder(order_status, "status");
    }
  }, []);

  useEffect(() => {
    if (referal_id && action === "add_partner") {
      link.setRefer(action, "action");
      link.setRefer(referal_id, "id");
    }
    if (action === "driver_activation") {
      link.setAfterActions(true, "driver_activation");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      await fetchDefaultData().then((data) => {
        Subscription.setPlans(data.subscripton_plans);
        Subscription.setOptions(data.subscripton_options);
        Subscription.setOptionsByPlans(data.subscripton_options_by_plans);
        TransportType.setTypes(data.transport_types);
        TransportType.setSideTypes(data.transport_side_types);
        TransportType.setLoadCapacities(data.transport_load_capacities);
        EquipmentType.setTypes(data.equipment_types);
        Adress.setCountries(data.countries);
        Adress.setCities(data.cities);

        let country = data.countries.find((el) => el.google_code === "RU");
        Adress.setCountry(country);
        if (
          localStorage.getItem("language") &&
          localStorage.getItem("language") !== undefined
        ) {
          let language = localStorage.getItem("language");
          Translate.setLanguage(language);
        } else {
          Translate.setLanguage("russian");
        }
        setDataLoaded(true);
      });
    }
    localStorage.getItem("app_theme") &&
      Setting.setAppTheme(localStorage.getItem("app_theme"));
    if (!localStorage.getItem("cookies_accepted")) {
      localStorage.setItem(
        "cookies_accepted",
        JSON.stringify({ total: false, auth: false, main: false })
      );
    } else if (!JSON.parse(localStorage.getItem("cookies_accepted")).total) {
      localStorage.setItem(
        "cookies_accepted",
        JSON.stringify({ total: false, auth: false, main: false })
      );
    }
    if (id) {
      fetcher.setAdTransports(true);
    }
    fetchData();
    getIp();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        async function fetchData() {
          let country;
          let data = await check();

          if (data && (data.role === "carrier" || data.role === "customer")) {
            fetcher.setDrivers(true);
          }

          if (data.isActivated && action === "driver_activation")
            link.setAfterActions(false, "driver_activation");

          user.setUser(data);

          if (data.role === "admin") {
            fetcher.setManagementRegistrations(true);
            fetcher.setManagementVisits(true);
            fetcher.setManagementUsers(true);
            fetcher.setManagementOrders(true);
            fetcher.setManagementTransports(true);
          }

          if (data.role === "driver") {
            await fetchUserInfo(data.user_id).then((data) => {
              user.setSupervisor(data);
            });
          }

          user.setIsAuth(true);

          data = await fetchUserInfo(user.user.id).then((data) => {
            if (data) {
              UserInfo.setUserInfo(data);
              country = Adress.countries.find(
                (el) => el.value === data.country
              );
              if (country !== Adress.country.value) {
                Adress.setCountry(country);
              }

              fetcher.setUserInfo(true);

              if (user.user.role === "carrier" || user.user.role === "driver") {
                fetcher.setTransports(true);
              }

              if (
                (user.user.role === "carrier" ||
                  user.user.role === "customer") &&
                location.pathname !== "/board"
              ) {
                fetcher.setPartners(true);
                if (order_status) {
                  order_status === "new" && fetcher.setOrdersNew(true);
                  order_status === "inWork" && fetcher.setOrdersInWork(true);
                  setTimeout(() => {
                    fetcher.setOrdersAll(true);
                  }, 1000);
                } else {
                  fetcher.setOrdersAll(true);
                }
              }
            }

            data &&
              fetchUserState(data.id).then((stateData) => {
                let state = JSON.parse(stateData.state);
                State.setUserState(state);
                if (user.user.role === "driver") {
                  State.setSupervisorState(stateData.supervisor_state);
                }

                if (state.app_theme) {
                  Setting.setAppTheme(state.app_theme);
                }
                if (state.adress_history) {
                  Setting.setAdressHistory(state.adress_history);
                }
                if (state.language) {
                  if (
                    state.language !== "english" &&
                    state.language !== country.default_language
                  ) {
                    Translate.setLanguage(country.default_language);
                  } else {
                    Translate.setLanguage(state.language);
                  }
                } else {
                  State.setUserStateField(
                    Translate.language,
                    "language",
                    data.id
                  );
                }
              });
            data && fetcher.setUserAppSetting(true);
          });

          user.user.role === "admin" && navigate(MAIN_ROUTE);
          user.user.role === "manager" && navigate(MAIN_ROUTE);
        }
        fetchData();
      } catch (e) {
        console.log(e.data.message);
      }
    }
  }, []);

  return (
    <div {...props}>
      <YMInitializer
        accounts={[91943409]}
        options={{
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
        version="2"
      />
       {dataLoaded && isLoaded ? children : <PageLoader />} 
      {/* <ComingSoon/>/ */}
    </div>
  );
});

export default PreLoader;
