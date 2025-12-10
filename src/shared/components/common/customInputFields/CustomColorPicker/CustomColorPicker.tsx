/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./CustomColorPicker.module.scss";
import "../mainStyles.css";

interface CustomTextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  isValid?: boolean;
  errorMsg?: string;
  Label?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  width?: string | number;
  isRequired?: boolean;
}

const CustomColorPicker: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  Label = "",
  customReadOnly = false,
  isRequired = false,
  labelLoading,
  width,
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

      <div className={styles.colorPickerContainer}>
        <span className={styles.colorPickerLabel}>Color</span>
        <input
          {...rest}
          autoFocus={rest.autoFocus ?? false}
          type="color"
          value={value}
          onChange={onChange}
          className={styles.colorPickerInput}
        />
      </div>
    </div>
  );
};

export default CustomColorPicker;
