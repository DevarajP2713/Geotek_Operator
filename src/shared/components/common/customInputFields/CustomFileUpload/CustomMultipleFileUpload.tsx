/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable no-debugger */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import styles from "./CustomFileUpload.module.scss";
import { Clear } from "@mui/icons-material";

type FileUploadProps = {
  accept?: string;
  placeholder?: string;
  value?: string[]; // Pre-selected file names, useful for edits
  onFileSelect?: (files: File[] | null) => void;
  isValid?: boolean;
  errMsg?: string | null;
  multiple: boolean;
  customFileNameWidth?: string | any;
  selectedFilesMaxHeight?: string;
  selectedFilesMinHeight?: string;
  emptyFileMessage?: string;
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
};

const CustomMultipleFileUpload: React.FC<FileUploadProps> = ({
  accept,
  placeholder = "Select files...",
  value = [],
  onFileSelect,
  errMsg,
  isValid,
  multiple = false,
  customFileNameWidth,
  selectedFilesMaxHeight,
  selectedFilesMinHeight,
  emptyFileMessage,
  label,
  disabled,
  isRequired = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [fileNames, setFileNames] = useState<string[]>(
    value?.length ? value : []
  );
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle initial value from props
  useEffect(() => {
    if (value && value.length > 0) {
      setFileNames(value.map((item: any) => item?.name ?? item?.FileName));
      setSelectedFiles([...value]);
    } else {
      setFileNames([]);
      setSelectedFiles([]);
    }
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): any => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent): any => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    const processFiles = (files: File[]): any => {
      if (files.length > 0) {
        const acceptedTypes = accept?.split(",").map((type) => type.trim());
        const validFiles = files.filter((file) =>
          acceptedTypes?.some((type) =>
            type.endsWith("/*")
              ? file.type.startsWith(type.replace("/*", ""))
              : file.type === type
          )
        );

        if (validFiles.length !== files.length) {
          setError(`Only ${accept?.replace(/,/g, ", ")} files are allowed.`);
          return;
        }

        setError(null);
        const updatedFiles = multiple
          ? [...selectedFiles, ...validFiles]
          : validFiles;

        setSelectedFiles(updatedFiles);
        setFileNames(updatedFiles?.map((file) => file.name) || []);
        onFileSelect?.(updatedFiles);
      }
      setDragging(false);
    };

    const handlePaste = (e: ClipboardEvent): any => {
      if (!isCtrlPressed) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i]?.kind === "file") {
          const file = items[i].getAsFile();
          if (file) {
            const originalName = file.name;
            let newName = originalName;
            let count = 1;

            // Check for duplicates and increment name if necessary
            while (fileNames?.includes(newName)) {
              const nameWithoutExtension = originalName?.replace(
                /\.[^/.]+$/,
                ""
              ); // Remove extension
              const extension = originalName?.slice(
                originalName.lastIndexOf(".")
              );
              newName = `${nameWithoutExtension}(${count})${extension}`;
              count++;
            }

            // Create a new file with the updated name
            const renamedFile = new File([file], newName, { type: file.type });
            files.push(renamedFile);
          }
        }
      }
      processFiles(files);
    };

    // Attach global event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("paste", handlePaste);
    };
  }, [isCtrlPressed, fileNames?.length]);

  const processFiles = (files: File[]): any => {
    if (files.length > 0) {
      const acceptedTypes = accept?.split(",").map((type) => type.trim());
      const validFiles = files.filter((file) =>
        acceptedTypes?.some((type) =>
          type.endsWith("/*")
            ? file.type.startsWith(type.replace("/*", ""))
            : file.type === type
        )
      );

      if (validFiles.length !== files.length) {
        setError(`Only ${accept?.replace(/,/g, ", ")} files are allowed.`);
        return;
      }

      setError(null);
      const updatedFiles = multiple
        ? [...selectedFiles, ...validFiles]
        : validFiles;

      setSelectedFiles(updatedFiles);
      setFileNames(updatedFiles?.map((file) => file.name) || []);
      onFileSelect?.(updatedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    processFiles(files);
    setDragging(false);
  };

  const handleRemove = (index: number): any => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setFileNames(updatedFiles?.map((file) => file.name) || []);
    onFileSelect?.(updatedFiles);
    setDragging(false);
  };

  const handleClear = (): any => {
    setSelectedFiles([]);
    setFileNames([]);
    setError(null);
    onFileSelect?.(null);
    setDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragHightlight = (): void => {
    setDragging(true);
  };
  const handleDragLeave = (): void => {
    setDragging(false);
  };

  return (
    <div className={styles.fileUpload}>
      {label?.trim() && (
        <label className="inputLabels">
          {label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      <div
        className={`${styles.inputWrapper} `}
        style={{
          display: disabled ? "none" : "flex",
          border: !dragging ? `2px solid transparent` : `2px dashed #adadad`,
          backgroundColor: !dragging ? `#fff` : `#adadad10`,
        }}
        onDragEnter={handleDragHightlight}
        onDragOver={handleDragHightlight}
        onDragLeave={handleDragLeave}
        onDrag={handleDragHightlight}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className={styles.input}
          ref={fileInputRef}
        />
        <label className={styles.placeholder}>{placeholder}</label>
      </div>

      {
        error ? (
          <div className={styles.error}>{error}</div>
        ) : !isValid ? (
          <div className={styles.error}>{errMsg}</div>
        ) : null
        // <div className={styles.acceptedInfo}>
        //   Accepted files: {accept?.replace(/,/g, ", ")}
        // </div>
      }

      {disabled
        ? selectedFiles?.length > 0 && (
            <div
              className={styles.fileNameAlign}
              style={{
                minHeight: selectedFilesMinHeight ?? selectedFilesMinHeight,
                maxHeight: selectedFilesMaxHeight ?? selectedFilesMaxHeight,
              }}
            >
              {selectedFiles?.map((fileName: any, idx: number) => (
                <div key={idx}>
                  <span
                    title={fileName?.name}
                    style={{
                      maxWidth: customFileNameWidth ?? "90%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open(fileName?.FileRef, "_blank");
                    }}
                  >
                    {fileName?.name}
                  </span>
                </div>
              ))}
            </div>
          )
        : fileNames?.length > 0 && (
            <div
              className={styles.fileNameAlign}
              style={{
                minHeight: selectedFilesMinHeight ?? selectedFilesMinHeight,
                maxHeight: selectedFilesMaxHeight ?? selectedFilesMaxHeight,
              }}
            >
              {fileNames?.map((fileName: any, idx: number) => (
                <div key={idx}>
                  <span
                    title={fileName?.name ? fileName?.name : fileName}
                    style={{
                      maxWidth: customFileNameWidth ?? "90%",
                    }}
                  >
                    {fileName?.name ? fileName?.name : fileName}
                  </span>
                  <div>
                    <Clear
                      onClick={async () => {
                        await handleRemove(idx);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

      {fileNames?.length === 0 && emptyFileMessage && (
        <span className={styles.emptyFileMsg}>{emptyFileMessage}</span>
      )}

      {fileNames?.length > 0 && !disabled && (
        <button type="button" className={styles.clearBtn} onClick={handleClear}>
          Clear all
        </button>
      )}
    </div>
  );
};

export default CustomMultipleFileUpload;
