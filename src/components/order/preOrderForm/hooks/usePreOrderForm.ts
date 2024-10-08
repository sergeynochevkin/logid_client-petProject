import { ChangeEvent, useContext, useEffect, useState } from "react";
//@ts-ignore
import {
  AdressContext,
  TranslateContext,
  SettingContext,
  UserContext,
  ComponentFunctionContext,
  //@ts-ignore
} from "../../../..";
//@ts-ignore
import { SetNativeTranslate } from "../../../../modules/SetNativeTranslate";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { MAIN_ORDER_ROUTE } from "../../../../utils/consts";
import { PreOrderData } from "../types";

export const usePreOrderForm = () => {
  const initialValue = {
    point_1: {
      value: "",
      isDirty: false,
      isEmptyError: true,
      errorMessage: "",
      lat: undefined,
      lng: undefined,
    },

    point_2: {
      value: "",
      isDirty: false,
      isEmptyError: true,
      errorMessage: "",
      lat: undefined,
      lng: undefined,
    },
    type: "car",
  };

  const [test, setTest] = useState("");

  const [preOrder, setPreOrder] = useState<PreOrderData>({ ...initialValue });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { Adress } = useContext(AdressContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  //@ts-ignore
  const { ComponentFunction } = useContext(ComponentFunctionContext);

  const [autocomplete] = useState({
    point_1: {},
    point_2: {},
  });
  //@ts-ignore
  function initAutocomplete(id: string) {
    if (Adress.country) {
      //eslint-disable-next-line no-undef
      let autocompleteItem = new google.maps.places.Autocomplete(
        //@ts-ignore
        document.getElementById(id),
        {
          bounds: Setting.bounds,
          strictBounds: true,
          types: ["geocode"],
          componentRestrictions: {
            country: [`${Adress.country.google_code}`],
          },
          fields: ["geometry", "address_components", "name"],
          language: Adress.country.google_language,
        }
      );
      autocompleteItem.addListener("place_changed", () => onPlaceChanged(id));
      //@ts-ignore
      autocomplete[id] = autocompleteItem;
    }
  }

  function onPlaceChanged(id: string) {
    //@ts-ignore
    var place = autocomplete[id].getPlace();
    //@ts-ignore
    if (!place.geometry) {
      //@ts-ignore
      document.getElementById(id).placeholder = SetNativeTranslate(
        Translate.language,
        {},
        "enter_place"
      );
    } else {
      let data = { ...preOrder };
      //@ts-ignore
      data[id].value = place.name;
      //@ts-ignore
      data[id].isDirty = true;
      //@ts-ignore
      data[id].isEmptyError = false;
      //@ts-ignore
      data[id].lat = place.geometry.location.lat();
      //@ts-ignore
      data[id].lng = place.geometry.location.lng();
      setPreOrder(data);
      //@ts-ignore
    }
  }

  const toOrderForm = () => {
    delete preOrder.point_1.isDirty;
    delete preOrder.point_1.isEmptyError;
    delete preOrder.point_1.errorMessage;
    delete preOrder.point_2.isDirty;
    delete preOrder.point_2.isEmptyError;
    delete preOrder.point_2.errorMessage;
    const from = Object.keys(preOrder.point_1)
      //@ts-ignore
      .map((key) => "from_" + key + "=" + preOrder.point_1[key])
      .join("&&");
    const to = Object.keys(preOrder.point_2)
      //@ts-ignore
      .map((key) => "to_" + key + "=" + preOrder.point_2[key])
      .join("&&");
    const params = from + "&&" + to + "&&type=" + preOrder.type;
    setPreOrder({ ...initialValue });
    navigate(`${MAIN_ORDER_ROUTE}?${params}`);
  };

  const dataReset = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setPreOrder({
      ...preOrder,
      //@ts-ignore
      [id]: {
        value: e.target.value,
        isDirty: true,
        isEmptyError: true,
        errorMessage: "",
        lat: undefined,
        lng: undefined,
      },
    });
  };

  useEffect(() => {
    if (!user.isAuth) {
      Setting.setBoundsLimit(0.5);
      Setting.setBounds({
        north: Setting.center.lat + parseFloat(Setting.bounds_limit),
        south: Setting.center.lat - parseFloat(Setting.bounds_limit),
        east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
        west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
      });
    }
  }, []);

  useEffect(() => {
    if (!user.isAuth) {
      const regex = new RegExp("[0-9]");
      if (
        preOrder.point_1.value.length > 4 &&
        regex.test(preOrder.point_1.value) &&
        Object.keys(autocomplete.point_1).length === 0
      ) {
        initAutocomplete("point_1");
        //@ts-ignore
        document.querySelector("#point_1").blur();
        setTimeout(() => {
          //@ts-ignore
          document.querySelector("#point_1").focus();
        }, 100);
      }
      if (
        preOrder.point_2.value.length > 4 &&
        regex.test(preOrder.point_2.value) &&
        Object.keys(autocomplete.point_2).length === 0
      ) {
        initAutocomplete("point_2");
        //@ts-ignore
        document.querySelector("#point_2").blur();
        setTimeout(() => {
          //@ts-ignore
          document.querySelector("#point_2").focus();
        }, 100);
      }
    }
  }, [preOrder.point_1.value, preOrder.point_2.value]);

  useEffect(() => {
    setDisabled(!(preOrder.point_1.lat && preOrder.point_2.lat));
  }, [preOrder.point_1.lat, preOrder.point_2.lat, location.pathname]);

  return {
    preOrder,
    toOrderForm,
    disabled,
    dataReset,
    setPreOrder,
    Translate,
  };
};
