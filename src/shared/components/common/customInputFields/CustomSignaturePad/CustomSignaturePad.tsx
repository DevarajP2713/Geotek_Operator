// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useRef, useEffect } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "../mainStyles.css";
// import { Button } from "antd";

// interface CustomSignaturePadProps {
//   Label?: string;
//   value?: string; // base64 value for preview
//   onChange?: (base64: string) => void;
//   isValid?: boolean;
//   errorMsg?: string;
//   customReadOnly?: boolean;
//   labelLoading?: boolean;
//   width?: string | number;
//   height?: number;
// }

// const CustomSignaturePad: React.FC<CustomSignaturePadProps> = ({
//   Label = "",
//   value,
//   onChange,
//   isValid = true,
//   errorMsg = "",
//   customReadOnly = false,
//   labelLoading,
//   width = "100%",
//   height = 150,
// }) => {
//   console.log("value: ", value);
//   const sigCanvasRef = useRef<SignatureCanvas | null>(null);

//   const clearSignature = (): void => {
//     sigCanvasRef.current?.clear();
//     onChange?.("");
//   };

//   const didDrawRef = useRef(false);
//   const handleEnd = (): void => {
//     const base64 = sigCanvasRef.current?.toDataURL("image/png") || "";
//     didDrawRef.current = true;
//     onChange?.(base64);
//   };

//   useEffect(() => {
//     const canvas = sigCanvasRef.current;

//     if (!canvas || customReadOnly) return;

//     if (didDrawRef.current) {
//       didDrawRef.current = false;
//       return;
//     }

//     canvas.clear();

//     if (value) {
//       try {
//         canvas.fromDataURL(value);
//       } catch (err) {
//         console.log("Invalid base64 or failed to load signature", err);
//       }
//     }
//   }, [value, customReadOnly]);

//   useEffect(() => {
//     const canvas = sigCanvasRef.current;
//     if (!canvas || customReadOnly || value) return;
//     canvas.clear();
//   }, []);

//   return (
//     <div className="custom-input-wrapper" style={{ width }}>
//       {Label?.trim() && <label className="inputLabels">{Label}</label>}

//       {customReadOnly ? (
//         <div className="readOnlyValue">
//           {value && (
//             <img
//               src={value}
//               alt="Digital Signature"
//               style={{
//                 width: "100%",
//                 height,
//                 objectFit: "contain",
//                 border: "1px solid #d9d9d9",
//                 borderRadius: "6px",
//               }}
//             />
//           )}
//         </div>
//       ) : (
//         <>
//           <div
//             style={{
//               borderRadius: "4px",
//               width: "100%",
//               height,
//               overflow: "hidden",
//             }}
//           >
//             <SignatureCanvas
//               ref={sigCanvasRef}
//               penColor="black"
//               canvasProps={{
//                 width: width || "100%",
//                 height: height,
//                 className: "signature-canvas",
//                 style: {
//                   border:
//                     !isValid && errorMsg
//                       ? "1px solid #ff4d4f"
//                       : "1px solid #6273a270",
//                 },
//               }}
//               onEnd={handleEnd}
//             />
//           </div>
//           <Button
//             type="dashed"
//             onClick={clearSignature}
//             style={{
//               marginTop: "8px",
//               padding: "4px 8px",
//               fontSize: "12px",
//               cursor: "pointer",
//             }}
//           >
//             Clear
//           </Button>
//         </>
//       )}

//       {!isValid && errorMsg && (
//         <span className="error-message">{errorMsg}</span>
//       )}
//     </div>
//   );
// };

// export default CustomSignaturePad;

// version 2
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "../mainStyles.css";
import { Button } from "antd";

interface CustomSignaturePadProps {
  Label?: string;
  value?: string; // base64 value for preview
  onChange?: (base64: string) => void;
  isValid?: boolean;
  errorMsg?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  isRequired?: boolean;
  width?: string | number;
  height?: number;
}

