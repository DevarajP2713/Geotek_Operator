/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Input } from "antd";
import "../mainStyles.css";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

interface CustomTextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  isValid?: boolean;
  errorMsg?: string;
  Label?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  width?: string | number;
  size?: "large" | "middle" | "small";
  isRequired?: boolean;
  prefix?: any;
  suffix?: any;
  flexDirection?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  Label = "",
  customReadOnly = false,
  labelLoading,
  width,
  size,
  isRequired = false,
  prefix,
  suffix,
  flexDirection = true,
  ...rest
}) => {
  return (
    <div className="custom-input-wrapper" style={{ width: width ?? "100%" }}>
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          {/* {value} */}
          <CustomTooltip
            text={value || "-"}
            width={"200px"}
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <Input
          {...rest}
          size={size}
          autoFocus={rest.autoFocus ?? false}
          style={{ flexDirection: flexDirection ? "column" : "row" }}
          className={`custom-input ${!isValid ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          prefix={prefix}
          suffix={suffix}
        />
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomTextInput;
