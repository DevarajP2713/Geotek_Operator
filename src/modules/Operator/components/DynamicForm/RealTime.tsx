import moment from "moment";
import React, { useEffect, useState } from "react";

const RealTime = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(moment().format("HH:mm:ss")),
      1000
    );
    return () => clearInterval(interval);
  }, []);
  return <div>{currentTime}</div>;
};

export default RealTime;
