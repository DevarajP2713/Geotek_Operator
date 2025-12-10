import React from "react";
import styles from "./ErrorElement.module.scss";
import { ReportProblem } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ErrorElement = ({
  ErrorMsg,
  subText,
  backLink,
}: {
  ErrorMsg?: string;
  subText?: string;
  backLink?: {
    link: string | "";
    text: string | "";
  };
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className={styles.errorContainer}>
      <ReportProblem
        sx={{
          fontSize: "60px",
          color: "#f44336",
        }}
      />
      <div className={styles.textContainer}>
        <span className={styles.mainText}>
          {ErrorMsg || "Something went wrong"}
        </span>
        <span className={styles.subText}>
          {subText ||
            "looks like a error occured in our side & we are working on it. sorry for the inconvenience!"}
        </span>
      </div>
      <button
        className={styles.backBtn}
        onClick={() => {
          navigate?.(backLink?.link ?? "/main_menu");
        }}
      >
        {backLink?.text || "Back to home page"}
      </button>
    </div>
  );
};

export default ErrorElement;
