import React, { useContext } from "react";
import logistics from "../../assets/logistics.webp";
import courier from "../../assets/courier.webp";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import { TranslateContext } from "../..";
import { observer } from "mobx-react-lite";
import { AdButton } from "../../components/ui/button/AdButton";

const BoardMainBanner = observer(({ addAdAction }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const target = queryParams.get("target");

  const { Translate } = useContext(TranslateContext);

  return (
    <div
      className="board_main_banner_container"
      style={{
        backgroundImage: `url(${target !== "courier" ? logistics : courier})`,
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
      }}
    >
      <div className="board_slogan">
        {SetNativeTranslate(Translate.language, {
          russian: ["Доска объявлений"],
          english: ["Bulletin board"],
          spanish: ["Tablón de anuncios"],
          turkish: ["Bülten tahtası"],
          сhinese: ["布告栏"],
          hindi: ["बुलेटिन बोर्ड"],
        })}
      </div>

      <AdButton
        onClick={() => {
          addAdAction();
        }}
      >
        {SetNativeTranslate(Translate.language, {
          russian: ["Добавить транспорт"],
          english: ["Add transport"],
          spanish: ["Añadir transporte"],
          turkish: ["Taşıma ekle"],
          сhinese: ["添加交通工具"],
          hindi: ["परिवहन जोड़ें"],
        })}
      </AdButton>
    </div>
  );
});

export default BoardMainBanner;
