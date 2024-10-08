import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AdressContext, SettingContext, TranslateContext } from "../..";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import CountrySelectorItem from "../nav/CountrySelectorItem";

const CountrySelector = observer(({ name, setModalActive }) => {
  const { Adress } = useContext(AdressContext);
  const { Translate } = useContext(TranslateContext);
  const { Setting } = useContext(SettingContext);

  return (
    <div
      className={
        Setting.app_theme === "light"
          ? "country_selector_container"
          : "country_selector_container dark"
      }
    >
      <div className="country_selector_name">
        {!name
          ? SetNativeTranslate(Translate.language, {
              russian: [
                "Мы не смогли определить вашу страну, пожалуйста выберите ее из списка",
              ],
              english: [
                "We could not determine your country, please select it from the list",
              ],
              spanish: [
                "No pudimos determinar su país, selecciónelo de la lista",
              ],
              turkish: ["Ülkenizi belirleyemedik, lütfen listeden seçin"],
              сhinese: [
                "Мы не смогли определить вашу страну, пожалуйста выберите ее из списка",
              ],
              hindi: [
                "मेरे पास एक साधारण व्यवसाय है, एक छोटा सा छोटा सा टुकड़ा है",
              ],
            })
          : name}
      </div>
      <div className="country_selector_countries_container">
        {Adress.countries.map((country) => (
          <CountrySelectorItem
            country={country}
            setModalActive={setModalActive}
            key={country.id}
          />
        ))}
      </div>
    </div>
  );
});

export default CountrySelector;
