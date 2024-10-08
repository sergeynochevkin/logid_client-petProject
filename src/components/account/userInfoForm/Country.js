import React, { useContext } from "react";
import { AdressContext, TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Select } from "../../ui/form/Select";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const Country = ({ formData }) => {
  const { Adress } = useContext(AdressContext);
  const { Translate } = useContext(TranslateContext);

  return (
    <VerticalContainer style={{ gap: "0px" }}>
      <Select
        defaultValue={formData.country.value}
        name="country"
        id="country"
        onChange={(e) => {
          formData.country.onChange(e);
          Adress.setCountry(
            Adress.countries.find((el) => el.value === e.target.value)
          );
        }}
        onBlur={(e) => formData.country.onBlur(e)}
      >
        <option value={Adress.country.value}>
          {SetNativeTranslate(Translate.language, {}, Adress.country.value)}
        </option>
        {Adress.countries
          .filter(
            (el) =>
              el.value !== Adress.country.value &&
              el.sector === Adress.country.sector
          )
          .map((country) => (
            <option value={country.value} key={country.id}>
              {SetNativeTranslate(Translate.language, {}, country.value)}
            </option>
          ))}
      </Select>
      <FieldName
        style={{
          fontWeight: "normal",
          color: "rgb(254, 111, 103,0.8)",
        }}
      ></FieldName>
    </VerticalContainer>
  );
};

export default Country;
