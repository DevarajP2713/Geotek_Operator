/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./Preview.module.scss";
// import { Button } from "antd";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { AddPredrillingData } from "../../hooks/usePredrilling";

const Preview = (): JSX.Element => {
  /* local varaiables creation start */
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type, technique_id } = useParams();

  const { state } = useLocation();
  const formData = state || {};

  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/add_drilling`
              )
            }
          />
          <h1 className={styles.title}>Preview</h1>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.previewPageBox}>
          <div className={styles.detailsBox}>
            <div className={styles.details}>
              <label>Project Name</label>
              <h2 className={styles.content}>
                {formData?.MasterData?.ProjectName?.label || ""}
              </h2>
            </div>
            <div className={styles.details}>
              <label>Shift</label>
              <h2 className={styles.content}>
                {formData?.MasterData?.Shift?.label || ""}
              </h2>
            </div>
            <div className={styles.details}>
              <label>Technique</label>
              <h2 className={styles.content}>
                {formData?.MasterData?.Technique?.label || ""}
              </h2>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.details}>
              <label>Work Type</label>
              <h2 className={styles.content}>{formData?.WorkType || ""}</h2>
            </div>
            <div className={styles.details}>
              <label>Input Point</label>
              <h2 className={styles.content}>{formData?.selectPoints || ""}</h2>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.details}>
              <label>Start Time</label>
              <h2 className={styles.content}>{formData?.startTime || ""}</h2>
            </div>
            <div className={styles.details}>
              <label>Stop Time</label>
              <h2 className={styles.content}>{formData?.stopTime || ""}</h2>
            </div>
            <div className={styles.details}>
              <label>Duration</label>
              <h2 className={styles.content}>{formData?.timer || ""}</h2>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.details}>
              <label>Depth</label>
              <h2 className={styles.content}>{formData?.depth || ""}</h2>
            </div>
            <div className={styles.details}>
              <label>Diameter</label>
              <h2 className={styles.content}>{formData?.count || ""}</h2>
            </div>
          </div>

          {/* Equipment */}
          <div className={styles.detailsBox}>
            <div className={styles.details}>
              <label>Equipment</label>
              <h2 className={styles.content}>
                {formData?.equipment?.length
                  ? formData.equipment.map((item: any) => item.label).join(", ")
                  : ""}
              </h2>
            </div>
          </div>
        </div>

        {/* ---------------------- Footer ---------------------- */}
        <div className={styles.footerPageBox}>
          <Button
            className={styles.previewBtn}
            onClick={() => {
              if (formData?.WorkType === "Predrilling") {
                AddPredrillingData(formData);
              }
              // else {
              //   AddProductionData(formData);
              // }

              navigate(
                `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}`
              );
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