const CustomSignaturePad: React.FC<CustomSignaturePadProps> = ({
  Label = "",
  value,
  isRequired = false,
  onChange,
  isValid = true,
  errorMsg = "",
  customReadOnly = false,
  labelLoading,
  width = "100%",
  height = 150,
}) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<any>(width);
  console.log("canvasWidth: ", canvasWidth);

  const clearSignature = (): void => {
    sigCanvasRef.current?.clear();
    onChange?.("");
  };

  const didDrawRef = useRef(false);
  const handleEnd = (): void => {
    const base64 = sigCanvasRef.current?.toDataURL("image/png") || "";
    didDrawRef.current = true;
    onChange?.(base64);
  };

  // Set canvas width based on wrapper size
  useEffect(() => {
    if (wrapperRef.current) {
      setCanvasWidth(wrapperRef.current.clientWidth);
    }
  }, []);

  // Handle window resize to recalculate width
  useEffect(() => {
    const resizeHandler = (): any => {
      if (wrapperRef.current) {
        setCanvasWidth(wrapperRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [canvasWidth]);

  useEffect(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas || customReadOnly) return;

    if (didDrawRef.current) {
      didDrawRef.current = false;
      return;
    }

    canvas.clear();

    if (value) {
      try {
        canvas.fromDataURL(value);
      } catch (err) {
        console.log("Invalid base64 or failed to load signature", err);
      }
    }
  }, [value, customReadOnly, canvasWidth]);

  useEffect(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas || customReadOnly || value) return;
    canvas.clear();
  }, []);

  return (
    <div
      className="custom-input-wrapper"
      style={{ width, maxWidth: "504px" }}
      ref={wrapperRef}
    >
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}

          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          {value && (
            <img
              src={value}
              alt="Digital Signature"
              style={{
                width: "100%",
                height,
                objectFit: "contain",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
              }}
            />
          )}
        </div>
      ) : (
        <>
          <div
            style={{
              borderRadius: "4px",
              width: "100%",
              height,
              overflow: "hidden",
            }}
          >
            {/* {canvasWidth > 0 && ( */}
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor="black"
              canvasProps={{
                width: canvasWidth || 504,
                height,
                className: "signature-canvas",
                style: {
                  border:
                    !isValid && errorMsg
                      ? "1px solid #ff4d4f"
                      : "1px solid #6273a270",
                  width: "100%", // visual width
                  height,
                },
              }}
              onEnd={handleEnd}
            />
            {/* )} */}
          </div>
          <Button
            type="dashed"
            onClick={clearSignature}
            style={{
              marginTop: "8px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Clear
          </Button>
        </>
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomSignaturePad;

// version 3
// import React, { useRef, useEffect, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "../mainStyles.css";
// import { Button } from "antd";

// interface CustomSignaturePadProps {
//   Label?: string;
//   value?: string; // base64 value for preview
//   onChange?: (base64: string) => void;
//   isValid?: boolean;
//   errorMsg?: string;
//   customReadOnly?: boolean;
//   labelLoading?: boolean;
//   width?: string | number;
//   height?: number;
// }

// const CustomSignaturePad: React.FC<CustomSignaturePadProps> = ({
//   Label = "",
//   value,
//   onChange,
//   isValid = true,
//   errorMsg = "",
//   customReadOnly = false,
//   labelLoading,
//   width = "100%",
//   height = 150,
// }) => {
//   const sigCanvasRef = useRef<SignatureCanvas | null>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [canvasWidth, setCanvasWidth] = useState<number>(0);

//   const clearSignature = (): void => {
//     sigCanvasRef.current?.clear();
//     onChange?.("");
//   };

//   const handleEnd = (): void => {
//     const base64 = sigCanvasRef.current?.toDataURL("image/png") || "";
//     onChange?.(base64);
//   };

//   // Update canvas width with ResizeObserver for reliable measurement
//   useEffect(() => {
//     if (!wrapperRef.current) return;

//     const updateWidth = (): any => {
//       if (wrapperRef.current) {
//         setCanvasWidth(wrapperRef.current.clientWidth);
//       }
//     };

//     // Initial measure after paint
//     requestAnimationFrame(updateWidth);

//     const observer = new ResizeObserver(updateWidth);
//     observer.observe(wrapperRef.current);

//     return () => observer.disconnect();
//   }, []);

//   // Redraw or clear signature when value, read-only, or width changes
//   useEffect(() => {
//     const canvas = sigCanvasRef.current;
//     if (!canvas || customReadOnly) return;

//     canvas.clear();
//     if (value) {
//       try {
//         canvas.fromDataURL(value);
//       } catch (err) {
//         console.log("Invalid base64 or failed to load signature", err);
//       }
//     }
//   }, [value, customReadOnly]);

//   return (
//     <div className="custom-input-wrapper" style={{ width }} ref={wrapperRef}>
//       {Label?.trim() && <label className="inputLabels">{Label}</label>}

//       {customReadOnly ? (
//         <div className="readOnlyValue">
//           {value && (
//             <img
//               src={value}
//               alt="Digital Signature"
//               style={{
//                 width: "100%",
//                 height,
//                 objectFit: "contain",
//                 border: "1px solid #d9d9d9",
//                 borderRadius: "6px",
//               }}
//             />
//           )}
//         </div>
//       ) : (
//         <>
//           <div
//             style={{
//               borderRadius: "4px",
//               width: "100%",
//               height,
//               overflow: "hidden",
//             }}
//           >
//             {canvasWidth > 0 && (
//               <SignatureCanvas
//                 ref={sigCanvasRef}
//                 penColor="black"
//                 canvasProps={{
//                   width: canvasWidth,
//                   height,
//                   className: "signature-canvas",
//                   style: {
//                     border:
//                       !isValid && errorMsg
//                         ? "1px solid #ff4d4f"
//                         : "1px solid #6273a270",
//                     width: "100%", // visual width
//                     height,
//                   },
//                 }}
//                 onEnd={handleEnd}
//               />
//             )}
//           </div>
//           <Button
//             type="dashed"
//             onClick={clearSignature}
//             style={{
//               marginTop: "8px",
//               padding: "4px 8px",
//               fontSize: "12px",
//               cursor: "pointer",
//             }}
//           >
//             Clear
//           </Button>
//         </>
//       )}

//       {!isValid && errorMsg && (
//         <span className="error-message">{errorMsg}</span>
//       )}
//     </div>
//   );
// };

// export default CustomSignaturePad;
