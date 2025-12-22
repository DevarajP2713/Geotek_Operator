/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Backdrop } from "@mui/material";
import { Spin } from "antd";
import styles from "./BackDropLoader.module.scss";

const BackDropLoader = ({
  open,
  loadingText,
}: {
  open: boolean | any;
  loadingText: string;
}): JSX.Element => {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: "blur(2px)",
      })}
    >
      <div className={styles.loaderText}>
        <Spin
          size="small"
          style={{
            fontSize: "13px",
            fontWeight: "300",
            // color: "#3177b8",
            color: "#555",
            fontFamily: "'robotoFlex', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            userSelect: "none",
          }}
          tip={loadingText ?? "Processing request, please wait..."}
        />
        {/* <span>{loadingText ?? "Processing request, please wait..."}</span> */}
      </div>
    </Backdrop>
  );
};

export default BackDropLoader;
