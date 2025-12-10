// /* eslint-disable @typescript-eslint/no-floating-promises */
// import React, { useRef, useState, useEffect } from "react";
// import { Modal, Button } from "antd";
// import { base64ToFile } from "../../../../utils/NetworkUtils";

// interface CustomCameraCaptureModalProps {
//   open: boolean;
//   onClose: () => void;
//   onCapture: (data: { name: string; file: File }) => void;
// }

// const CustomCameraCaptureModal: React.FC<CustomCameraCaptureModalProps> = ({
//   open,
//   onClose,
//   onCapture,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const startCamera = async (): Promise<void> => {
//     try {
//       const mediaStream: MediaStream =
//         await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//         setStream(mediaStream);
//       }
//     } catch (err) {
//       console.error("Camera not available", err);
//     }
//   };

//   const stopCamera = (): void => {
//     stream?.getTracks().forEach((track) => track.stop());
//     setStream(null);
//   };

//   const handleCapture = (): void => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (video && canvas) {
//       const context = canvas.getContext("2d");
//       if (context) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const base64: string = canvas.toDataURL("image/png");
//         setCapturedImage(base64);
//         stopCamera();
//       }
//     }
//   };

//   const handleRetake = (): void => {
//     setCapturedImage(null);
//     startCamera();
//   };

//   const handleClose = (): void => {
//     stopCamera();
//     setCapturedImage(null);
//     onClose();
//   };

//   const handleOk = (): void => {
//     if (capturedImage) {
//       const fileName = `capture_${Date.now()}.png`;
//       const file = base64ToFile(capturedImage, fileName);
//       onCapture({
//         name: file.name,
//         file: file,
//       });
//       handleClose();
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       startCamera();
//     } else {
//       stopCamera();
//     }
//     // Cleanup when unmounting
//     return () => stopCamera();
//   }, [open]);

//   return (
//     <Modal
//       open={open}
//       onCancel={handleClose}
//       footer={null}
//       title="Capture Image"
//       destroyOnClose
//     >
//       <div
//         style={{
//           width: "600px",
//         }}
//       >
//         {capturedImage ? (
//           <img
//             src={capturedImage}
//             alt="Captured"
//             style={{
//               width: "100%",
//               height: "50dvh",
//               borderRadius: "10px",
//             }}
//           />
//         ) : (
//           <video
//             ref={videoRef}
//             autoPlay
//             style={{ width: "100%", height: "50dvh", borderRadius: "10px" }}
//           />
//         )}
//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         <div
//           style={{
//             marginTop: 10,
//             textAlign: "center",
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "10px",
//           }}
//         >
//           {!capturedImage ? (
//             <Button
//               type="primary"
//               onClick={handleCapture}
//               style={{ marginRight: 8 }}
//             >
//               Capture
//             </Button>
//           ) : (
//             <>
//               <Button onClick={handleRetake} style={{ marginRight: 8 }}>
//                 Retake
//               </Button>
//               <Button
//                 type="primary"
//                 onClick={handleOk}
//                 style={{ marginRight: 8 }}
//               >
//                 OK
//               </Button>
//             </>
//           )}
//           <Button danger onClick={handleClose}>
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CustomCameraCaptureModal;

/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { base64ToFile } from "../../../../utils/NetworkUtils";

interface CustomCameraCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (data: { name: string; file: File }) => void;
}

const CustomCameraCaptureModal: React.FC<CustomCameraCaptureModalProps> = ({
  open,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error("Camera not available", err);
    }
  };

  const stopCamera = (): void => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  const toggleFacingMode = (): void => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleCapture = (): void => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64: string = canvas.toDataURL("image/png");
        setCapturedImage(base64);
        stopCamera();
      }
    }
  };

  const handleRetake = (): void => {
    setCapturedImage(null);
    startCamera();
  };

  const handleClose = (): void => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  };

  const handleOk = (): void => {
    if (capturedImage) {
      const fileName = `capture_${Date.now()}.png`;
      const file = base64ToFile(capturedImage, fileName);
      onCapture({
        name: file.name,
        file: file,
      });
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [open, facingMode]); // re-trigger camera on mode change

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Capture Image"
      destroyOnClose
    >
      <div style={{ width: "100%" }}>
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "100%", height: "50dvh", borderRadius: "10px" }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", height: "50dvh", borderRadius: "10px" }}
          />
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            width: "100%",
            display: videoRef?.current || capturedImage ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {!capturedImage ? (
            <>
              <Button type="primary" onClick={handleCapture}>
                Capture
              </Button>
              <Button onClick={toggleFacingMode}>Switch Camera</Button>
            </>
          ) : (
            <>
              <Button onClick={handleRetake}>Retake</Button>
              <Button type="primary" onClick={handleOk}>
                OK
              </Button>
            </>
          )}
          <Button danger onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomCameraCaptureModal;
