import React, { useContext } from "react";
import { PartnerContext, TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Select } from "../../ui/form/Select";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const OrderForWho = ({ formData }) => {
  const { Translate } = useContext(TranslateContext);
  const { Partner } = useContext(PartnerContext);

  return (
    <>
      <Select
        value={formData.for_who.value}
        onChange={(e) => {
          formData.for_who.onChange(e);
          formData.for_group.setValue(undefined);
          formData.for_partner.setValue(undefined);
        }}
        onBlur={(e) => formData.for_who.onBlur(e)}
        multiple={false}
        name="for_who"
        id="for_who"
      >
        <option defaultValue value="all">
          {SetNativeTranslate(Translate.language, {}, "order_for_all")}
        </option>
        {Partner.groups.length > 0 ? (
          <option value="group">
            {SetNativeTranslate(Translate.language, {}, "order_for_group")}
          </option>
        ) : (
          <></>
        )}
        {Partner.partnerInfos.length > 0 ? (
          <option value="partner">
            {SetNativeTranslate(Translate.language, {}, "order_for_partner")}
          </option>
        ) : (
          <></>
        )}
      </Select>
      {formData.for_who.value === "group" ? (
        <VerticalContainer style={{ gap: "0px" }}>
          <Select
            multiple={false}
            value={formData.for_group.value}
            style={{
              borderLeft: formData.for_group.isEmpty
                ? " solid 1px rgb(254, 111, 103,0.8)"
                : "",
            }}
            onChange={(e) => {
              formData.for_group.onChange(e);
              formData.for_partner.setValue(undefined);
            }}
            onBlur={(e) => formData.for_group.onBlur(e)}
            name="for_group"
            id="for_group"
          >
            <option defaultValue hidden>
              {SetNativeTranslate(Translate.language, {}, "select_group")}
            </option>
            {Partner.groups.map((group) => (
              <option key={group.dataValues.id} value={group.dataValues.id}>
                {group.dataValues.name}
              </option>
            ))}
          </Select>
          <FieldName
            style={{
              fontWeight: "normal",
              color: "rgb(254, 111, 103,0.8)",
            }}
          >
            {formData.for_group.isEmpty && formData.for_group.isDirty
              ? SetNativeTranslate(
                  Translate.language,
                  {},
                  "select_group_validation"
                )
              : ""}
          </FieldName>
        </VerticalContainer>
      ) : (
        <></>
      )}
      {formData.for_who.value === "partner" ? (
        <VerticalContainer style={{ gap: "0px" }}>
          <Select
            multiple={false}
            value={formData.for_partner.value}
            style={{
              borderLeft: formData.for_partner.isEmpty
                ? " solid 1px rgb(254, 111, 103,0.8)"
                : "",
            }}
            onChange={(e) => {
              formData.for_partner.onChange(e);
              formData.for_group.setValue(undefined);
            }}
            onBlur={(e) => formData.for_partner.onBlur(e)}
            name="for_partner"
            id="for_partner"
          >
            <option defaultValue hidden>
              {SetNativeTranslate(Translate.language, {}, "select_partner")}
            </option>
            {Partner.partnerInfos.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.legal === "person" ? (
                  <>{partner.name_surname_fathersname}</>
                ) : (
                  <>{partner.company_name}</>
                )}
              </option>
            ))}
          </Select>
          <FieldName
            style={{
              fontWeight: "normal",
              color: "rgb(254, 111, 103,0.8)",
            }}
          >
            {formData.for_partner.isEmpty && formData.for_partner.isDirty
              ? SetNativeTranslate(
                  Translate.language,
                  {},
                  "select_partner_validation"
                )
              : ""}
          </FieldName>
        </VerticalContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderForWho;
