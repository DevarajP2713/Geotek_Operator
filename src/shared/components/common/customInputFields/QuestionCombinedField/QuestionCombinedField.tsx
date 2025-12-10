import * as React from "react";
import CustomMultiText from "../CustomMultiText/CustomMultiText";
import CustomRadioGroup from "../CustomRadioGroup/CustomRadioGroup";

interface QuestionCombinedFieldProps {
  questionLabel: string;
  sectionTitle?: string;
  placeholder?: string;
  options?: string[]; // e.g., ["Yes", "No"]
  radioValue: string;
  onRadioChange: (value: string) => void;
  textValue: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showTextBox?: boolean;
  isValid?: boolean;
  errorMsg?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  hideRadio?: boolean;
  enableNoAnswer?: boolean;
}

const QuestionCombinedField: React.FC<QuestionCombinedFieldProps> = ({
  sectionTitle,
  questionLabel,
  placeholder = "Please enter details here...",
  options = ["Yes", "No"],
  radioValue,
  onRadioChange,
  textValue,
  onTextChange,
  showTextBox,
  isValid = true,
  errorMsg = "",
  customReadOnly = false,
  labelLoading = false,
  hideRadio = false,
  enableNoAnswer = false,
}) => {
  const shouldShowText = showTextBox ?? radioValue === "Yes";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      {/* Optional section title */}
      {sectionTitle && (
        <h4 style={{ margin: "0 0 4px 0", fontWeight: 600 }}>{sectionTitle}</h4>
      )}

      {!hideRadio && (
        <CustomRadioGroup
          Label={questionLabel}
          options={options}
          value={radioValue}
          onChange={(e) => onRadioChange(e.target.value)}
          isValid={isValid}
          // errorMsg={errorMsg}
          //   helperText={helperText}
        />
      )}

      <CustomMultiText
        placeholder={placeholder}
        isValid={isValid}
        errorMsg={errorMsg}
        value={textValue}
        onChange={onTextChange}
        disabled={enableNoAnswer ? false : !shouldShowText}
        customReadOnly={customReadOnly}
        labelLoading={labelLoading}
        draggable={false}
      />
    </div>
  );
};

export default QuestionCombinedField;
