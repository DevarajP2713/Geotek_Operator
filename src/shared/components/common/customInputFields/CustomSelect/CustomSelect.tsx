/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Select } from "antd";
import styles from "./CustomSelect.module.scss";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

interface CustomSelectProps {
  placeholder?: string;
  options: any;
  value?: string | any;
  isValid?: boolean;
  autoFocus?: boolean;
  errorMsg?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  onDeselect?: (value: string) => void;
  size?: "middle" | "small" | "large" | any;
  Label?: string;
  width?: string;
  mode?: "multiple" | "tags" | undefined;
  disabled?: boolean;
  readonly?: boolean;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  className?: any;
  isRequired?: boolean;
  showSearch?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  options,
  width,
  value,
  isValid = true,
  errorMsg,
  onChange,
  onSelect,
  onDeselect,
  size,
  autoFocus,
  Label,
  mode,
  disabled,
  readonly,
  labelLoading,
  className,
  showSearch = true,
  customReadOnly = false,
  isRequired = false,
  ...rest
}) => {
  // Find label for view mode
  const selectedLabel =
    options?.find((opt: any) => opt.value === value)?.label ?? value;

  return (
    <div className={styles.wrapper} style={{ width: width ?? "100%" }}>
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className={"readOnlyValue"}>
          <CustomTooltip
            text={selectedLabel || "-"}
            width={"200px"}
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <Select
          {...rest}
          showSearch={showSearch}
          mode={mode}
          disabled={disabled}
          className={`${styles.customSelect} ${className} ${
            isValid ? "" : styles.error
          }`}
          placeholder={placeholder}
          onChange={onChange}
          onSelect={onSelect}
          onDeselect={onDeselect}
          value={value || undefined}
          options={options}
          autoFocus={autoFocus || false}
          size={size || "middle"}
          maxTagCount="responsive"
          filterOption={(input: any, option: any) =>
            option?.label?.toLowerCase().includes(input.toLowerCase())
          }
        />
      )}

      {!isValid && !customReadOnly && (
        <span className={styles["error-message"]}>{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomSelect;
