/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "antd";
import CustomFileUploader from "../CustomFileUpload/CustomFileUpload";
import CustomCameraCaptureModal from "../CustomCameraCaptureModal/CustomCameraCaptureModal";

interface CustomCaptureOrUploadProps {
  label: string;
  value: any[];
  onChange: (updated: any[]) => void;
  isValid?: boolean;
  errorMsg?: string;
  customFileAccept?: any;
  customFileMultiple?: any;
  maxCount?: any;
  isRequired?: boolean;
}

const CustomCaptureOrUpload: React.FC<CustomCaptureOrUploadProps> = ({
  label,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  customFileAccept,
  customFileMultiple,
  maxCount,
  isRequired = false,
}) => {
  console.log("customFileMultiple: ", customFileMultiple);
  console.log("maxCount: ", maxCount);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleCapture = (image: { name: string; file: File }): void => {
    const newItem = {
      uid: `${Date.now()}`,
      name: image.name,
      url: URL.createObjectURL(image.file),
      originFileObj: image.file,
    };
    if (Array.isArray(value) && value?.length !== 0) {
      onChange([...value, newItem]);
    } else {
      onChange([newItem]);
    }
  };

  const handleUpload = (info: any): void => {
    onChange(info?.fileList || []);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "6px",
      }}
    >
      <label className="inputLabels">
        {label}
        {isRequired && <span className="requiredIcon">*</span>}
      </label>

      <Button size="small" type="dashed" onClick={() => setCameraOpen(true)}>
        Take Image
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            borderBottom: "1px dashed #d9d9d9",
          }}
        />
        <span
          style={{
            margin: "0 8px",
            fontSize: "12px",
            color: "#888",
            whiteSpace: "nowrap",
          }}
        >
          or
        </span>
        <div
          style={{
            flex: 1,
            borderBottom: "1px dashed #d9d9d9",
          }}
        />
      </div>

      <CustomFileUploader
        label="Upload Image"
        fileList={value}
        onChange={handleUpload}
        isValid={isValid}
        errorMsg={errorMsg}
        accept={customFileAccept}
        multiple={customFileMultiple}
        maxCount={maxCount}
        beforeUpload={(file) => {
          file.uid = `${Date.now()}-${file.name}`;
          return false;
        }}
      />

      <CustomCameraCaptureModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default CustomCaptureOrUpload;

/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { Button, message } from "antd"; // ✅ import message
// import CustomFileUploader from "../CustomFileUpload/CustomFileUpload";
// import CustomCameraCaptureModal from "../CustomCameraCaptureModal/CustomCameraCaptureModal";

// interface CustomCaptureOrUploadProps {
//   label: string;
//   value: any[];
//   onChange: (updated: any[]) => void;
//   isValid?: boolean;
//   errorMsg?: string;
//   customFileAccept?: any;
//   customFileMultiple?: any;
//   maxCount?: any;
// }

// const CustomCaptureOrUpload: React.FC<CustomCaptureOrUploadProps> = ({
//   label,
//   value,
//   onChange,
//   isValid = true,
//   errorMsg = "",
//   customFileAccept,
//   customFileMultiple,
//   maxCount,
// }) => {
//   const [cameraOpen, setCameraOpen] = useState(false);

//   const showDuplicateWarning = (fileName: string) => {
//     message.warning({
//       content: `Duplicate file detected: ${fileName}`,
//       key: "duplicate-file-warning", // ✅ ensures only one message at a time
//       duration: 2, // auto close after 2s
//     });
//   };

//   // utility function to check duplicate by name + size
//   const isDuplicate = (file: File): boolean => {
//     console.log("file: ", file);
//     return value?.some(
//       (item: any) =>
//         (item.name === file.name && item.size === file.size) ||
//         (item.originFileObj &&
//           item.originFileObj.name === file.name &&
//           item.originFileObj.size === file.size)
//     );
//   };

//   const handleCapture = (image: { name: string; file: File }): void => {
//     if (isDuplicate(image.file)) {
//       showDuplicateWarning(image.name);
//       return;
//     }

//     const newItem = {
//       uid: `${Date.now()}`,
//       name: image.name,
//       size: image.file.size,
//       url: URL.createObjectURL(image.file),
//       originFileObj: image.file,
//     };

//     if (Array.isArray(value) && value?.length !== 0) {
//       onChange([...value, newItem]);
//     } else {
//       onChange([newItem]);
//     }
//   };

//   const handleUpload = (info: any): void => {
//     const newFileList = info?.fileList?.filter((file: any) => {
//       if (isDuplicate(file.originFileObj || file)) {
//         showDuplicateWarning(file.name);
//         return false;
//       }
//       return true;
//     });

//     onChange(newFileList || []);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         alignItems: "flex-start",
//         justifyContent: "flex-start",
//         gap: "6px",
//       }}
//     >
//       <label className="inputLabels">{label}</label>

//       <Button size="small" type="dashed" onClick={() => setCameraOpen(true)}>
//         Take Image
//       </Button>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           width: "100%",
//         }}
//       >
//         <div style={{ flex: 1, borderBottom: "1px dashed #d9d9d9" }} />
//         <span
//           style={{
//             margin: "0 8px",
//             fontSize: "12px",
//             color: "#888",
//             whiteSpace: "nowrap",
//           }}
//         >
//           or
//         </span>
//         <div style={{ flex: 1, borderBottom: "1px dashed #d9d9d9" }} />
//       </div>

//       <CustomFileUploader
//         label="Upload Image"
//         fileList={value}
//         onChange={handleUpload}
//         isValid={isValid}
//         errorMsg={errorMsg}
//         accept={customFileAccept}
//         multiple={customFileMultiple}
//         maxCount={maxCount}
//         beforeUpload={(file) => {
//           if (isDuplicate(file)) {
//             showDuplicateWarning(file.name);
//             return "ignored";
//           }
//           file.uid = `${Date.now()}-${file.name}`;
//           return false; // prevent auto upload
//         }}
//       />

//       <CustomCameraCaptureModal
//         open={cameraOpen}
//         onClose={() => setCameraOpen(false)}
//         onCapture={handleCapture}
//       />
//     </div>
//   );
// };

// export default CustomCaptureOrUpload;
