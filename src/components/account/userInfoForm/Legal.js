import React, { useContext } from "react";
import { TranslateContext, UserContext, UserInfoContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Select } from "../../ui/form/Select";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";
import CompanyINN from "./CompanyINN";
import CompanyName from "./CompanyName";
import CompanyWebSite from "./CompanyWebSite";
import PassportDateOfIssue from "./PassportDateOfIssue";
import PassportIssuedBy from "./PassportIssuedBy";
import PassportNumber from "./PassportNumber";

const Legal = ({ formData, setFormData }) => {
  const { UserInfo } = useContext(UserInfoContext);
  const { Translate } = useContext(TranslateContext);
  const { user } = useContext(UserContext);

  return (
    <VerticalContainer>
      <VerticalContainer style={{ gap: "0px" }}>
        <Select
          value={formData.legal.value}
          onChange={(e) => formData.legal.onChange(e)}
          onBlur={(e) => formData.legal.onBlur(e)}
          name="legal"
          id="legal"
          style={{
            borderLeft: formData.legal.isEmpty
              ? "solid 1px rgb(254, 111, 103,0.8)"
              : "",
          }}
        >
          <option defaultValue hidden>
            {SetNativeTranslate(Translate.language, {}, "legal_place_holder")}
          </option>
          <option value="person">
            {SetNativeTranslate(Translate.language, {}, "person")}
          </option>
          <option value="sole_trader">
            {SetNativeTranslate(Translate.language, {}, "sole_trader")}
          </option>
          <option value="entity">
            {SetNativeTranslate(Translate.language, {}, "entity")}
          </option>
        </Select>
        <FieldName
          style={{
            fontWeight: "normal",
            color: "rgb(254, 111, 103,0.8)",
          }}
        >
          {formData.legal.isEmpty && formData.legal.isDirty
            ? SetNativeTranslate(Translate.language, {}, "choose_legal_form")
            : ""}
        </FieldName>
      </VerticalContainer>
      {formData.legal.value === "sole_trader" ||
      (formData.legal.value === "entity" &&
        formData.legal.value !== UserInfo.userInfo.legal) ? (
        <>
          <CompanyName setFormData={setFormData} formData={formData} />
          <CompanyWebSite setFormData={setFormData} formData={formData} />
          <CompanyINN setFormData={setFormData} formData={formData} />
        </>
      ) : (
        <></>
      )}

      {formData.legal.value === "person" &&
      formData.legal.value !== UserInfo.userInfo.legal ? (
        <>
          <PassportNumber setFormData={setFormData} formData={formData} />
          <PassportDateOfIssue setFormData={setFormData} formData={formData} />
          <PassportIssuedBy setFormData={setFormData} formData={formData} />
        </>
      ) : (
        <></>
      )}

      {formData.legal.value === "person" &&
      user.user.role === "driver" &&
      !UserInfo.userInfo.passport_number ? (
        <>
          <PassportNumber setFormData={setFormData} formData={formData} />
          <PassportDateOfIssue setFormData={setFormData} formData={formData} />
          <PassportIssuedBy setFormData={setFormData} formData={formData} />
        </>
      ) : (
        <></>
      )}
    </VerticalContainer>
  );
};

export default Legal;
