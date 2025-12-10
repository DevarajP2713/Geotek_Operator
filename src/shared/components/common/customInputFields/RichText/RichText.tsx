/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichText.css";
import styles from "./RichText.module.scss";

interface IRichTextProps {
  value?: string;
  label?: string;
  isValid?: boolean;
  errorMsg?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  modules?: any;
  formats?: string[];
  className?: string;
  isRequired?: boolean;
}

const RichText = ({
  value = "",
  label = "",
  onChange,
  placeholder = "Start typing here...",
  readOnly = false,
  modules,
  formats,
  isValid,
  errorMsg,
  className = "customRichText",
  isRequired = false,
}: IRichTextProps): JSX.Element => {
  // const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState<string>(value);

  const defaultModules = {
    toolbar: [
      // [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const defaultFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "color",
  ];

  const handleChange = (html: string, delta: any, source: any, editor: any) => {
    setContent(html === "<p><br></p>" ? "" : html);
    onChange?.(html === "<p><br></p>" ? "" : html);
  };

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  return (
    <div className={styles.container}>
      <span className={styles.labelSec}>
        {label}
        {isRequired && <span className="requiredIcon">*</span>}
      </span>

      <ReactQuill
        // ref={quillRef}
        theme="snow"
        value={content}
        readOnly={readOnly}
        placeholder={placeholder}
        className={className}
        modules={modules || defaultModules}
        formats={formats || defaultFormats}
        onChange={handleChange}
      />

      {isValid && (
        <p
          className={styles.errorMsg}
          style={{
            textAlign: isValid ? "left" : "right",
          }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default RichText;
