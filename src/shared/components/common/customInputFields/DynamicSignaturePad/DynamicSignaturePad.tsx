import React, { useEffect, useState } from "react";
import CustomSignaturePad from "../CustomSignaturePad/CustomSignaturePad";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useIsTablet } from "../../../../hooks/UseIsTablet";
import { Button } from "antd";

interface DynamicSignaturePadProps {
  label?: string;
  value?: { isTab: boolean; value: string };
  onChange?: (val: { isTab: boolean; value: string }) => void;
  isValid?: boolean;
  errorMsg?: string;
  customReadOnly?: boolean;
  isTabView?: boolean;
  width?: string | number;
  height?: number;
  showClearBtn?: boolean;
}

const DynamicSignaturePad: React.FC<DynamicSignaturePadProps> = ({
  label = "",
  value = { isTab: false, value: "" },
  onChange,
  isValid = true,
  errorMsg = "",
  customReadOnly = false,
  width = "100%",
  height = 150,
  isTabView,
  showClearBtn = false,
}) => {
  console.log("value: ", value);
  const isTabHookValue = useIsTablet();

  // Manage internal view type state
  const [viewType, setViewType] = useState<boolean>(
    value?.isTab ?? isTabView ?? isTabHookValue
  );

  const handleChange = (val: string): void => {
    setViewType(isTabHookValue);
    onChange?.({ isTab: isTabHookValue, value: val });
  };

  const handleClear = (): void => {
    setViewType(isTabHookValue);
    onChange?.({ isTab: isTabHookValue, value: "" });
  };

  // Sync viewType state if value.isTab changes from outside
  // useEffect(() => {
  //   if (value?.isTab !== undefined && value?.isTab !== viewType) {
  //     setViewType(value.isTab);
  //   }
  // }, [value?.isTab, isTabHookValue]);

  // Sync viewType state if value.isTab changes from outside
  useEffect(() => {
    if (value?.isTab !== null && value?.isTab !== undefined) {
      if (value.isTab !== viewType) {
        setViewType(value.isTab);
      }
    } else if (viewType !== isTabHookValue) {
      setViewType(isTabHookValue);
    }
  }, [value?.isTab, isTabHookValue]);

  // Tablet view - Signature Pad
  if (viewType !== null ? viewType : isTabHookValue) {
    return (
      <div style={{ width, minWidth: "200px" }}>
        <CustomSignaturePad
          Label={label}
          value={value?.value || ""}
          onChange={handleChange}
          isValid={isValid}
          errorMsg={errorMsg}
          customReadOnly={customReadOnly}
          width={width}
          height={height}
        />
        {showClearBtn && (
          <Button
            type="dashed"
            onClick={handleClear}
            style={{
              marginTop: "8px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Clear
          </Button>
        )}
      </div>
    );
  }

  // Non-tablet view - Text input
  return (
    <div style={{ width }}>
      <CustomTextInput
        Label={label}
        value={value?.value || ""}
        onChange={(e) => handleChange(e.target.value)}
        isValid={isValid}
        errorMsg={errorMsg}
        customReadOnly={customReadOnly}
        placeholder={"Enter here"}
        width={width}
      />
      {showClearBtn && (
        <Button
          type="dashed"
          onClick={handleClear}
          style={{
            marginTop: "8px",
            padding: "4px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default DynamicSignaturePad;
