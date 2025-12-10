import * as React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import "../mainStyles.css";

interface CustomRadioGroupProps {
  options: string[];
  value?: string;
  onChange?: (e: RadioChangeEvent) => void;
  Label?: string;
  isValid?: boolean;
  errorMsg?: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  value,
  onChange,
  Label = "",
  isValid = true,
  errorMsg = "",
}) => {
  return (
    <div className="custom-input-wrapper">
      {Label?.trim() && <label className="radioLabel">{Label}</label>}
      <Radio.Group
        value={value}
        onChange={onChange}
        // className={!isValid ? "input-error" : ""}
      >
        {options.map((opt) => (
          <Radio key={opt} value={opt}>
            {opt}
          </Radio>
        ))}
      </Radio.Group>
      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomRadioGroup;
