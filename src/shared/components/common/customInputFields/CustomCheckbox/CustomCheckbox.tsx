/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Checkbox } from "antd";
import "../mainStyles.css";

interface ICustomCheckboxProps {
  Label?: string;
  value?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const CustomCheckbox: React.FC<ICustomCheckboxProps> = ({
  Label,
  value,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="custom-input-wrapper">
      <Checkbox disabled={disabled} checked={value} onChange={onChange}>
        {Label}
      </Checkbox>
    </div>
  );
};

export default CustomCheckbox;
