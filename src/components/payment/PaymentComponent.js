import React, { useContext, useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";
import { observer } from "mobx-react-lite";
import {
  FetcherContext,
  NotificationContext,
  SettingContext,
  TranslateContext,
} from "../..";
import { updateSubscription } from "../../http/subscriptionApi";
import { v4 } from "uuid";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import "./Payment.css";

const PaymentComponent = observer(
  ({
    modalActive2,
    setModalActive2,
    yoomoneyToken,
    paymentId,
  }) => {
    const { fetcher } = useContext(FetcherContext);
    const { Notification } = useContext(NotificationContext);
    const { Translate } = useContext(TranslateContext);
    const { Setting } = useContext(SettingContext);
    const [render, setRender] = useState("yookassa");

    let checkout;

    checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: yoomoneyToken, //Токен, который перед проведением оплаты нужно получить от ЮKassa
      // return_url: 'https://logid.app', //Ссылка на страницу завершения оплаты
      error_callback: function (error) {
        //Обработка ошибок инициализации
      },
    });

    useEffect(() => {
      if (yoomoneyToken !== "empty_token") {
        checkout
          .render("payment-form")
          //Метод возвращает Promise, исполнение которого говорит о полной загрузке платежной формы (можно не использовать).
          .then(() => {
            //Код, который нужно выполнить после отображения платежной формы.
          });
      }
    }, [yoomoneyToken]);

    const formReset = () => {
      checkout.destroy();
    };
    const done = async () => {
      try {
        await updateSubscription(paymentId).then((data) => {
          Notification.addNotification([
            { id: v4(), type: "success", message: data.message },
          ]);
        });
        fetcher.setSubscriptions(true);
      } catch (e) {
        Notification.addNotification([
          { id: v4(), type: "error", message: e.response.data.message },
        ]);
      }
    };

    checkout.on("success", () => {
      //Код, который нужно выполнить после успешной оплаты.
      paymentId && done();
      setRender("payment_ok");

      setTimeout(() => {
        setModalActive2(false);
      }, 5000);
      //Удаление инициализированного виджета
      // checkout.destroy();
    });

    checkout.on("fail", () => {
      //Код, который нужно выполнить после неудачной оплаты.
      setRender("payment_fail");
      setTimeout(() => {
        setModalActive2(false);
      }, 3000);
      //Удаление инициализированного виджета
      // checkout.destroy();
    });

    return (
      <>
        <Modal
          modalActive={modalActive2}
          setModalActive={setModalActive2}
          parent="Payment"
          formReset={formReset}
        >
          <div className="payment_form_container">
            {render === "yookassa" ? (
              <div id="payment-form"></div>
            ) : render === "payment_ok" ? (
              <div
                className={
                  Setting.app_theme === "light"
                    ? "payment_form_container"
                    : "payment_form_message_dark"
                }
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Платеж завершен"],
                  english: ["Payment completed"],
                  spanish: ["Pago completado"],
                  turkish: ["Ödeme tamamlandı"],
                })}
              </div>
            ) : render === "paiment_fail" ? (
              <div
                className={
                  Setting.app_theme === "light"
                    ? "payment_form_container"
                    : "payment_form_message_dark"
                }
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Платеж не прошел"],
                  english: ["Payment failed"],
                  spanish: ["Pago fallido"],
                  turkish: ["Ödeme başarısız"],
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal>
      </>
    );
  }
);

export default PaymentComponent;
