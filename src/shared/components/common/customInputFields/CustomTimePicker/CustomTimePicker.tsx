/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-new-null */
import * as React from "react";
import { TimePicker } from "antd";
import type { TimePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import "../mainStyles.css";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

interface CustomTimePickerProps
  extends Omit<TimePickerProps, "value" | "onChange" | "size"> {
  isValid?: boolean;
  errorMsg?: string;
  Label?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  width?: string | number;
  value?: Dayjs | null;
  onChange?: (time: Dayjs | null, timeString: string) => void;
  isRequired?: boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  placeholder,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  Label = "",
  customReadOnly = false,
  labelLoading = false,
  width = "100%",
  format = "HH:mm:ss",
  isRequired = false,
  ...rest
}) => {
  // Helper to handle Dayjs -> any for AntD compatibility
  const handleChange = (time: any, timeString: string): void => {
    if (onChange) {
      onChange(time as Dayjs | null, timeString);
    }
  };

  return (
    <div className="custom-input-wrapper" style={{ width }}>
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          <CustomTooltip
            text={value ? value.format(format as any) : "-"}
            width="200px"
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <TimePicker
          {...rest}
          format={format}
          className={`custom-input ${!isValid ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value as any} // cast Dayjs to any for compatibility
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomTimePicker;
