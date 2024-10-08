import React, { useContext } from "react";
import { TranslateContext } from "../../..";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { Input } from "../../ui/form/Input";
import { FieldName } from "../../ui/page/FieldName";
import { VerticalContainer } from "../../ui/page/VerticalContainer";

const Email = ({ authFormData }) => {
  const { Translate } = useContext(TranslateContext);

  return (
    <VerticalContainer style={{ gap: "0px" }}>
      <Input
        placeholder={SetNativeTranslate(Translate.language, {}, "your_email")}
        value={authFormData.email.value}
        style={{
          borderLeft:
            authFormData.email.notValid || authFormData.email.isEmpty
              ? " solid 1px rgb(254, 111, 103,0.8)"
              : "",
        }}
        onChange={(e) => authFormData.email.onChange(e)}
        onBlur={(e) => authFormData.email.onBlur(e)}
        type="text"
        name="email"
      ></Input>
      <FieldName
        style={{
          fontWeight: "normal",
          color: "rgb(254, 111, 103,0.8)",
        }}
      >
        {(authFormData.email.isEmpty && authFormData.email.isDirty) ||
        authFormData.email.minLengthError ||
        authFormData.email.maxLengthError ||
        authFormData.email.formatError
          ? authFormData.email.errorMessage
          : ""}
      </FieldName>
    </VerticalContainer>
  );
};

export default Email;
