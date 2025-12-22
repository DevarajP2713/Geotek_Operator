// import React, { useEffect, useState } from "react";

// const FirstPage = require("../../../../assets/png/Splash_Screen_1.png");
// const SecondPage = require("../../../../assets/png/Splash_Screen_2.png");
// const ThirdPage = require("../../../../assets/png/OperatorTool.png");

// const images = [FirstPage, SecondPage, ThirdPage];

// const durations = [300, 1000, 2000];
// const FADE_DURATION = 500;

// const ScreenSaver = (): JSX.Element => {
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   const [zoomFirst, setZoomFirst] = useState(false); // 🔒 stays zoomed
//   const [zoomSecond, setZoomSecond] = useState(false); // 🔄 in → out

//   useEffect(() => {
//     // FIRST IMAGE → zoom in once
//     if (index === 0) {
//       requestAnimationFrame(() => setZoomFirst(true));
//     }

//     // SECOND IMAGE → zoom in then out
//     if (index === 1) {
//       setZoomSecond(true);
//       setTimeout(() => setZoomSecond(false), durations[1] / 2);
//     }

//     const timer = setTimeout(() => {
//       if (index !== 1) setFade(false);

//       setTimeout(
//         () => {
//           setIndex((prev) => (prev + 1) % images.length);
//           setFade(true);
//         },
//         index === 1 ? 0 : FADE_DURATION
//       );
//     }, durations[index]);

//     return () => clearTimeout(timer);
//   }, [index]);

//   const isFirst = index === 0;
//   const isSecond = index === 1;

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
//         position: "fixed",
//         backgroundColor: "black",
//         top: 0,
//         left: 0,
//       }}
//     >
//       <img
//         src={images[index]}
//         alt="Splash"
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",

//           opacity: isSecond ? 1 : fade ? 1 : 0.5,

//           /* 🔥 ZOOM LOGIC */
//           transform: isFirst
//             ? zoomFirst
//               ? "scale(2.5)" // zoom IN only
//               : "scale(1)"
//             : isSecond
//             ? zoomSecond
//               ? "scale(2.5)" // zoom IN
//               : "scale(1)" // zoom OUT
//             : "scale(1)",

//           transition: `transform ${FADE_DURATION}ms ease-in-out, opacity ${FADE_DURATION}ms ease-in-out`,
//         }}
//       />
//     </div>
//   );
// };

// export default ScreenSaver;

import React, { useEffect, useState } from "react";
import styles from "./ScreenSaver.module.scss";

const FirstPage = require("../../../../assets/png/Splash_Screen_1.png");
const SecondPage = require("../../../../assets/png/Splash_Screen_2.png");
const ThirdPage = require("../../../../assets/png/OperatorTool.png");

const images = [FirstPage, SecondPage, ThirdPage];
const durations = [500, 1000, 2000];

const ScreenSaver = (): JSX.Element => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durations[index]);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={styles.screensaver}>
      <img
        src={images[index]}
        alt="Splash"
        className={[
          styles.screen,
          index === 0 && styles.first,
          index === 1 && styles.second,
          index === 2 && styles.third,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
};

export default ScreenSaver;
