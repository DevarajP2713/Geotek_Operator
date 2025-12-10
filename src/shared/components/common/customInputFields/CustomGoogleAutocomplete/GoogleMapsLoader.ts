export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const existingScript = document.getElementById("googleMaps");

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.id = "googleMaps";
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDuRUYnyO1infVWtvLvD_M-r1lvcA5aN5o&libraries=places";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => reject(err);

    document.body.appendChild(script);
  });
};
