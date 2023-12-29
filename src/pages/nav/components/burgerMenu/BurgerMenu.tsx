import React from "react";
import { useBurgerMenu } from "./hooks/useBurgerMenu";
import classes from "./BurgerMenu.module.sass";
//@ts-ignore
import close from "../../../../assets/icons/close.png";
//@ts-ignore
import menu from "../../../../assets/icons/menu.svg";
//@ts-ignore
import { SetNativeTranslate } from "../../../../modules/SetNativeTranslate";
import {
  BUSINESS_ROUTE,
  DISPATCHER_ROUTE,
  BOARD_ROUTE,
  FLEET_ROUTE,
  MAIN_ORDER_ROUTE,
  COURIER_ROUTE,
  CARRIER_ROUTE,
  //@ts-ignore
} from "../../../../utils/consts";

type Props = {
  width: number;
};

const BurgerMenu = ({ width }: Props) => {
  const {
    Setting,
    Translate,
    navigateAndClose,
    ref,
    isComponentVisible,
    setIsComponentVisible,
    location,
  } = useBurgerMenu(width);

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div className={classes.Container}>
          {width < 1500 && (
            <>
              {/* <button
                disabled={location.pathname === DISPATCHER_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(DISPATCHER_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Стать диспетчером"],
                  english: ["Become a dispatcher"],
                  spanish: ["Conviértete en despachador"],
                  turkish: ["Gönderici olun"],
                  сhinese: ["成为调度员"],
                  hindi: ["डिस्पैचर बनें"],
                })}
              </button>

              <button
                disabled={location.pathname === BUSINESS_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(BUSINESS_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Доставка для бизнеса"],
                  english: ["Delivery for business"],
                  spanish: ["Entrega para negocios"],
                  turkish: ["İş için teslimat"],
                  сhinese: ["商业送货"],
                  hindi: ["व्यवसाय के लिए डिलिवरी"],
                })}
              </button> */}
            </>
          )}
          {width < 1200 && (
            <>
              {" "}
              <button
                disabled={location.pathname === BOARD_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(BOARD_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Объявления перевозчиков"],
                  english: ["Carrier announcements"],
                  spanish: ["Anuncios del operador"],
                  turkish: ["Operatör duyuruları"],
                  сhinese: ["运营商公告"],
                  hindi: ["वाहक घोषणाएँ"],
                })}
              </button>
              {/* <button
                disabled={location.pathname === FLEET_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(FLEET_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Автопаркам"],
                  english: ["For fleets"],
                  spanish: ["Para flotas"],
                  turkish: ["Filolar için"],
                  сhinese: ["对于车队"],
                  hindi: ["बेड़े के लिए"],
                })}
              </button> */}
            </>
          )}
          {width < 960 && (
            <>
              <button
                disabled={location.pathname === COURIER_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(COURIER_ROUTE);
                }}
              >
                {" "}
                {SetNativeTranslate(Translate.language, {
                  russian: ["Стать курьером"],
                  english: ["Become a courier"],
                  spanish: ["Conviértete en mensajero"],
                  turkish: ["Kurye ol"],
                  сhinese: ["成为一名快递员"],
                  hindi: ["एक कूरियर बनें"],
                })}
              </button>
              <button
                disabled={location.pathname === CARRIER_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(CARRIER_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Стать перевозчиком"],
                  english: ["Become a carrier"],
                  spanish: ["Conviértete en transportista"],
                  turkish: ["Taşıyıcı olun"],
                  сhinese: ["成为载体"],
                  hindi: ["एक वाहक बनें"],
                })}
              </button>
            </>
          )}
          {width < 600 && (
            <>
              <button
                disabled={location.pathname === MAIN_ORDER_ROUTE}
                className={classes.BurgerMenuItem}
                onClick={() => {
                  navigateAndClose(MAIN_ORDER_ROUTE);
                }}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Заказать доставку"],
                  english: ["Order delivery"],
                  spanish: ["Entrega del pedido"],
                  turkish: ["Sipariş teslim"],
                  сhinese: ["订单发货"],
                  hindi: ["आदेश वितरण"],
                })}
              </button>
            </>
          )}
        </div>
      )}

      <img
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
        }}
        src={!isComponentVisible ? menu : close}
        className={
          Setting.app_theme === "dark"
            ? classes.NavBarIconDark
            : classes.NavBarIcon
        }
      ></img>
    </div>
  );
};

export default BurgerMenu;
