/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

let controllers: AbortController[] = [];

export const setupGlobalRequestInterceptor = (): any => {
  axios.interceptors.request.use((config: any) => {
    const controller = new AbortController();
    config.signal = controller.signal;
    controllers.push(controller);
    return config;
  });
};

export const cancelAllRequests = (): any => {
  controllers.forEach((ctrl) => ctrl.abort());
  controllers = [];
};
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
