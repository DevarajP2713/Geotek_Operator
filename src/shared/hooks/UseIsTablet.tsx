/* eslint-disable @typescript-eslint/no-explicit-any */
// useIsTablet.ts
import { useEffect, useState } from "react";

export const useIsTablet = (breakpoint = 1024): boolean => {
  const [isTablet, setIsTablet] = useState<boolean>(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = (): any =>
      setIsTablet(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isTablet;
};
