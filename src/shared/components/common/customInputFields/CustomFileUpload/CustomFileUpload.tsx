/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @rushstack/no-new-null */
// import React, { useState, ChangeEvent, useEffect, useRef } from "react";
// import styles from "./CustomFileUpload.module.scss";

// type FileUploadProps = {
//   accept?: string;
//   placeholder?: string;
//   value?: string; // Value to show previous file name (for edits)
//   onFileSelect?: (file: File | null) => void;
//   isValid?: boolean;
//   label?: string;
//   errMsg?: any;
// };

// const CustomFileUpload: React.FC<FileUploadProps> = ({
//   accept = "image/png,image/svg+xml",
//   placeholder = "Select a file...",
//   value = "", // Default to empty for new uploads
//   onFileSelect,
//   errMsg,
//   isValid,
//   label,
// }) => {
//   const [error, setError] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string>(value);
//   const [isFocused, setIsFocused] = useState(false); // New state for input focus

//   // Create a ref to reset the input field programmatically
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     // Update file name if the value prop changes (for edits)
//     if (value) {
//       setFileName(value);
//     }
//   }, [value]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0] || null;

//     if (file) {
//       const acceptedTypes = accept.split(",").map((type) => type.trim());
//       if (!acceptedTypes.includes(file.type)) {
//         setError(
//           `Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`
//         );
//         setFileName(value); // Reset to previous file name
//         onFileSelect?.(null);
//       } else {
//         setError(null);
//         setFileName(file.name);
//         onFileSelect?.(file);
//       }
//     } else {
//       setError(null);
//       setFileName(value); // Reset to previous file name
//       onFileSelect?.(null);
//     }
//   };

//   const handleClear = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.stopPropagation(); // Prevent the click event from triggering the file input
//     e.preventDefault();
//     setError(null);
//     setFileName(""); // Clear the file name
//     onFileSelect?.(null);
//     setIsFocused(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className={styles.fileUpload}>
//       {label?.trim() && <label className="inputLabels">{label}</label>}

//       <div
//         className={`${styles.inputWrapper} ${
//           fileName || isFocused ? styles.filled : ""
//         }`}
//       >
//         <input
//           type="file"
//           accept={accept}
//           onChange={handleFileChange}
//           className={styles.input}
//           ref={fileInputRef} // Attach the ref to the input
//           onFocus={() => setIsFocused(true)} // Set focus state
//           onBlur={() => setIsFocused(false)} // Reset focus state
//         />
//         <label className={styles.placeholder}>{placeholder}</label>
//         <div className={styles.fileName}>{fileName}</div>
//         {/* {fileName && value !== null && (
//           <button
//             type="button"
//             className={styles.clearBtn}
//             onClick={handleClear} // Prevent file input from opening
//           >
//             Clear
//           </button>
//         )} */}
//       </div>
//       {fileName && value !== null && (
//         <button
//           type="button"
//           className={styles.clearBtn}
//           onClick={handleClear} // Prevent file input from opening
//         >
//           Clear
//         </button>
//       )}
//       {error ? (
//         <div className={styles.error}>{error}</div>
//       ) : !isValid ? (
//         <div className={styles.error}>{errMsg}</div>
//       ) : null}
//       <div className={styles.acceptedInfo}>
//         Accepted files: {accept.replace(/,/g, ", ")}
//       </div>
//     </div>
//   );
// };

// export default CustomFileUpload;

import React from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import "../mainStyles.css";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

const { Dragger } = Upload;

interface CustomFileUploaderProps extends UploadProps {
  label?: string;
  hint?: string;
  icon?: React.ReactNode;
  isValid?: boolean;
  errorMsg?: string;
  labelLoading?: boolean;
  customReadOnly?: boolean;
  multiple?: boolean;
  maxCount?: number;
  value?: any; // maps to fileList
  isRequired?: boolean;
}

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({
  label,
  hint = "Upload files...",
  icon = <InboxOutlined />,
  isValid = true,
  errorMsg = "",
  labelLoading = false,
  customReadOnly = false,
  multiple = false,
  maxCount = 1,
  value,
  isRequired = false,
  ...rest
}) => {
  return (
    <div className="custom-uploader-wrapper">
      {label?.trim() && (
        <label className="inputLabels">
          {label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          <CustomTooltip
            text={
              value.length > 0
                ? value.map((file: any) => file.name).join(", ")
                : "-"
            }
            width="200px"
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <Dragger
          {...rest}
          // fileList={value}
          accept={rest?.accept}
          multiple={multiple}
          maxCount={maxCount}
          className={`custom-uploader ${!isValid ? "input-error" : ""}`}
        >
          <p className="ant-upload-drag-icon">{icon}</p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">{hint}</p>
        </Dragger>
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomFileUploader;
