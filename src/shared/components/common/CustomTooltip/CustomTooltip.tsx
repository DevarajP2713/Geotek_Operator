/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tooltip, Typography, Skeleton } from "antd";

interface CustomTooltipProps {
  text: any;
  placement?: "top" | "bottom" | "left" | "right";
  width?: number | any;
  noToottip?: boolean;
  loading?: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  text,
  placement = "top",
  width = 290,
  noToottip = false,
  loading,
}) => {
  if (loading) {
    return (
      <Skeleton.Input
        active={true}
        className="basicTextSkeleton"
        style={{
          minWidth: "100%",
          width: "100%",
          maxWidth: width,
          height: "10px",
          borderRadius: "3px",
        }}
      />
    );
  }

  return !noToottip ? (
    <Tooltip
      title={text}
      placement={placement}
      style={{
        color: "#fff",
      }}
      getPopupContainer={() =>
        document.getElementById("CustomDT") || document.body
      }
    >
      <Typography.Text style={{ width }} ellipsis>
        {text || "-"}
      </Typography.Text>
    </Tooltip>
  ) : (
    <Typography.Text style={{ width }} ellipsis>
      {text || "-"}
    </Typography.Text>
  );
};

export default CustomTooltip;
