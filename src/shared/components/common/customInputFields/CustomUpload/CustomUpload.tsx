/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./CustomUpload.module.scss";

interface CustomUploadProps {
  onUpload?: any;
  Label?: string;
  multiple?: boolean;
  isRequired?: boolean;
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  onUpload,
  Label,
  multiple = false,
  isRequired = false,
}) => {
  const props = {
    accept: "application/*, image/*",
    beforeUpload: (file: File) => {
      onUpload?.(file);
      return false; // Prevent auto upload
    },
  };

  return (
    <div className={styles.uploadContainer}>
      <label className="inputLabels">
        {Label}
        {isRequired && <span className="requiredIcon">*</span>}
      </label>
      <Upload.Dragger {...props} className={styles.dragger} multiple={multiple}>
        <div className={styles.uploadContent}>
          <UploadOutlined className={styles.icon} />
          <p>Click or drag file to this area to upload</p>
          <Button type="primary" className={styles.browseButton}>
            Browse
          </Button>
        </div>
      </Upload.Dragger>
    </div>
  );
};

export default CustomUpload;
