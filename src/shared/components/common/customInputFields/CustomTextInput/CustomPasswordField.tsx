/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "antd";
import "../mainStyles.css";

// Omit the native 'size' property
interface CustomTextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  isValid?: boolean;
  passwordVisibility?: boolean; // Fix: Corrected prop name
  errorMsg?: string;
  Label?: string;
  setPasswordVisibility?: any;
}

const CustomPasswordField: React.FC<CustomTextInputProps> = ({
  placeholder,
  value = "",
  onChange,
  isValid = true,
  errorMsg = "",
  passwordVisibility = false,
  setPasswordVisibility,
  Label,
  ...rest
}) => {
  const [password, setPassword] = useState<string>(value as string);
  const [passwordVisible, setPasswordVisible] =
    useState<boolean>(passwordVisibility);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value); // Store actual password
    if (onChange) onChange(e); // Propagate changes
  };

  // Effect to sync visibility when `passwordVisibility` prop changes
  useEffect(() => {
    setPasswordVisible(passwordVisibility);
  }, [passwordVisibility]);

  return (
    <div className="custom-input-wrapper">
      {Label?.trim() && <label className="inputLabels">{Label}</label>}
      <Input.Password
        {...rest}
        autoFocus={rest.autoFocus ?? false}
        className={`custom-pwd-input ${!isValid ? "input-error" : ""}`}
        placeholder={placeholder}
        value={password}
        onChange={handleChange}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: (value: any) => {
            // console.log("value: ", value);
            setPasswordVisible?.(value);
            setPasswordVisibility?.(value);
          },
        }}
      />
      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomPasswordField;
