import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useContext } from "react";
import {
  FetcherContext,
  NotificationContext,
  OrderContext,
  TranslateContext,
  UserContext,
  UserInfoContext,
} from "../..";
import { useInput } from "../../hooks/useInput";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import AdressComponent from "../account/userInfoForm/AdressComponent";
import Legal from "../account/userInfoForm/Legal";
import NameSurNameFathersName from "../account/userInfoForm/NameSurNameFathersName";
import Phone from "../account/userInfoForm/Phone";
import TypeOfCustomer from "../account/userInfoForm/TypeOfCustomer";
import { v4 } from "uuid";
import { Button } from "../ui/button/Button";
import { updateUserInfo } from "../../http/userInfoApi";

const AccountCompletionForm = observer(
  ({ setModalActive, parent, setFunction }) => {
    const { fetcher } = useContext(FetcherContext);
    const { user } = useContext(UserContext);
    const { Translate } = useContext(TranslateContext);
    const { UserInfo } = useContext(UserInfoContext);
    const { Notification } = useContext(NotificationContext);
    const { order } = useContext(OrderContext);

    const updateUserInfoAction = async (event) => {
      try {
        let data;
        event.preventDefault();
        data = await updateUserInfo(formData);
        if (parent === "user") {
          setFunction(false, false, "orderForm", "newOrder");
          order.setIntegrationId();
        }
        fetcher.setAccountUserInfo(true);
        Notification.addNotification([
          {
            id: v4(),
            type: "success",
            message: `${SetNativeTranslate(
              Translate.language,
              {
                russian: [
                  "Вы успешно обновили данные и можете использовать все возможности приложения",
                  parent === "take_order"
                    ? "Возьмите заказ в работу повторно"
                    : parent === "make_offer"
                    ? "Сделайте предложение повторно"
                    : "",
                ],
                english: [
                  "You have successfully updated the data and can use all the features of the application",
                  parent === "take_order"
                    ? "Take an order again"
                    : parent === "make_offer"
                    ? "Make an offer again"
                    : "",
                ],
                spanish: [
                  "Ha actualizado correctamente los datos y puede utilizar todas las funciones de la aplicación",
                  parent === "take_order"
                    ? "Tomar un pedido nuevamente"
                    : parent === "make_offer"
                    ? "Haz una oferta nuevamente"
                    : "",
                ],
                turkish: [
                  "Verileri başarıyla güncellediniz ve uygulamanın tüm özelliklerini kullanabilirsiniz",
                  parent === "take_order"
                    ? "Tekrar sipariş al"
                    : parent === "make_offer"
                    ? "Tekrar teklif yap"
                    : "",
                ],
                сhinese: [
                  "您已成功更新数据并可以使用应用程序的所有功能",
                  parent === "take_order"
                    ? "再次下单"
                    : parent === "make_offer"
                    ? "再次报价"
                    : "",
                ],
                hindi: [
                  "आपने डेटा को सफलतापूर्वक अपडेट कर लिया है और एप्लिकेशन की सभी सुविधाओं का उपयोग कर सकते हैं",
                  parent === "take_order"
                    ? "फिर से ऑर्डर लें"
                    : parent === "make_offer"
                    ? "फिर से एक प्रस्ताव बनाएं"
                    : "",
                ],
              },
              ""
            )}`,
          },
        ]);
        setModalActive(false);
      } catch (e) {
        Notification.addNotification([
          { id: v4(), type: "error", message: e.response.data.message },
        ]);
      }
    };

    const initialValue = {
      id: UserInfo.userInfo.id,
      legal: "",
      phone: "",
      website: "",
      company_name: "",
      company_inn: "",
      company_adress: { value: "", isDirty: false, notValid: true },
      company_adress_latitude: "",
      company_adress_longitude: "",
      type_of_customer: "",
      name_surname_fathersname: "",
      passport_number: "",
      passport_date_of_issue: "",
      passport_issued_by: "",
    };

    const [formData, setFormData] = useState(initialValue);

    formData.name_surname_fathersname = useInput(
      "",
      { isEmpty: true, minLength: 10, maxLength: 50 },
      SetNativeTranslate(
        Translate.language,
        {},
        "name_surname_fathersname_content"
      ).toLowerCase()
    );
    const validInn = /^[1-9]+[0-9]*$/;
    formData.company_inn = useInput(
      "",
      { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validInn },
      SetNativeTranslate(
        Translate.language,
        {},
        "company_inn_content"
      ).toLowerCase()
    );
    formData.company_name = useInput(
      "",
      { isEmpty: true, minLength: 6, maxLength: 30 },
      SetNativeTranslate(
        Translate.language,
        {},
        "company_name_content"
      ).toLowerCase()
    );
    const validWebSite =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    formData.website = useInput(
      "",
      { isEmpty: true, minLength: 6, maxLength: 30, validFormat: validWebSite },
      SetNativeTranslate(
        Translate.language,
        {},
        "website_content"
      ).toLowerCase()
    );
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    formData.legal = useInput("", { isEmpty: true });
    formData.email = useInput(
      "",
      { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail },
      SetNativeTranslate(Translate.language, {}, "email").toLowerCase()
    );
    formData.passport_date_of_issue = useInput(
      "",
      { isEmpty: true },
      SetNativeTranslate(
        Translate.language,
        {},
        "passport_date_of_issue_content"
      ).toLowerCase()
    );
    formData.passport_issued_by = useInput(
      "",
      { isEmpty: true, minLength: 10, maxLength: 60 },
      SetNativeTranslate(
        Translate.language,
        {},
        "passport_issued_by_content"
      ).toLowerCase()
    );
    const validPassportNumber = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
    formData.passport_number = useInput(
      "",
      {
        isEmpty: true,
        minLength: 6,
        maxLength: 18,
        validFormat: validPassportNumber,
      },
      SetNativeTranslate(
        Translate.language,
        {},
        "passport_number_content"
      ).toLowerCase()
    );
    const validPhone =
      /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    formData.phone = useInput(
      "",
      { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone },
      SetNativeTranslate(Translate.language, {}, "phone_content").toLowerCase()
    );
    formData.type_of_customer = useInput("", { isEmpty: true });

    return (
      <div className="after_fast_sign_up_form_container">
        {parent && (
          <div className="fill_account_disclaimer">
            {user.user.role === "customer"
              ? SetNativeTranslate(
                  Translate.language,
                  {
                    russian: [
                      "Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность отправлять заказы",
                    ],
                    english: [
                      "The safety of all service participants is important to us, please fill out the profile to be able to send orders",
                    ],
                    spanish: [
                      "La seguridad de todos los participantes del servicio es importante para nosotros, complete el perfil para poder enviar pedidos",
                    ],
                    turkish: [
                      "Tüm hizmet katılımcılarının güvenliği bizim için önemlidir, sipariş gönderebilmek için lütfen profili doldurun",
                    ],
                    сhinese: [
                      "所有服务参与者的安全对我们很重要，请填写个人资料以便能够发送订单",
                    ],
                    hindi: [
                      "सभी सेवा प्रतिभागियों की सुरक्षा हमारे लिए महत्वपूर्ण है, ऑर्डर भेजने में सक्षम होने के लिए कृपया प्रोफ़ाइल भरें",
                    ],
                  },
                  ""
                )
              : user.user.role === "carrier"
              ? SetNativeTranslate(
                  Translate.language,
                  {
                    russian: [
                      "Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность брать в работу заказы и делать предложения по аукционам",
                    ],
                    english: [
                      "The safety of all participants of the service is important to us, please fill out the profile in order to be able to take orders and make offers for auctions",
                    ],
                    spanish: [
                      "La seguridad de todos los participantes del servicio es importante para nosotros, complete el perfil para poder recibir pedidos y realizar ofertas para subastas",
                    ],
                    turkish: [
                      "Hizmete katılan tüm katılımcıların güvenliği bizim için önemlidir, sipariş alabilmek ve açık artırma teklifinde bulunabilmek için lütfen profili doldurun",
                    ],
                    сhinese: [
                      "所有服务参与者的安全对我们都很重要，请填写个人资料，以便能够接受订单并提出拍卖报价",
                    ],
                    hindi: [
                      "सेवा के सभी प्रतिभागियों की सुरक्षा हमारे लिए महत्वपूर्ण है, ऑर्डर लेने और नीलामी के लिए प्रस्ताव देने में सक्षम होने के लिए कृपया प्रोफ़ाइल भरें",
                    ],
                  },
                  ""
                )
              : ""}
          </div>
        )}

        {user.user.role !== "driver" && (
          <NameSurNameFathersName
            setFormData={setFormData}
            formData={formData}
          />
        )}

        {!UserInfo.userInfo.phone && (
          <Phone setFormData={setFormData} formData={formData} />
        )}
        <Legal setFormData={setFormData} formData={formData} />
        {user.user.role === "customer" && (
          <TypeOfCustomer setFormData={setFormData} formData={formData} />
        )}
        <AdressComponent
          setFormData={setFormData}
          formData={formData}
          parent={"account"}
        />
        <Button
          disabled={
            (formData.legal.notValid && user.user.role !== "driver") ||
            (!UserInfo.userInfo.phone && formData.phone.notValid) ||
            formData.company_adress.notValid ||
            (formData.website.notValid &&
              !formData.website.isEmpty &&
              (formData.legal.value === "sole_trader" ||
                formData.legal.value === "entity")) ||
            (formData.company_name.notValid &&
              (formData.legal.value === "sole_trader" ||
                formData.legal.value === "entity")) ||
            (formData.company_inn.notValid &&
              (formData.legal.value === "sole_trader" ||
                formData.legal.value === "entity")) ||
            // ||
            // (formData.company_adress.notValid && (formData.legal.value === 'sole_trader' || formData.legal.value === 'entity'))
            // ||
            (formData.type_of_customer.notValid &&
              user.user.role === "customer") ||
            (formData.name_surname_fathersname.notValid &&
              user.user.role !== "driver") ||
            (formData.passport_number.notValid &&
              formData.legal.value === "person") ||
            (formData.passport_date_of_issue.notValid &&
              formData.legal.value === "person") ||
            (formData.passport_issued_by.notValid &&
              formData.legal.value === "person")
          }
          onClick={updateUserInfoAction}
        >
          {SetNativeTranslate(
            Translate.language,
            {
              russian: ["Сохранить"],
              english: ["Save"],
              spanish: ["Ahorrar"],
              turkish: ["Kaydetmek"],
              сhinese: ["节省"],
              hindi: ["बचाना"],
            },
            ""
          )}
        </Button>
      </div>
    );
  }
);

export default AccountCompletionForm;
