import React, { startTransition, useEffect } from "react";
import classes from "./Nav.module.sass";

import {
  MAIN_ROUTE,
  USER_ROUTE,
  ADMIN_ROUTE,
  MANAGER_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import NotificationComponent from "../../components/notification/NotificationComponent";
import { logout } from "../../http/userAPI";
import "./NavBar.css";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import Modal from "../../components/ui/modal/Modal";
import CountrySelector from "./CountrySelector";
import NotificationIcon from "../../components/notification/NotificationIcon";
import ServerNotificationList from "../../components/notification/ServerNotificationList";
import dark_mode from "../../assets/icons/dark_mode.png";
import light_mode from "../../assets/icons/light_mode.png";
import board from "../../assets/icons/board.png";
import board_dark from "../../assets/icons/board_dark.png";
import logo_light from "../../assets/logo_light.webp";
import logo_dark from "../../assets/logo_dark.webp";
import Auth from "../../components/auth/Auth";
import ShareComponent from "../../components/share/ShareComponent";
import InternedSpeed from "./InternedSpeed";
import LocationStatus from "./LocationStatus";
import LanguageSwitcher from "./LanguageSwitcher";
import NavBarCaptureElement from "./NavBarCaptureElement";
import CitySelector from "./components/citySelector/CitySelector";
import { useNavBar } from "./hooks/useNavBar";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import Links from "./components/links/Links";

const NavBar = observer(() => {
  const {
    Adress,
    user,
    order,
    State,
    Setting,
    link,
    UserInfo,
    Translate,
    modalActive,
    setModalActive,
    modalActive1,
    setModalActive1,
    modalActive2,
    setModalActive2,
    modalActive3,
    setModalActive3,
    name,
    setName,
    navigate,
    location,
    width,
  } = useNavBar();

  useEffect(() => {
    !Adress.country_detected && setModalActive(true);
  }, []);

  useEffect(() => {
    if (
      (link.order.id ||
        link.refer.id ||
        link.after_actions.driver_activation) &&
      !user.isAuth
    ) {
      setModalActive1(true);
    }
  }, []);

  let office = SetNativeTranslate(Translate.language, {
    russian: ["Кабинет"],
    english: ["Office"],
    spanish: ["Oficina"],
    turkish: ["Ofis"],
    сhinese: ["办公室"],
    hindi: ["कार्यालय"],
  });

  return (
    <>
      <InternedSpeed />
      <LocationStatus />
      <div
        className={
          Setting.app_theme === "light"
            ? "nav_bar_container"
            : "nav_bar_container nav_bar_container_dark"
        }
      >
        <NotificationComponent />

        <NotificationIcon
          modalActive={modalActive2}
          setModalActive={setModalActive2}
        />
        <Modal
          parent={"serverNotifications"}
          modalActive={modalActive2}
          setModalActive={setModalActive2}
        >
          <ServerNotificationList setModalActive={setModalActive2} />
        </Modal>

        <Modal setModalActive={setModalActive1} modalActive={modalActive1}>
          <Auth
            enterPoint={"isLogin"}
            setModalActive={setModalActive1}
            modalActive={modalActive1}
            parent={"navBar"}
          />
        </Modal>

        <div className={classes.ButtonsBlock}>
          <div
            className="nav_bar_logo_container"
            onClick={() => {
              startTransition(() => {
                navigate(MAIN_ROUTE);
              });
            }}
          >
            <img
              src={
                Setting.app_theme === "light" &&
                  Translate.language === "russian"
                  ? logo_light
                  : Setting.app_theme === "light" &&
                    Translate.language !== "russian"
                    ? logo_light
                    : Setting.app_theme === "dark" &&
                      Translate.language === "russian"
                      ? logo_dark
                      : Setting.app_theme === "dark"
                        ? logo_dark
                        : logo_light
              }
              className="nav_bar_logo"
            />
            {Adress.city.value ? (
              <button
                disabled={user.isAuth}
                className={classes.NavBarItem}
                onClick={() => {
                  !user.isAuth && setModalActive3(true);
                }}
              >
                {Adress.city.value}
              </button>
            ) : (
              <div
                className={
                  !user.isAuth ? "nav_bar_item" : "nav_bar_item disabled"
                }
                disabled={user.isAuth}
                onClick={() => {
                  if (!modalActive && !user.isAuth) {
                    setModalActive(true);
                    setName(
                      SetNativeTranslate(Translate.language, {
                        russian: ["Выберите страну из списка"],
                        english: ["Select your country"],
                        spanish: ["Selecciona tu pais"],
                        turkish: ["Ülkeni seç"],
                        сhinese: ["从列表中选择一个国家"],
                        hindi: ["सूची से एक देश चुनें"],
                      })
                    );
                  } else if (modalActive) {
                    setModalActive(false);
                  }
                }}
              >
                {Translate.language &&
                  SetNativeTranslate(
                    Translate.language,
                    {},
                    Adress.country.value
                  )}
              </div>
            )}

          </div>


        </div>

        {width > 500 ? (
          <>
            {user.user.role === "customer" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "customers_office")}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "carrier" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "carriers_office")}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "driver" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Кабинет водителя"],
                  english: ["Drivers office"],
                  spanish: ["Oficina del conductor"],
                  turkish: ["Sürücü ofisi"],
                  сhinese: ["司机室"],
                  hindi: ["ड्राइवर का कार्यालय"],
                })}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "manager" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(MANAGER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "managers_office")}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "admin" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                {SetNativeTranslate(
                  Translate.language,
                  {},
                  "administrators_office"
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {user.user.role === "customer" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "carrier" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "driver" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "manager" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(MANAGER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "admin" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        <div className={classes.ButtonsBlock}>
          <div
            className="nav_bar_theme_icon"
            onClick={() => {
              if (Setting.app_theme === "dark") {
                Setting.setAppTheme("light");
                if (user && user.isAuth) {
                  State.setUserStateField(
                    "light",
                    "app_theme",
                    UserInfo.userInfo.id
                  );
                }
              } else {
                Setting.setAppTheme("dark");
                if (user && user.isAuth) {
                  State.setUserStateField(
                    "dark",
                    "app_theme",
                    UserInfo.userInfo.id
                  );
                }
              }
            }}
          >
            {Setting.app_theme === "light" ? (
              <img src={dark_mode} className="nav_bar_theme_icon" />
            ) : (
              <img src={light_mode} className="nav_bar_theme_icon" />
            )}
          </div>

          {!user.isAuth && (
            <ShareComponent
              parent={location.pathname === "/board" ? "nav_board" : ""}
            />
          )}
          <LanguageSwitcher />
        </div>

        <Links />

        <div className={classes.ButtonsBlock}>
          {user.isAuth ? (
            <div
              className="nav_bar_item"
              onClick={async () => {
                await logout();
                order.setOrders([]);
                user.setIsAuth(false);
                user.setUser({});
                UserInfo.setUserInfo({});
                localStorage.clear();
                localStorage.setItem(
                  "cookies_accepted",
                  JSON.stringify({ total: false, auth: false, main: true })
                );
              }}
            >
              {SetNativeTranslate(Translate.language, {}, "sign_out")}
            </div>
          ) : (
            <div className="nav_bar_item" onClick={() => setModalActive1(true)}>
              {SetNativeTranslate(Translate.language, {}, "sign_in")}
            </div>
          )}
        </div>

        {((width < 1200 && !user.isAuth) || (width < 600 && user.isAuth)) && (
          <BurgerMenu width={width} />
        )}

        <NavBarCaptureElement />
      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <CountrySelector name={name} setModalActive={setModalActive} />
      </Modal>
      <Modal setModalActive={setModalActive3} modalActive={modalActive3}>
        <CitySelector setModalActive={setModalActive3} />
      </Modal>
    </>
  );
});

export default NavBar;
