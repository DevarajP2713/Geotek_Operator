import * as React from "react";
import { Input } from "antd";
import "../mainStyles.css";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

interface CustomMultiTextProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  isValid?: boolean;
  errorMsg?: string;
  customWrapperClass?: string;
  Label?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  size?: "large" | "middle" | "small";
  isRequired?: boolean;
}

const CustomMultiText: React.FC<CustomMultiTextProps> = ({
  placeholder,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  Label = "",
  customReadOnly = false,
  labelLoading,
  size,
  customWrapperClass,
  isRequired = false,
  ...rest
}) => {
  return (
    <div className={`${customWrapperClass} custom-input-wrapper`}>
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          <CustomTooltip
            text={value || "-"}
            width={"200px"}
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <Input.TextArea
          {...rest}
          size={size}
          autoFocus={rest.autoFocus ?? false}
          className={`custom-input ${!isValid ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={4}
        />
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomMultiText;
